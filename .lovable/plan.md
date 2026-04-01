

## Plano: Alterar "Tipo de Contratação" para 3 opções (Filantrópico, Privado, Público)

### Alteração em `src/components/comercial/ContratacaoSimplesForm.tsx`

**Estado e tipos (linha 74):**
- Mudar tipo de `'licitacao' | 'particular' | ''` para `'publico' | 'privado' | 'filantropico' | ''`
- Renomear `clienteParticular` → `clienteSelecionado` (usado para Privado)

**Função handleTipoContratacaoChange (linha 358):**
- Atualizar tipo do parâmetro para `'publico' | 'privado' | 'filantropico'`

**Select do Tipo de Contratação (linhas 694-702):**
- Trocar as duas opções por três:
  - `<SelectItem value="publico">Público</SelectItem>`
  - `<SelectItem value="privado">Privado</SelectItem>`
  - `<SelectItem value="filantropico">Filantrópico</SelectItem>`

**Lógica condicional (linhas 705-754):**
- `tipoContratacao === 'licitacao'` → `tipoContratacao === 'publico' || tipoContratacao === 'filantropico'` (ambos mostram seletor de licitação ganha)
- `tipoContratacao === 'particular'` → `tipoContratacao === 'privado'` (mostra seletor de cliente cadastrado)
- Buscar todas as ocorrências de `'particular'` e `'licitacao'` no arquivo e atualizar consistentemente

### Arquivo alterado
- `src/components/comercial/ContratacaoSimplesForm.tsx`

