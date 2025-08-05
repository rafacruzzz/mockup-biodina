
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { useColaborador } from "@/contexts/ColaboradorContext";
import ColaboradorModal from "./ColaboradorModal";

const Colaboradores = () => {
  const { colaboradores, buscarColaboradores } = useColaborador();
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colaboradorEdit, setColaboradorEdit] = useState(null);

  const colaboradoresFiltrados = buscarColaboradores({ busca });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-red-100 text-red-800';
      case 'novo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditColaborador = (colaborador: any) => {
    setColaboradorEdit(colaborador);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setColaboradorEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-biodina-blue">Colaboradores</h1>
          <p className="text-gray-600">Gerencie os colaboradores da empresa</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-biodina-blue hover:bg-biodina-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Colaborador
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar colaborador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colaboradoresFiltrados.map((colaborador) => (
          <Card key={colaborador.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{colaborador.dadosPessoais.nome}</CardTitle>
                <Badge className={getStatusColor(colaborador.status)}>
                  {colaborador.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Cargo:</strong> {colaborador.dadosProfissionais.cargo}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Setor:</strong> {colaborador.dadosProfissionais.setor}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {colaborador.dadosPessoais.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Admissão:</strong> {new Date(colaborador.dadosProfissionais.dataAdmissao).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditColaborador(colaborador)}
                  className="w-full"
                >
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {colaboradoresFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum colaborador encontrado</p>
        </div>
      )}

      <ColaboradorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        colaborador={colaboradorEdit}
        onSave={handleCloseModal}
      />
    </div>
  );
};

export default Colaboradores;
