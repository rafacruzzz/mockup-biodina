

## Plano: Adicionar notas de origem dos dados em cada seção da aba "Análise de Dados e Indicadores"

### Resumo
Inserir um lembrete informativo (nota em destaque) abaixo de cada seção/gráfico indicando de qual módulo ou setor os dados serão puxados no back-end.

### Alterações em `src/components/administrativo/qualidade/AnaliseIndicadoresTab.tsx`

**1. KPIs — Qualidade do Produto (Conformidade):**
Adicionar nota abaixo do card com:
- TNC: "Dados vindos do nº de Não Conformidades (Qualidade)"
- Acuracidade do Laudo/Certificado: "Dados vindos da verificação de AFE da própria empresa"
- Adesão às Boas Práticas (BP): "Dados vindos da verificação de BP dos fornecedores e da própria empresa"

**2. KPIs — Qualidade da Entrega (Logística):**
- Nota: "Dados vindos do módulo Estoque"

**3. KPIs — Qualidade do Suporte (Pós-venda):**
- Nota: "Dados vindos dos módulos DT, Qualidade e Comercial"

**4. Evolução de Não Conformidades:**
- Nota: "Dados vindos do nº de Não Conformidades abertas (Qualidade)"

**5. Taxas de Retrabalho:**
- "Reenvio de material": "Dados vindos do módulo Estoque"
- "Retreinamento de Equipes": "Dados vindos do módulo RH — todos os treinamentos exceto Boas Práticas anuais e treinamento inicial são demandados pelo RH ao RT"

**6. Eficiência da CAPA:**
- Nota: "Dados vindos das NCs e CAPAs registrados na Qualidade e previstos também no DT"

**7. Qualidade dos Fornecedores (gráfico):**
- Nota: "Dados vindos do Registro de Qualificação de Fornecedores (módulo RT)"

**8. Detalhamento de Fornecedores (tabela):**
- Nota: "Dados vindos do Registro de Qualificação de Fornecedores (módulo RT). 'Materiais Não Conformes' refere-se aos documentos que os fornecedores não possuem"

**Formato visual das notas:**
- Div com `bg-amber-50 border border-amber-200 rounded-lg p-3` e ícone `Info`
- Texto em `text-xs text-amber-700` com prefixo "Origem dos dados:"

### Arquivo alterado
- `src/components/administrativo/qualidade/AnaliseIndicadoresTab.tsx`

