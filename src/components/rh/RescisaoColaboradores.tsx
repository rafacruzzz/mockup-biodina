import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useColaboradores } from "@/hooks/useColaboradores";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, UserMinus } from "lucide-react";

const RescisaoColaboradores = () => {
  const { colaboradores } = useColaboradores();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedFonte, setSelectedFonte] = useState("todas");

  // Get unique departments for filter
  const departamentos = useMemo(() => {
    const unique = [...new Set(colaboradores.map(c => c.departamento))];
    return unique.sort();
  }, [colaboradores]);

  // Fixed status options
  const statuses = ['Ativo', 'Desligado'];

  // Filter colaboradores based on search and filters
  const filteredColaboradores = useMemo(() => {
    return colaboradores.filter(colaborador => {
      const matchesSearch = 
        colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colaborador.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartamento = selectedDepartamento === "todos" || colaborador.departamento === selectedDepartamento;
      const matchesStatus = selectedStatus === "todos" || colaborador.status === selectedStatus;
      
      return matchesSearch && matchesDepartamento && matchesStatus;
    });
  }, [colaboradores, searchTerm, selectedDepartamento, selectedStatus]);

  const handleDesligarClick = (colaboradorId: string, colaboradorNome: string) => {
    navigate(`/rh/rescisao/${colaboradorId}`);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Ativo': 'bg-green-100 text-green-800',
      'Desligado': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Rescisão de Colaboradores</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        {/* Filtros */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Filtros de Pesquisa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email, habilidades"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDepartamento} onValueChange={setSelectedDepartamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os departamentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os departamentos</SelectItem>
                  {departamentos.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedFonte} onValueChange={setSelectedFonte}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as fontes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as fontes</SelectItem>
                  <SelectItem value="recrutamento">Recrutamento</SelectItem>
                  <SelectItem value="indicacao">Indicação</SelectItem>
                  <SelectItem value="banco-talentos">Banco de Talentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de colaboradores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Colaboradores ({filteredColaboradores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Admissão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColaboradores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Nenhum colaborador encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredColaboradores.map((colaborador) => (
                    <TableRow key={colaborador.id}>
                      <TableCell className="font-medium">{colaborador.nome}</TableCell>
                      <TableCell>{colaborador.cargo}</TableCell>
                      <TableCell>{colaborador.departamento}</TableCell>
                      <TableCell>{colaborador.email}</TableCell>
                      <TableCell>{getStatusBadge(colaborador.status)}</TableCell>
                      <TableCell>{new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDesligarClick(colaborador.id, colaborador.nome)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={colaborador.status === 'Desligado'}
                        >
                          <UserMinus className="h-4 w-4 mr-1" />
                          Desligar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RescisaoColaboradores;