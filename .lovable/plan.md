

## Plano: Exibir todos os campos de Dados Gerais ao selecionar cliente na Reclamacao

### O que sera feito

Ao selecionar um cliente na aba "Reclamacao de Clientes", o painel de dados exibidos sera expandido para mostrar **todos** os campos da aba "Dados Gerais" do cadastro de clientes, organizados nas mesmas secoes.

### Campos a adicionar (alem dos ja existentes)

Atualmente exibe: Nome do Cliente, Razao Social, Nome Fantasia, CNPJ/CPF, Situacao Cadastral, Nome do Mantenedor, CNPJ do Mantenedor.

**Campos novos a exibir:**
- Tipo de Cliente
- CIN/RG
- Data de Cadastro
- Telefone 1, 2, 3, 4
- Telefone Fixo 1, 2, 3
- Telefone WhatsApp
- E-mail 1, 2, 3, 4
- Website, Instagram, Facebook, LinkedIn, X (Twitter)
- Contato Comercial: Nome, Cargo, Telefone, E-mail
- Servico/Produto Oferecido

### Implementacao

**Arquivo:** `src/components/administrativo/qualidade/ReclamacaoClientesTab.tsx`

1. Expandir a interface `Cliente` para incluir todos os campos de Dados Gerais (tipoCliente, cinRg, dataCadastro, telefone1-4, telefoneFixo1-3, telefoneWhatsapp, email1-4, website, instagram, facebook, linkedin, xTwitter, contatoNome, contatoCargo, contatoTelefone, contatoEmail, servicoProdutoOferecido)

2. Expandir a interface `Reclamacao` e o estado `novaReclamacao` com os mesmos campos

3. Atualizar o mapeamento em `useMemo` dos clientes para extrair todos esses campos do `modules.pessoas.subModules.clientes.data`

4. Atualizar `selecionarCliente` e `limparCliente` para incluir todos os campos

5. Reorganizar o painel de dados exibidos (bg-muted/50) em sub-secoes com separadores visuais, espelhando a estrutura do cadastro:
   - Dados principais (grid 2 colunas): Tipo, Nome, Razao Social, Nome Fantasia, CNPJ/CPF, CIN/RG, Situacao Cadastral, Data Cadastro, Mantenedor, CNPJ Mantenedor
   - Telefones (grid 2 colunas): Telefone 1-4
   - Telefones Fixos (grid 3 colunas): Fixo 1-3
   - WhatsApp
   - E-mails (grid 2 colunas): E-mail 1-4
   - Web e Redes Sociais (grid 2 colunas): Website, Instagram, Facebook, LinkedIn, X
   - Contato Comercial (grid 2 colunas): Nome, Cargo, Telefone, E-mail
   - Servico/Produto Oferecido (texto livre)

6. Atualizar os dados mock dos clientes existentes para incluir exemplos dos novos campos

