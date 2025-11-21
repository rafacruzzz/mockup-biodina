import { useState } from "react";
import { Building2, Plus, Edit, Power, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmpresa } from "@/contexts/EmpresaContext";
import FilialModal from "./FilialModal";
import { Filial } from "@/types/super";

const GestaoFiliais = () => {
  const { empresaAtual, filiais, suspenderFilial, ativarFilial } = useEmpresa();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFilial, setEditingFilial] = useState<Filial | null>(null);

  const limiteFiliais = empresaAtual?.configuracoes.quantidadeFiliais || 0;
  const filiaisCadastradas = filiais.length;
  const limiteAtingido = limiteFiliais !== -1 && filiaisCadastradas >= limiteFiliais;
  const percentualUso = limiteFiliais === -1 ? 0 : (filiaisCadastradas / limiteFiliais) * 100;

  const filteredFiliais = filiais.filter(filial =>
    filial.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    filial.cnpj.includes(searchTerm) ||
    filial.endereco?.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewFilial = () => {
    setEditingFilial(null);
    setIsModalOpen(true);
  };

  const handleEditFilial = (filial: Filial) => {
    setEditingFilial(filial);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (filialId: string, currentStatus: string) => {
    if (currentStatus === 'ativa') {
      suspenderFilial(filialId);
    } else {
      ativarFilial(filialId);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      ativa: "default",
      inativa: "secondary",
      suspensa: "destructive"
    };
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header com contador */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <Building2 className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-biodina-blue">Gestão de Filiais</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Gerencie as filiais da empresa {empresaAtual?.nome}
                </p>
              </div>
            </div>
            <Button
              onClick={handleNewFilial}
              disabled={limiteAtingido}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Filial
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Contador de filiais */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Filiais Cadastradas</p>
                <p className="text-2xl font-bold text-biodina-blue">
                  {filiaisCadastradas} {limiteFiliais === -1 ? '' : `/ ${limiteFiliais}`}
                </p>
              </div>
              {limiteFiliais !== -1 && (
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        percentualUso >= 80 ? 'bg-red-500' : 
                        percentualUso >= 60 ? 'bg-yellow-500' : 
                        'bg-biodina-gold'
                      }`}
                      style={{ width: `${Math.min(percentualUso, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{percentualUso.toFixed(0)}%</span>
                </div>
              )}
            </div>

            {limiteAtingido && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  ⚠️ Limite de filiais atingido. Para adicionar mais filiais, atualize o plano ou entre em contato com o suporte.
                </p>
              </div>
            )}

            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, CNPJ ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de filiais */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead>Módulos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiliais.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'Nenhuma filial encontrada' : 'Nenhuma filial cadastrada ainda'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiliais.map((filial) => (
                  <TableRow key={filial.id}>
                    <TableCell className="font-medium">{filial.nome}</TableCell>
                    <TableCell>{filial.cnpj}</TableCell>
                    <TableCell>
                      {filial.endereco ? `${filial.endereco.cidade}/${filial.endereco.uf}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {filial.modulosHabilitados.length} módulos
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(filial.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditFilial(filial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(filial.id, filial.status)}
                        >
                          <Power className={`h-4 w-4 ${filial.status === 'ativa' ? 'text-green-600' : 'text-gray-400'}`} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FilialModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        filial={editingFilial}
      />
    </div>
  );
};

export default GestaoFiliais;
