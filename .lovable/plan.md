

## Plano: Upload Obrigatório de Aditivo ao Alterar Empresa na Contratação

### Objetivo
1. Empresa Participante 2 só aparece se a licitação vinculada tiver duas empresas
2. Ao alterar uma empresa, exibir modal obrigando upload do aditivo de mudança
3. O documento do aditivo vai para a aba "Documentos", não fica em "Dados Gerais"

---

### Alterações

#### Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Condicionar exibição da Empresa 2**

O bloco da "Empresa Participante 2" (linhas 513-560) só será renderizado se a licitação vinculada possuir `empresaParticipanteId2` preenchido:

```typescript
{licitacaoVinculadaData?.empresaParticipanteId2 && (
  // bloco da Empresa Participante 2
)}
```

**2. Novo estado para o modal de aditivo**

```typescript
const [modalAditivoOpen, setModalAditivoOpen] = useState(false);
const [aditivoFile, setAditivoFile] = useState<File | null>(null);
const [empresaPendente, setEmpresaPendente] = useState<{id: string, numero: 1|2} | null>(null);
```

**3. Alterar fluxo de mudança de empresa**

Ao selecionar uma nova empresa no Select, em vez de aplicar imediatamente:
- Salvar a seleção pendente em `empresaPendente`
- Abrir o modal de aditivo (`setModalAditivoOpen(true)`)
- Só confirmar a troca após o upload

**4. Modal de Upload de Aditivo**

```text
+-----------------------------------------------+
| Aditivo de Mudança de Empresa                  |
+-----------------------------------------------+
|                                                |
| Voce esta alterando a empresa participante.    |
| E obrigatório anexar o aditivo contratual.     |
|                                                |
| [Area de upload - arrastar ou selecionar]      |
| Arquivo selecionado: aditivo.pdf               |
|                                                |
|         [Cancelar]    [Confirmar Alteração]     |
+-----------------------------------------------+
```

- Botão "Confirmar" desabilitado até o upload
- Ao confirmar: aplica a troca de empresa, sincroniza com licitação, adiciona documento à lista `documentosLicitacao` (que é exibida na aba Documentos)

**5. Adicionar documento à aba Documentos**

Ao confirmar o aditivo, inserir no array `documentosLicitacao`:

```typescript
setDocumentosLicitacao(prev => [...prev, {
  nome: aditivoFile.name,
  tipo: 'Aditivo de Mudança de Empresa',
  data: new Date().toISOString().split('T')[0],
  url: URL.createObjectURL(aditivoFile)
}]);
```

---

### Resumo de Alterações

| Arquivo | Ação |
|---------|------|
| `src/components/comercial/ContratacaoSimplesForm.tsx` | Condicionar Empresa 2, criar modal de aditivo, redirecionar documento para aba Documentos |

### Comportamento Final

1. Vincula licitação -> aparece Empresa 1 (sempre) e Empresa 2 (só se existir na licitação)
2. Ao trocar empresa no Select -> abre modal exigindo upload de aditivo
3. Upload obrigatório -> botão "Confirmar" só habilita com arquivo
4. Ao confirmar -> troca empresa, sincroniza com licitação, documento aparece na aba "Documentos"
5. Ao cancelar -> nada muda
