

## Plano: Concorrentes dinâmicos no Resumo Biodina Rep

### Resumo
Substituir o loop fixo `[1, 2].map(...)` por uma lista dinâmica de concorrentes com botão "+ Adicionar Concorrente", permitindo quantos concorrentes forem necessários.

### Alteração em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Novo estado para concorrentes do Biodina Rep (~junto dos outros estados):**
- `concorrentesBiodinaRep: Array<{ id: string; nome: string; marca: string; modelo: string; quantidade: string; examesMes: string }>`, inicializado com 2 itens vazios (mantendo o padrão atual).

**2. Substituir o bloco fixo `[1, 2].map(...)` (linhas 1174-1202):**
- Renderizar `concorrentesBiodinaRep.map((concorrente, index) => ...)` com os mesmos campos (Nome, Marca, Modelo, Quantidade, Exames/mês), todos read-only.
- Título de cada card: "Concorrente {index + 1}" com botão de remover (X) quando houver mais de 1 concorrente.

**3. Botão "+ Adicionar Concorrente" (após a lista):**
- Adiciona um novo item vazio ao array `concorrentesBiodinaRep`.

### Resultado
A seção de concorrentes no Biodina Rep é dinâmica — o usuário pode adicionar quantos concorrentes quiser, sem limite fixo de 2.

