

## Plano: Exibir Evidências, Resultado Final/Encerramento e Assinaturas sempre no Detalhamento do Chamado

### Problema
As seções de Evidências, Resultado Final e Assinaturas Digitais só aparecem quando os dados já existem. O correto é sempre exibir essas seções — com os dados preenchidos ou com estado vazio ("Nenhuma evidência anexada", "Pendente", etc.).

### Alterações em `src/components/comercial/assessoria/DetalhesChamadoSheet.tsx`

**1. Seção "Resultado Final e Encerramento" — sempre visível (após Estratégia e Resultado):**
- Mover `resultadoFinal` para fora do bloco condicional
- Adicionar campo "Data de Encerramento" (`chamado.dataEncerramento`)
- Adicionar campo "Data de Resolução" (`chamado.dataResolucao`)
- Quando vazio: exibir texto "Pendente" em cinza

**2. Seção "Evidências" — sempre visível (após Histórico):**
- Remover o `chamado.evidencias && chamado.evidencias.length > 0` condicional
- Sempre renderizar a seção com título "Evidências"
- Quando sem evidências: mostrar placeholder "Nenhuma evidência anexada" com ícone
- Quando com evidências: manter grid atual (fotos, vídeos, logs, documentos)

**3. Seção "Assinaturas Digitais" — sempre visível (última seção):**
- Remover condicional `chamado.assinaturaCliente || chamado.assinaturaAssessor`
- Sempre renderizar 2 cards lado a lado: "Assinatura do Cliente" e "Assinatura do Assessor"
- Quando preenchida: exibir assinatura (base64 como imagem) e data
- Quando pendente: exibir "Pendente" com ícone de relógio

**4. Dados mock — `src/data/assessoria-cientifica.ts`:**
- Adicionar `dataEncerramento` e assinaturas ao chamado `cham-002` (RESOLVIDO) para demonstrar o fluxo completo

### Arquivos alterados
- `src/components/comercial/assessoria/DetalhesChamadoSheet.tsx`
- `src/data/assessoria-cientifica.ts`

