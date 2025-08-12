
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Package } from 'lucide-react';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import EmprestimosTable from './EmprestimosTable';
import NovoEmprestimoModal from './NovoEmprestimoModal';
import RegistrarDevolucaoModal from './RegistrarDevolucaoModal';

interface EmprestimosTabProps {
  importacaoId?: string;
}

const EmprestimosTab = ({ importacaoId }: EmprestimosTabProps) => {
  const [emprestimosVinculados, setEmprestimosVinculados] = useState([]);
  const [showNovoEmprestimo, setShowNovoEmprestimo] = useState(false);
  const [showDevolucao, setShowDevolucao] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);
  const { getEmprestimosByImportacao } = useEmprestimos();

  useEffect(() => {
    if (importacaoId) {
      loadEmprestimosVinculados();
    }
  }, [importacaoId]);

  const loadEmprestimosVinculados = async () => {
    if (!importacaoId) return;
    
    try {
      const emprestimos = await getEmprestimosByImportacao(importacaoId);
      setEmprestimosVinculados(emprestimos || []);
    } catch (error) {
      console.error('Erro ao carregar empréstimos vinculados:', error);
    }
  };

  const handleRegistrarDevolucao = (emprestimo: any) => {
    setSelectedEmprestimo(emprestimo);
    setShowDevolucao(true);
  };

  const handleModalClose = () => {
    setShowNovoEmprestimo(false);
    setShowDevolucao(false);
    setSelectedEmprestimo(null);
    // Recarregar empréstimos após fechar modal
    if (importacaoId) {
      loadEmprestimosVinculados();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-biodina-blue">
            Empréstimos Vinculados
          </h3>
          <p className="text-gray-600">
            Gerencie empréstimos relacionados a esta importação direta
          </p>
        </div>
        <Button 
          onClick={() => setShowNovoEmprestimo(true)}
          className="bg-biodina-gold hover:bg-biodina-gold/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {importacaoId ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Lista de Empréstimos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmprestimosTable
              emprestimos={emprestimosVinculados}
              isLoading={false}
              onRegistrarDevolucao={handleRegistrarDevolucao}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Salve a importação direta primeiro</p>
              <p className="text-gray-400 text-sm">
                Para vincular empréstimos, você precisa salvar esta importação direta
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modais */}
      <NovoEmprestimoModal
        isOpen={showNovoEmprestimo}
        onClose={handleModalClose}
        importacaoDiretaId={importacaoId}
      />

      <RegistrarDevolucaoModal
        isOpen={showDevolucao}
        onClose={handleModalClose}
        emprestimo={selectedEmprestimo}
      />
    </div>
  );
};

export default EmprestimosTab;
