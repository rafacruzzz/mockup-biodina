

## Plano: Adicionar campos Fonte do Lead, Segmento do Lead e Método de Contato antes de "Tipo de Lead"

### Resumo
Adicionar 3 campos Select antes de "Tipo de Lead" / "Tipo de Cliente" nos formulários de cadastro de Leads, tanto no módulo Cadastro (`EntidadeModal.tsx`) quanto no módulo Comercial (`ComercialTabs.tsx`).

### Campos a adicionar (nesta ordem, antes de "Tipo de Lead")

1. **Fonte do Lead** — Select com: Site, Indicação, Cold Call, Licitação, Referência, Evento, Telefone, E-mail, Presencial, WhatsApp, Vídeo Chamada (mesmas opções já existentes no ComercialTabs)

2. **Segmento do Lead** — Select consumindo os segmentos do hook `useSegmentoLeadManager` (29 opções padrão + customizados): FILANTRÓPICO, PRIVADO - ESTÉTICA, todos os PÚBLICO - HOSPITAL/LABORATÓRIO, etc.

3. **Método de Contato** — Select com: Telefone, E-mail, Presencial, WhatsApp, Vídeo Chamada, Outros

### Alterações

**1. `src/components/cadastro/EntidadeModal.tsx` (aba Dados Gerais, apenas para leads)**
- Importar `useSegmentoLeadManager`
- Adicionar campos `fonte_lead`, `segmento_lead`, `metodo_contato` ao `formData` inicial
- Inserir os 3 Selects antes do bloco "Tipo de Lead" (linha 274), visíveis apenas quando `tipoEntidade === "leads"`

**2. `src/components/comercial/components/ComercialTabs.tsx` (aba Dados Gerais)**
- Importar `useSegmentoLeadManager`
- Mover o campo "Fonte do Lead" (já existe na linha 122) para antes de onde ficarão os novos campos
- Adicionar Select "Segmento do Lead" com opções do hook
- Adicionar Select "Método de Contato" com as 6 opções
- Posicionar os 3 campos antes dos campos existentes de informações básicas ou no início do card

### Detalhes técnicos
- O Segmento do Lead usará `segmentos.map(s => <SelectItem key={s.id} value={s.value}>{s.label}</SelectItem>)` do hook `useSegmentoLeadManager`
- Fonte do Lead e Método de Contato são listas fixas inline
- Os campos `formData` correspondentes: `fonteLead`, `segmentoLead`, `metodoContato`

