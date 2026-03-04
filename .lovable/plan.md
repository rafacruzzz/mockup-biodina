

## Plano: Exibir Razão Social, CNPJ e Endereço no modal "Trocar Empresa"

### Problema
O modal "Trocar Empresa" (`EmpresaUsuarioSwitcher.tsx`) exibe apenas o nome fantasia de cada empresa/filial. Para distinguir entre unidades, é necessário mostrar também a razão social, CNPJ e localização (cidade/UF).

### Alterações

1. **`src/types/permissions.ts`** — Adicionar campos opcionais à interface `EmpresaVinculada`:
   - `razaoSocial?: string`
   - `cnpj?: string`
   - `cidade?: string`
   - `uf?: string`

2. **`src/components/LoginForm.tsx`** — Atualizar os dados mock das `empresasVinculadas` para incluir `razaoSocial`, `cnpj`, `cidade` e `uf` em cada entrada (buscando os valores dos mocks de empresas e filiais existentes).

3. **`src/components/cadastro/EmpresasDoUsuario.tsx`** — Ao vincular empresa/filial, incluir os novos campos (`razaoSocial`, `cnpj`, `cidade`, `uf`) copiados dos dados da empresa principal ou filial.

4. **`src/components/layout/EmpresaUsuarioSwitcher.tsx`** — Atualizar o layout de cada item no modal para exibir:
   - **Linha 1**: Razão Social (ou nome se razão não existir)
   - **Linha 2**: CNPJ formatado
   - **Linha 3**: Cidade/UF
   - Badge de tipo (Principal/Filial) mantido

