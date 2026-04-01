

## Plano: Atualizações por Marca/Linha no BI + Versionamento e Rastreabilidade

### 1. Adicionar seção "Atualizações por Marca/Linha" — `src/components/comercial/assessoria/repositorio/BiCoberturaTab.tsx`

Inserir um novo Card entre "Atualizações por Período" e "Uso em OS/Licitações" com:
- Tabela mostrando cada Marca e suas Linhas, com contadores de: documentos totais, atualizações no período, cobertura (%)
- Dados cruzados a partir de `marcasMock`, `linhasMock`, `produtosMock` e `documentosMock`
- Expansível por marca para ver as linhas individuais

### 2. Adicionar seção "Versionamento e Rastreabilidade" — `src/components/comercial/assessoria/repositorio/BiCoberturaTab.tsx`

Novo Card no final da página com:
- **Resumo de versionamento**: total de artefatos com versões, total de changelogs registrados
- **Últimas alterações** (changelog recente): tabela com artefato, versão anterior -> nova, o que mudou, por que mudou, quem aprovou, data
- **Documentos com trava normativa (IFU/POP)**: lista de documentos com `bloqueadoSobrescrita: true`, mostrando badge "Somente Nova Versão"
- **Próximas revalidações**: documentos com `dataProximaRevalidacao` próxima (< 30 dias)

### 3. Funções auxiliares — `src/utils/biRepositorio.ts`

- `getAtualizacoesPorMarcaLinha(marcas, linhas, produtos, documentos)`: retorna array com marca, linha, totais e cobertura
- `getChangelogRecente(documentos, limit)`: retorna changelogs ordenados por data
- `getDocumentosBloqueados(documentos)`: retorna docs com `bloqueadoSobrescrita: true`
- `getProximasRevalidacoes(documentos, diasLimite)`: retorna docs com revalidação próxima

### 4. Mock data — `src/data/produtos.ts`

- Adicionar mais `DocumentoProduto` mock com `historicoVersoes`, `changelog`, `bloqueadoSobrescrita` e `dataProximaRevalidacao` preenchidos para alimentar as novas seções do BI

### Arquivos alterados
- `src/utils/biRepositorio.ts`
- `src/components/comercial/assessoria/repositorio/BiCoberturaTab.tsx`
- `src/data/produtos.ts`

