
-- Create emprestimos table
CREATE TABLE public.emprestimos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_processo TEXT NOT NULL UNIQUE,
  cliente_cnpj TEXT NOT NULL,
  cliente_nome TEXT NOT NULL,
  danfe_emprestimo TEXT,
  ref_produto_emprestado TEXT NOT NULL,
  desc_produto_emprestado TEXT,
  valor_emprestimo_dolar NUMERIC NOT NULL,
  data_emprestimo DATE NOT NULL,
  data_saida DATE,
  id_importacao_direta UUID,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create emprestimos_devolucoes table
CREATE TABLE public.emprestimos_devolucoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  emprestimo_id UUID NOT NULL REFERENCES public.emprestimos(id) ON DELETE CASCADE,
  danfe_retorno TEXT,
  ref_produto_recebido TEXT NOT NULL,
  desc_produto_recebido TEXT,
  data_retorno DATE NOT NULL,
  data_baixa DATE,
  valor_retornado_dolar NUMERIC NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.emprestimos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprestimos_devolucoes ENABLE ROW LEVEL SECURITY;

-- Create policies for emprestimos
CREATE POLICY "Users can view emprestimos" 
  ON public.emprestimos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create emprestimos" 
  ON public.emprestimos 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update emprestimos" 
  ON public.emprestimos 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Users can delete emprestimos" 
  ON public.emprestimos 
  FOR DELETE 
  USING (true);

-- Create policies for emprestimos_devolucoes
CREATE POLICY "Users can view emprestimos_devolucoes" 
  ON public.emprestimos_devolucoes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create emprestimos_devolucoes" 
  ON public.emprestimos_devolucoes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update emprestimos_devolucoes" 
  ON public.emprestimos_devolucoes 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Users can delete emprestimos_devolucoes" 
  ON public.emprestimos_devolucoes 
  FOR DELETE 
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_emprestimos_cliente_cnpj ON public.emprestimos(cliente_cnpj);
CREATE INDEX idx_emprestimos_numero_processo ON public.emprestimos(numero_processo);
CREATE INDEX idx_emprestimos_data_emprestimo ON public.emprestimos(data_emprestimo);
CREATE INDEX idx_emprestimos_importacao ON public.emprestimos(id_importacao_direta);
CREATE INDEX idx_devolucoes_emprestimo_id ON public.emprestimos_devolucoes(emprestimo_id);

-- Create function to generate numero_processo
CREATE OR REPLACE FUNCTION generate_numero_processo()
RETURNS TEXT AS $$
DECLARE
  year_month TEXT;
  sequence_num INT;
  new_numero TEXT;
BEGIN
  year_month := TO_CHAR(NOW(), 'YYYYMM');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(numero_processo FROM 'EMP-' || year_month || '-(.*)') AS INT)), 0) + 1
  INTO sequence_num
  FROM emprestimos 
  WHERE numero_processo LIKE 'EMP-' || year_month || '-%';
  
  new_numero := 'EMP-' || year_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN new_numero;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate numero_processo
CREATE OR REPLACE FUNCTION set_numero_processo()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.numero_processo IS NULL OR NEW.numero_processo = '' THEN
    NEW.numero_processo := generate_numero_processo();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_numero_processo
  BEFORE INSERT ON public.emprestimos
  FOR EACH ROW
  EXECUTE FUNCTION set_numero_processo();

-- Create view for emprestimos with calculated fields
CREATE OR REPLACE VIEW emprestimos_resumo AS
SELECT 
  e.id,
  e.numero_processo,
  e.cliente_cnpj,
  e.cliente_nome,
  e.danfe_emprestimo,
  e.ref_produto_emprestado,
  e.desc_produto_emprestado,
  e.valor_emprestimo_dolar,
  e.data_emprestimo,
  e.data_saida,
  e.id_importacao_direta,
  e.observacoes,
  e.created_at,
  COALESCE(SUM(d.valor_retornado_dolar), 0) AS total_retornado,
  e.valor_emprestimo_dolar - COALESCE(SUM(d.valor_retornado_dolar), 0) AS saldo,
  CASE 
    WHEN COALESCE(SUM(d.valor_retornado_dolar), 0) = 0 THEN 'ATIVO'
    WHEN COALESCE(SUM(d.valor_retornado_dolar), 0) = e.valor_emprestimo_dolar THEN 'QUITADO'
    WHEN COALESCE(SUM(d.valor_retornado_dolar), 0) < e.valor_emprestimo_dolar THEN 'PARCIAL'
    WHEN COALESCE(SUM(d.valor_retornado_dolar), 0) > e.valor_emprestimo_dolar THEN 'EM_SUPERAVIT'
    ELSE 'EM_DEBITO'
  END AS status
FROM emprestimos e
LEFT JOIN emprestimos_devolucoes d ON e.id = d.emprestimo_id
GROUP BY e.id, e.numero_processo, e.cliente_cnpj, e.cliente_nome, e.danfe_emprestimo, 
         e.ref_produto_emprestado, e.desc_produto_emprestado, e.valor_emprestimo_dolar, 
         e.data_emprestimo, e.data_saida, e.id_importacao_direta, e.observacoes, e.created_at;
