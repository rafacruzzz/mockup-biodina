

## Plano: Adicionar seção "Boas Práticas" na aba "Regulatório & Versões" do Repositório de Produtos

### Resumo
Adicionar um novo Card "Boas Práticas" na aba "Regulatório & Versões" do detalhe do produto, entre o card "Registro ANVISA" e o "Histórico de Versões". Esse card exibirá os certificados de Boas Práticas vinculados ao produto, com possibilidade de visualizar/baixar os arquivos anexados.

### Alterações

#### Arquivo: `src/components/comercial/assessoria/repositorio/detalhe/RegulatorioTab.tsx`

1. Importar `FileCheck, Download, Eye` de lucide-react e `mockCertificados` de `@/data/boasPraticas`
2. Adicionar novo Card "Boas Práticas de Fabricação" após o card "Registro ANVISA" (linha 90), contendo:
   - Lista dos certificados de Boas Práticas (vindos dos dados mock)
   - Cada certificado mostra: Nome do arquivo principal, Fabricante Legal, Unidade Fabril, Status (badge colorido), Validade
   - Botões "Visualizar" e "Baixar" para o arquivo do certificado (`arquivoCertificadoBoasPraticas`)
   - Estado vazio caso não haja certificados vinculados

### Arquivo afetado
- `src/components/comercial/assessoria/repositorio/detalhe/RegulatorioTab.tsx`

