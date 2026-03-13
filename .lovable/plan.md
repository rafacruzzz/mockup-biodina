

## Plano: Link Externo para Aprovação de SPI pelo Cliente

### Resumo
Criar um botão "Gerar Link Externo" na aba SPI do formulário de Importação Direta. Esse link leva o cliente a uma página pública e responsiva onde ele visualiza o resumo da SPI (somente leitura) e pode aprovar ou rejeitar, com campo de observação obrigatório em caso de rejeição. A decisão reflete automaticamente no campo "Aprovação do Cliente" dentro do sistema.

### Alterações

**1. Nova página pública: `src/pages/AprovacaoSPIExterna.tsx`**
- Rota pública `/aprovacao-spi/:linkId`
- Layout responsivo, sem sidebar/login
- Exibe em somente leitura os dados da SPI: cliente, CNPJ, endereço, número da SPI, data, fabricante, forma de pagamento, tabela de mercadorias com quantidades/valores, subtotal, packing, total, e observações
- Dois botões: "Aprovar" e "Rejeitar"
- Se rejeitar, campo de observação obrigatório aparece
- Após decisão, tela de confirmação (sem possibilidade de alterar)
- Dados armazenados em estado local (mock/front-end only, sem backend)

**2. Alteração em `src/components/comercial/components/SPIForm.tsx`**
- Na seção "Aprovação do Cliente", adicionar botão "Gerar Link Externo" (mesmo padrão já usado na Representação Comercial da Contratação)
- Gera URL com código único: `/aprovacao-spi/{codigo}`
- Exibe o link gerado com botão de copiar
- Manter os campos existentes inalterados

**3. Alteração em `src/App.tsx`**
- Adicionar rota pública: `<Route path="/aprovacao-spi/:linkId" element={<AprovacaoSPIExterna />} />`

**4. Estado compartilhado (mock)**
- Como não há backend, a página externa simulará os dados da SPI com valores de exemplo
- O status de aprovação/rejeição será exibido na tela de confirmação mas não persistirá entre sessões (comportamento mock)

