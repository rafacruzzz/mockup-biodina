import { useState, useMemo } from "react";
import { Search, Plus, Edit, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tiModules } from "@/data/tiModules";
import type { RamalTelefone } from "@/types/ti";
import { NovoRamalModal } from "./NovoRamalModal";
import { EditarRamalModal } from "./EditarRamalModal";
import { RegistrarDefeitoModal } from "./RegistrarDefeitoModal";

const GestaoTelefonia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNovoRamalModal, setShowNovoRamalModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showDefeitoModal, setShowDefeitoModal] = useState(false);
  const [selectedRamal, setSelectedRamal] = useState<RamalTelefone | null>(null);

  const ramais = tiModules.telefonia.subModules.ramais.data as RamalTelefone[];

  const filteredRamais = useMemo(() => {
    return ramais.filter(ramal => {
      const searchTermLower = searchTerm.toLowerCase();
      return ramal.numeroRamal.includes(searchTerm) ||
             (ramal.usuarioAssociado?.toLowerCase().includes(searchTermLower)) ||
             ramal.setor.toLowerCase().includes(searchTermLower);
    });
  }, [ramais, searchTerm]);

  const getStatusBadge = (status: RamalTelefone['status']) => {
    const statusConfig = {
      operacional: { label: "Operacional", className: "bg-green-100 text-green-800" },
      com_defeito: { label: "Com Defeito", className: "bg-red-100 text-red-800" },
      em_manutencao: { label: "Em Manutenção", className: "bg-yellow-100 text-yellow-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleEditRamal = (ramal: RamalTelefone) => {
    setSelectedRamal(ramal);
    setShowEditarModal(true);
  };

  const handleRegistrarDefeito = (ramal: RamalTelefone) => {
    setSelectedRamal(ramal);
    setShowDefeitoModal(true);
  };

  const ramaisOperacionais = ramais.filter(r => r.status === 'operacional').length;
  const ramaisComDefeito = ramais.filter(r => r.status === 'com_defeito').length;
  const ramaisManutencao = ramais.filter(r => r.status === 'em_manutencao').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Telefonia e Ramais</h1>
          <p className="text-gray-600">Diretório central de ramais e gestão dos aparelhos telefônicos</p>
        </div>
        <Button 
          onClick={() => setShowNovoRamalModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Novo Ramal
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Ramais</p>
              <p className="text-xl font-bold">{ramais.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Operacionais</p>
              <p className="text-xl font-bold text-green-600">{ramaisOperacionais}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Com Defeito</p>
              <p className="text-xl font-bold text-red-600">{ramaisComDefeito}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Em Manutenção</p>
              <p className="text-xl font-bold text-yellow-600">{ramaisManutencao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar por ramal, nome ou setor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número do Ramal</TableHead>
              <TableHead>Usuário Associado</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Modelo do Aparelho</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead className="w-32">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRamais.map((ramal) => (
              <TableRow key={ramal.id} className="group hover:bg-gray-50">
                <TableCell className="font-mono text-lg font-bold">{ramal.numeroRamal}</TableCell>
                <TableCell className="font-medium">
                  {ramal.usuarioAssociado || <span className="text-gray-400 italic">Não associado</span>}
                </TableCell>
                <TableCell>{ramal.setor}</TableCell>
                <TableCell className="text-sm">{ramal.modeloAparelho}</TableCell>
                <TableCell>{getStatusBadge(ramal.status)}</TableCell>
                <TableCell className="text-sm text-gray-600">{ramal.localizacao}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditRamal(ramal)}
                      title="Editar ramal"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRegistrarDefeito(ramal)}
                      title="Registrar defeito"
                      className="text-red-600 hover:text-red-700"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredRamais.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum ramal encontrado com os critérios de busca</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <NovoRamalModal 
        open={showNovoRamalModal} 
        onClose={() => setShowNovoRamalModal(false)} 
      />
      <EditarRamalModal 
        open={showEditarModal} 
        onClose={() => setShowEditarModal(false)}
        ramal={selectedRamal}
      />
      <RegistrarDefeitoModal 
        open={showDefeitoModal} 
        onClose={() => setShowDefeitoModal(false)}
        ramal={selectedRamal}
      />
    </div>
  );
};

export default GestaoTelefonia;