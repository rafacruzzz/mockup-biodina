
import SidebarLayout from '@/components/SidebarLayout';
import SolicitacoesDashboard from '@/components/solicitacoes/SolicitacoesDashboard';

const Solicitacoes = () => {
  return (
    <SidebarLayout>
      <div className="p-6">
        <SolicitacoesDashboard />
      </div>
    </SidebarLayout>
  );
};

export default Solicitacoes;
