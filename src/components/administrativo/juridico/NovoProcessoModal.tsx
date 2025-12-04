import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProcessoJuridico, TipoProcesso, StatusProcesso } from '@/types/juridico';
import { tipoProcessoLabels, statusProcessoLabels } from '@/data/juridicoModules';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface NovoProcessoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessoCreated: (processo: ProcessoJuridico) => void;
}

export const NovoProcessoModal = ({ open, onOpenChange, onProcessoCreated }: NovoProcessoModalProps) => {
  const [numeroProcesso, setNumeroProcesso] = useState('');
  const [tipo, setTipo] = useState<TipoProcesso>(TipoProcesso.JUDICIAL);
  const [status, setStatus] = useState<StatusProcesso>(StatusProcesso.EM_ANDAMENTO);
  const [parteContraria, setParteContraria] = useState('');
  const [vara, setVara] = useState('');
  const [comarca, setComarca] = useState('');
  const [tribunal, setTribunal] = useState('');
  const [objeto, setObjeto] = useState('');
  const [valorCausa, setValorCausa] = useState('');
  const [dataDistribuicao, setDataDistribuicao] = useState('');
  const [responsavelInterno, setResponsavelInterno] = useState('');
  const [advogadoExterno, setAdvogadoExterno] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [arquivoDOU, setArquivoDOU] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportarDOU = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivoDOU(file);
      setIsImporting(true);
      
      // Simula processamento do arquivo DOU e preenchimento dos campos
      setTimeout(() => {
        // Dados mockados que seriam extraídos do DOU
        setNumeroProcesso('0012345-67.2024.1.00.0001');
        setTipo(TipoProcesso.ADMINISTRATIVO);
        setStatus(StatusProcesso.EM_ANDAMENTO);
        setParteContraria('União Federal');
        setVara('1ª Vara Federal');
        setComarca('Brasília');
        setTribunal('TRF1');
        setObjeto('Processo administrativo referente à análise de documentação para registro de produto junto à ANVISA');
        setValorCausa('50000.00');
        setDataDistribuicao('2024-03-15');
        
        setIsImporting(false);
        toast({
          title: 'Dados importados',
          description: 'Os campos foram preenchidos com os dados do DOU. Verifique e complete as informações.',
        });
      }, 1500);
    }
  };

  const handleSubmit = () => {
    if (!numeroProcesso || !parteContraria || !objeto || !dataDistribuicao || !responsavelInterno) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    const novoProcesso: ProcessoJuridico = {
      id: String(Date.now()),
      numeroProcesso,
      tipo,
      status,
      parteContraria,
      vara: vara || undefined,
      comarca: comarca || undefined,
      tribunal: tribunal || undefined,
      objeto,
      valorCausa: valorCausa ? parseFloat(valorCausa) : undefined,
      dataDistribuicao,
      responsavelInterno,
      advogadoExterno: advogadoExterno || undefined,
      observacoes: observacoes || undefined,
      andamentos: [],
      documentos: [],
    };

    onProcessoCreated(novoProcesso);
    onOpenChange(false);

    // Limpar formulário
    setNumeroProcesso('');
    setParteContraria('');
    setVara('');
    setComarca('');
    setTribunal('');
    setObjeto('');
    setValorCausa('');
    setDataDistribuicao('');
    setResponsavelInterno('');
    setAdvogadoExterno('');
    setObservacoes('');
    setArquivoDOU(null);

    toast({
      title: 'Sucesso',
      description: 'Processo cadastrado com sucesso!',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Processo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Seção de Importação do DOU */}
          <div className="p-4 border border-dashed border-primary/40 rounded-lg bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Importar dados do DOU</p>
                  <p className="text-xs text-muted-foreground">
                    Faça upload do documento do DOU para preencher automaticamente os campos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {arquivoDOU && (
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {arquivoDOU.name}
                  </span>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleImportarDOU}
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Importar DOU
                    </>
                  )}
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <Label>Número do Processo *</Label>
            <Input
              value={numeroProcesso}
              onChange={(e) => setNumeroProcesso(e.target.value)}
              placeholder="Ex: 0001234-56.2024.8.26.0100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select value={tipo} onValueChange={(value) => setTipo(value as TipoProcesso)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tipoProcessoLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as StatusProcesso)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusProcessoLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Parte Contrária *</Label>
            <Input
              value={parteContraria}
              onChange={(e) => setParteContraria(e.target.value)}
              placeholder="Nome da parte contrária"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Vara</Label>
              <Input
                value={vara}
                onChange={(e) => setVara(e.target.value)}
                placeholder="Ex: 1ª Vara Cível"
              />
            </div>

            <div className="space-y-2">
              <Label>Comarca</Label>
              <Input
                value={comarca}
                onChange={(e) => setComarca(e.target.value)}
                placeholder="Ex: São Paulo"
              />
            </div>

            <div className="space-y-2">
              <Label>Tribunal</Label>
              <Input
                value={tribunal}
                onChange={(e) => setTribunal(e.target.value)}
                placeholder="Ex: TJSP"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Objeto *</Label>
            <Textarea
              value={objeto}
              onChange={(e) => setObjeto(e.target.value)}
              placeholder="Descrição do objeto do processo"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor da Causa (R$)</Label>
              <Input
                type="number"
                value={valorCausa}
                onChange={(e) => setValorCausa(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>Data de Distribuição *</Label>
              <Input
                type="date"
                value={dataDistribuicao}
                onChange={(e) => setDataDistribuicao(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Responsável Interno *</Label>
              <Input
                value={responsavelInterno}
                onChange={(e) => setResponsavelInterno(e.target.value)}
                placeholder="Nome do responsável interno"
              />
            </div>

            <div className="space-y-2">
              <Label>Advogado Externo</Label>
              <Input
                value={advogadoExterno}
                onChange={(e) => setAdvogadoExterno(e.target.value)}
                placeholder="Nome do escritório/advogado externo"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações adicionais sobre o processo"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Cadastrar Processo</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
