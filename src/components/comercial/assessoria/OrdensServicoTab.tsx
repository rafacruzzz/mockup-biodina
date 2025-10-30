import { useState, useEffect } from "react";
import { Plus, Search, Edit, Eye, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ordensServicoMock, getTipoOSLabel, getStatusColor, assessoresTecnicos } from "@/data/assessoria-cientifica";
import { OrdemServico, StatusOS } from "@/types/assessoria-cientifica";
import { FormularioOS } from "./FormularioOS";
import { AssinaturaLoteModal } from "./AssinaturaLoteModal";
import { format } from "date-fns";
import { useAuthDemo } from "@/hooks/useAuthDemo";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrdensServicoTabProps {
  statusFilterFromAlert?: StatusOS[];
}

export function OrdensServicoTab({ statusFilterFromAlert }: OrdensServicoTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusOS[]>([]);
  const [selectedOS, setSelectedOS] = useState<OrdemServico | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isNewOS, setIsNewOS] = useState(false);
  const [selectedForSignature, setSelectedForSignature] = useState<string[]>([]);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof OrdemServico | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [assessorFilter, setAssessorFilter] = useState<string>("todos");
  
  const { getCurrentUser, logout, isGestor } = useAuthDemo();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Aplicar filtro de status quando vem do alerta
  useEffect(() => {
    if (statusFilterFromAlert) {
      setStatusFilter(statusFilterFromAlert);
    }
  }, [statusFilterFromAlert]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredOS = ordensServicoMock
    .filter((os) => {
      // FILTRO POR PERFIL: Assessor vê apenas suas OSs
      if (currentUser && !isGestor()) {
        if (os.responsavelId !== currentUser.id) {
          return false;
        }
      }

      // FILTRO POR ASSESSOR (para gestores)
      if (isGestor() && assessorFilter !== "todos") {
        if (os.responsavelId !== assessorFilter) {
          return false;
        }
      }

      const searchLower = searchTerm.toLowerCase();
      const matchSearch = (
        os.numero.toLowerCase().includes(searchLower) ||
        os.cliente.toLowerCase().includes(searchLower) ||
        os.equipamento?.toLowerCase().includes(searchLower) ||
        os.responsavel.toLowerCase().includes(searchLower)
      );

      const matchStatus = statusFilter.length === 0 || statusFilter.includes(os.status);

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      let comparison = 0;
      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const handleNewOS = () => {
    setSelectedOS(null);
    setIsNewOS(true);
    setIsFormOpen(true);
  };

  const handleEditOS = (os: OrdemServico) => {
    setSelectedOS(os);
    setIsNewOS(false);
    setIsFormOpen(true);
  };

  const handleViewOS = (os: OrdemServico) => {
    setSelectedOS(os);
    setIsNewOS(false);
    setIsFormOpen(true);
  };

  const handleToggleSignature = (osId: string) => {
    setSelectedForSignature((prev) =>
      prev.includes(osId) ? prev.filter((id) => id !== osId) : [...prev, osId]
    );
  };

  const handleSignatureLote = () => {
    if (selectedForSignature.length > 0) {
      setIsSignatureModalOpen(true);
    }
  };

  const handleSort = (field: keyof OrdemServico) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: keyof OrdemServico }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  const getStatusBadge = (status: OrdemServico["status"]) => {
    const colors = getStatusColor(status);
    return (
      <Badge
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
        className="border"
      >
        {status.replace("_", " ")}
      </Badge>
    );
  };

  if (isFormOpen) {
    return (
      <FormularioOS
        os={selectedOS}
        isNew={isNewOS}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedOS(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Indicador de Perfil */}
      {currentUser && (
        <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <Badge variant={isGestor() ? "default" : "secondary"} className="text-sm">
              {isGestor() ? "👥 Gestora" : "👤 Assessora"}
            </Badge>
            <span className="text-sm font-medium">{currentUser.nome}</span>
            <span className="text-xs text-muted-foreground">({currentUser.email})</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Trocar Perfil
          </Button>
        </div>
      )}

      {/* Filtro de Assessor (apenas para gestores) */}
      {isGestor() && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filtrar por Assessor:</label>
          <Select value={assessorFilter} onValueChange={setAssessorFilter}>
            <SelectTrigger className="w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Assessores</SelectItem>
              {assessoresTecnicos
                .filter(a => a.departamento === "Assessoria Científica")
                .map(assessor => (
                  <SelectItem key={assessor.id} value={assessor.id}>
                    {assessor.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {assessorFilter !== "todos" && (
            <Badge variant="secondary">
              Mostrando: {assessoresTecnicos.find(a => a.id === assessorFilter)?.nome}
            </Badge>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, cliente, equipamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {statusFilter.length > 0 && (
            <Badge variant="secondary" className="gap-2">
              Filtro Ativo: {statusFilter.map(s => s.replace("_", " ")).join(", ")}
              <button 
                onClick={() => setStatusFilter([])}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ✕
              </button>
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedForSignature.length > 0 && (
            <Button onClick={handleSignatureLote} variant="outline">
              Assinatura em Lote ({selectedForSignature.length})
            </Button>
          )}
          <Button onClick={handleNewOS}>
            <Plus className="h-4 w-4 mr-2" />
            Nova OS
          </Button>
        </div>
      </div>

      {/* Tabela de OS */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox disabled />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleSort("numero")}
              >
                Código OS<SortIcon field="numero" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleSort("cliente")}
              >
                Cliente<SortIcon field="cliente" />
              </TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Nº Série/Lote</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Aberto por</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleSort("responsavel")}
              >
                Responsável<SortIcon field="responsavel" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleSort("abertoEm")}
              >
                Data Abertura<SortIcon field="abertoEm" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleSort("status")}
              >
                Status<SortIcon field="status" />
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOS.map((os) => (
              <TableRow key={os.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedForSignature.includes(os.id)}
                    onCheckedChange={() => handleToggleSignature(os.id)}
                    disabled={os.status !== "CONCLUÍDA" || os.opcaoAtendimento !== "presencial"}
                  />
                </TableCell>
                <TableCell className="font-medium">{os.numero}</TableCell>
                <TableCell>{os.cliente}</TableCell>
                <TableCell>{os.equipamento || "-"}</TableCell>
                <TableCell>{os.numeroSerieLote || "-"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {os.tipo.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {getTipoOSLabel(t)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{os.abertoPor}</TableCell>
                <TableCell>{os.responsavel}</TableCell>
                <TableCell>{format(os.abertoEm, "dd/MM/yyyy")}</TableCell>
                <TableCell>{getStatusBadge(os.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOS(os)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditOS(os)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AssinaturaLoteModal
        open={isSignatureModalOpen}
        onClose={() => {
          setIsSignatureModalOpen(false);
          setSelectedForSignature([]);
        }}
        osIds={selectedForSignature}
      />
    </div>
  );
}
