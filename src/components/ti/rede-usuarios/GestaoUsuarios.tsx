import { useState, useMemo } from "react";
import { Search, Plus, Edit, Key, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tiModules } from "@/data/tiModules";
import type { UsuarioRede } from "@/types/ti";
import { NovoUsuarioModal } from "./NovoUsuarioModal";
import { EditarPermissoesModal } from "./EditarPermissoesModal";

const GestaoUsuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [showNovoUsuarioModal, setShowNovoUsuarioModal] = useState(false);
  const [showPermissoesModal, setShowPermissoesModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioRede | null>(null);

  const usuarios = tiModules.usuarios_rede.subModules.usuarios.data as UsuarioRede[];

  const filteredUsers = useMemo(() => {
    return usuarios.filter(user => {
      const matchesSearch = user.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "todos" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [usuarios, searchTerm, statusFilter]);

  const getStatusBadge = (status: UsuarioRede['status']) => {
    const statusConfig = {
      ativo: { label: "Ativo", className: "bg-green-100 text-green-800" },
      inativo: { label: "Inativo", className: "bg-gray-100 text-gray-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleEditPermissions = (user: UsuarioRede) => {
    setSelectedUser(user);
    setShowPermissoesModal(true);
  };

  const handleResetPassword = (user: UsuarioRede) => {
    // Implementar reset de senha
    console.log("Reset senha para:", user.nomeUsuario);
  };

  const handleDeactivateUser = (user: UsuarioRede) => {
    // Implementar desativação de usuário
    console.log("Desativar usuário:", user.nomeUsuario);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários de Rede</h1>
          <p className="text-gray-600">Gerencie os acessos e permissões de rede dos usuários</p>
        </div>
        <Button 
          onClick={() => setShowNovoUsuarioModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo Usuário de Rede
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por nome de usuário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome de Usuário (Login)</TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Grupos de Permissão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="group hover:bg-gray-50">
                <TableCell className="font-mono text-sm">{user.nomeUsuario}</TableCell>
                <TableCell className="font-medium">{user.nomeCompleto}</TableCell>
                <TableCell>{user.departamento}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.gruposPermissao.slice(0, 2).map((grupo, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {grupo}
                      </Badge>
                    ))}
                    {user.gruposPermissao.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.gruposPermissao.length - 2} mais
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditPermissions(user)}
                      title="Editar permissões"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleResetPassword(user)}
                      title="Resetar senha"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeactivateUser(user)}
                      title="Desativar usuário"
                      className="text-red-600 hover:text-red-700"
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <NovoUsuarioModal 
        open={showNovoUsuarioModal} 
        onClose={() => setShowNovoUsuarioModal(false)} 
      />
      <EditarPermissoesModal 
        open={showPermissoesModal} 
        onClose={() => setShowPermissoesModal(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default GestaoUsuarios;