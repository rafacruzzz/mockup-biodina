import { Label } from '@/components/ui/label';
import type { ReclamacaoClienteData } from '../ReclamacaoClientesTab';

interface ClienteDataPanelProps {
  data: ReclamacaoClienteData;
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <p className="text-sm font-medium">{value || '-'}</p>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-3 pb-1 border-b border-border/50">
    {title}
  </h5>
);

export const ClienteDataPanel = ({ data }: ClienteDataPanelProps) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-4">
      {/* Dados Principais */}
      <SectionTitle title="Dados Principais" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Tipo de Cliente" value={data.tipoCliente} />
        <Field label="Nome do Cliente" value={data.nomeCliente} />
        <Field label="Razão Social" value={data.razaoSocial} />
        <Field label="Nome Fantasia" value={data.nomeFantasia} />
        <Field label="CNPJ/CPF" value={data.cnpjCpf} />
        <Field label="CIN/RG" value={data.cinRg} />
        <Field label="Situação Cadastral" value={data.situacaoCadastral} />
        <Field label="Data de Cadastro" value={data.dataCadastro ? new Date(data.dataCadastro + 'T12:00:00').toLocaleDateString('pt-BR') : ''} />
        <Field label="Nome do Mantenedor" value={data.nomeMantenedor} />
        <Field label="CNPJ do Mantenedor" value={data.cnpjMantenedor} />
      </div>

      {/* Telefones */}
      <SectionTitle title="Telefones" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Telefone 1" value={data.telefone1} />
        <Field label="Telefone 2" value={data.telefone2} />
        <Field label="Telefone 3" value={data.telefone3} />
        <Field label="Telefone 4" value={data.telefone4} />
      </div>

      {/* Telefones Fixos */}
      <SectionTitle title="Telefones Fixos" />
      <div className="grid grid-cols-3 gap-4">
        <Field label="Telefone Fixo 1" value={data.telefoneFixo1} />
        <Field label="Telefone Fixo 2" value={data.telefoneFixo2} />
        <Field label="Telefone Fixo 3" value={data.telefoneFixo3} />
      </div>

      {/* WhatsApp */}
      <SectionTitle title="WhatsApp" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Telefone WhatsApp" value={data.telefoneWhatsapp} />
      </div>

      {/* E-mails */}
      <SectionTitle title="E-mails" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="E-mail 1" value={data.email1} />
        <Field label="E-mail 2" value={data.email2} />
        <Field label="E-mail 3" value={data.email3} />
        <Field label="E-mail 4" value={data.email4} />
      </div>

      {/* Web e Redes Sociais */}
      <SectionTitle title="Web e Redes Sociais" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Website" value={data.website} />
        <Field label="Instagram" value={data.instagram} />
        <Field label="Facebook" value={data.facebook} />
        <Field label="LinkedIn" value={data.linkedin} />
        <Field label="X (Twitter)" value={data.xTwitter} />
      </div>

      {/* Contato Comercial */}
      <SectionTitle title="Contato Comercial" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nome" value={data.contatoNome} />
        <Field label="Cargo" value={data.contatoCargo} />
        <Field label="Telefone" value={data.contatoTelefone} />
        <Field label="E-mail" value={data.contatoEmail} />
      </div>

      {/* Serviço/Produto Oferecido */}
      <SectionTitle title="Serviço/Produto Oferecido" />
      <div>
        <p className="text-sm font-medium">{data.servicoProdutoOferecido || '-'}</p>
      </div>
    </div>
  );
};
