

## Plano: Reduzir abas da Licitação para apenas 4

Conforme a imagem do usuário, o formulário de Licitação deve ter **apenas 4 abas**:
1. **Dados Gerais**
2. **Análise Técnica**
3. **Histórico/Chat**
4. **Documentos**

### Alteração em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**Remover 6 TabsTriggers e seus TabsContents** (linhas 1359-1438):
- `documentos` → **manter**, mas reposicionar para o final
- `AC` (analise-tecnica) → **renomear label** para "Análise Técnica"
- `DT` → **remover**
- `AJ` (analise-juridica) → **remover**
- `AG` (analise-gerencial) → **remover**
- `Empenho` → **remover**
- `Pedidos` → **remover**
- `Chamados` → **remover**

**Resultado final das abas (nesta ordem):**
```
[Dados Gerais]  [Análise Técnica]  [Histórico/Chat]  [Documentos]
```

Apenas os `TabsTrigger` e `TabsContent` das 4 abas permanecerão. O código dos placeholders removidos (DT, AJ, AG, Empenho, Pedidos, Chamados) será excluído, já que são apenas placeholders sem lógica real. As abas AC, DT, AJ, AG, Empenho, Pedidos e Chamados continuam existindo no formulário de **Contratação** (outro componente).

