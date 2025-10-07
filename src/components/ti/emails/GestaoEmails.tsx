import { useState, useMemo } from "react";
import { Search, Plus, Edit, Key, Trash2, Smartphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tiModules } from "@/data/tiModules";
import type { ContaEmail } from "@/types/ti";
import { NovaContaEmailModal } from "./NovaContaEmailModal";
import { EditarEmailModal } from "./EditarEmailModal";
import { ConfirmacaoExclusaoModal } from "./ConfirmacaoExclusaoModal";
import ConfiguracaoDispositivoModal from "./ConfiguracaoDispositivoModal";
import RelatoriosEmail from "./RelatoriosEmail";

const GestaoEmails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [showNovaContaModal, setShowNovaContaModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExclusaoModal, setShowExclusaoModal] = useState(false);
  const [showDispositivoModal, setShowDispositivoModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<ContaEmail | null>(null);

  const emails = tiModules.emails.subModules.contas.data as ContaEmail[];

  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const matchesSearch = email.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           email.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "todos" || email.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [emails, searchTerm, statusFilter]);

  const getStatusBadge = (status: ContaEmail['status']) => {
    const statusConfig = {
      ativo: { label: "Ativo", className: "bg-green-100 text-green-800" },
      bloqueado: { label: "Bloqueado", className: "bg-red-100 text-red-800" },
      redirecionado: { label: "Redirecionado", className: "bg-yellow-100 text-yellow-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleEditEmail = (email: ContaEmail) => {
    setSelectedEmail(email);
    setShowEditarModal(true);
  };

  const handleResetPassword = (email: ContaEmail) => {
    // Implementar reset de senha
    console.log("Reset senha para:", email.endereco);
  };

  const handleDeleteEmail = (email: ContaEmail) => {
    setSelectedEmail(email);
    setShowExclusaoModal(true);
  };

  const handleConfigurarDispositivo = (email: ContaEmail) => {
    setSelectedEmail(email);
    setShowDispositivoModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Contas de E-mail</h1>
          <p className="text-gray-600">Gerencie todas as contas de e-mail da empresa</p>
        </div>
        <Button 
          onClick={() => setShowNovaContaModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Nova Conta de E-mail
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="gestao" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gestao">Gestão de Contas</TabsTrigger>
          <TabsTrigger value="relatorios">
            <BarChart3 className="h-4 w-4 mr-2" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gestao" className="space-y-6">
          {/* Filtros */}
          <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Pesquisar por nome ou e-mail"
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
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                  <SelectItem value="redirecionado">Redirecionado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endereço de E-mail</TableHead>
                  <TableHead>Nome do Usuário</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Redirecionado para</TableHead>
                  <TableHead className="w-48">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmails.map((email) => (
                  <TableRow key={email.id} className="group hover:bg-gray-50">
                    <TableCell className="font-medium">{email.endereco}</TableCell>
                    <TableCell>{email.nomeUsuario}</TableCell>
                    <TableCell>{email.departamento}</TableCell>
                    <TableCell>{getStatusBadge(email.status)}</TableCell>
                    <TableCell className="text-gray-500">
                      {email.redirecionadoPara || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditEmail(email)}
                          title="Editar configurações"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleConfigurarDispositivo(email)}
                          title="Configurar dispositivo móvel"
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleResetPassword(email)}
                          title="Resetar senha"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteEmail(email)}
                          title="Excluir conta"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="relatorios">
          <RelatoriosEmail />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NovaContaEmailModal 
        open={showNovaContaModal} 
        onClose={() => setShowNovaContaModal(false)} 
      />
      <EditarEmailModal 
        open={showEditarModal} 
        onClose={() => setShowEditarModal(false)}
        email={selectedEmail}
      />
      <ConfirmacaoExclusaoModal 
        open={showExclusaoModal} 
        onClose={() => setShowExclusaoModal(false)}
        email={selectedEmail}
      />
      <ConfiguracaoDispositivoModal 
        open={showDispositivoModal} 
        onClose={() => setShowDispositivoModal(false)}
        email={selectedEmail}
      />
    </div>
  );
};

export default GestaoEmails;