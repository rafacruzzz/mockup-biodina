

## Plano: Usar dados da empresa logada nos modais de Proposta

### Problema
Os 3 modais de proposta (Contratação, DT, Licitação) têm `dadosEmpresa` hardcoded com "BIODINA EQUIPAMENTOS MÉDICOS LTDA". O nome e demais dados devem vir da empresa na qual o usuário está logado, usando o `EmpresaContext`.

### Alterações

**Arquivos afetados:** `PropostaContratacaoModal.tsx`, `PropostaDTModal.tsx`, `PropostaLicitacaoModal.tsx`

Em cada arquivo:

1. **Importar o contexto:** `import { useEmpresa } from '@/contexts/EmpresaContext';`

2. **Remover o objeto `dadosEmpresa` hardcoded** (linhas ~52-60 em cada arquivo)

3. **Dentro do componente**, usar o hook para obter dados dinâmicos:
   ```tsx
   const { empresaAtual, filialAtual } = useEmpresa();
   const entidadeAtual = filialAtual || empresaAtual;
   
   const dadosEmpresa = {
     razaoSocial: entidadeAtual?.razaoSocial || '',
     endereco: entidadeAtual?.endereco ? `${entidadeAtual.endereco.logradouro}, ${entidadeAtual.endereco.numero}, ${entidadeAtual.endereco.bairro}, ${entidadeAtual.endereco.cidade} - ${entidadeAtual.endereco.uf}, CEP ${entidadeAtual.endereco.cep}` : '',
     cnpj: entidadeAtual?.cnpj || '',
     inscricaoEstadual: entidadeAtual?.inscricaoEstadual || '',
     inscricaoMunicipal: entidadeAtual?.inscricaoMunicipal || '',
     telefone: entidadeAtual?.telefone || '',
     email: entidadeAtual?.email || '',
   };
   ```

4. **Filiais com dados diferentes:** Ao usar `filialAtual || empresaAtual`, se o usuário estiver operando em uma filial, os dados bancários e da empresa serão os da filial. Caso contrário, serão os da matriz.

### Resultado
A declaração, os campos de dados da empresa e a assinatura mostrarão o nome real da empresa/filial logada em vez do valor fixo.

