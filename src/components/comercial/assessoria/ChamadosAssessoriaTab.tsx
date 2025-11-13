import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertCircle, Eye, LogOut } from "lucide-react";
import { chamadosAssessoriaMock, isStatusAtivo } from "@/data/assessoria-cientifica";
import { 
  ChamadoAssessoria, 
  StatusChamado, 
  UrgenciaChamado,
  TIPO_CHAMADO_LABELS,
  STATUS_CHAMADO_LABELS,
  URGENCIA_CHAMADO_LABELS
} from "@/types/assessoria-cientifica";
import { DetalhesChamadoSheet } from "./DetalhesChamadoSheet";
import { useAuthDemo } from "@/hooks/useAuthDemo";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChamadosAssessoriaTabProps {
  departamento: "Assessoria Científica" | "Departamento Técnico";
}

export function ChamadosAssessoriaTab({ departamento }: ChamadosAssessoriaTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChamado, setSelectedChamado] = useState<ChamadoAssessoria | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const { getCurrentUser, isGestor } = useAuthDemo();
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const isUserGestor = isGestor();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleDetalhamentoClick = (chamado: ChamadoAssessoria) => {
    setSelectedChamado(chamado);
    setIsSheetOpen(true);
  };

  const getStatusColor = (status: StatusChamado) => {
    switch (status) {
      case 'ABERTO': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'EM_ANALISE': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'EM_EXECUCAO': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'AGUARDANDO_CLIENTE': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'AGUARDANDO_AREA': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'RESOLVIDO': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgenciaColor = (urgencia: UrgenciaChamado) => {
    switch (urgencia) {
      case 'BAIXA': return 'bg-green-100 text-green-800 border-green-300';
      case 'MEDIA': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ALTA': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'URGENTE': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const chamadosAtivos = chamadosAssessoriaMock.filter(chamado => {
    if (!isStatusAtivo(chamado.status)) return false;
    if (!isUserGestor && chamado.assessorVinculadoId !== currentUser?.id) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        chamado.numeroChamado.toLowerCase().includes(searchLower) ||
        chamado.numeroOS.toLowerCase().includes(searchLower) ||
        chamado.clienteNome.toLowerCase().includes(searchLower) ||
        (chamado.equipamentoModelo?.toLowerCase() || '').includes(searchLower) ||
        (chamado.numeroSerieLote?.toLowerCase() || '').includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-biodina-blue text-white">
              {currentUser?.nome ? currentUser.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{currentUser?.nome || 'Usuário'}</p>
            <p className="text-sm text-muted-foreground">{isUserGestor ? 'Gestor' : 'Assessor'} - {departamento}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />Sair
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />Chamados Ativos por Assessor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por código, cliente, equipamento..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>

          <Badge variant="outline" className="bg-blue-50">{chamadosAtivos.length} chamados ativos</Badge>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código da OS</TableHead>
                  <TableHead>Chamado por</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Nº Série/Lote</TableHead>
                  <TableHead>Tipo da OS</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgência</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chamadosAtivos.map((chamado) => (
                  <TableRow key={chamado.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{chamado.numeroOS}</TableCell>
                    <TableCell><div><div className="text-sm">{chamado.abertoPorNome}</div><div className="text-xs text-muted-foreground">{chamado.origem}</div></div></TableCell>
                    <TableCell>{chamado.clienteNome}</TableCell>
                    <TableCell>{chamado.equipamentoModelo || '-'}</TableCell>
                    <TableCell className="font-mono text-sm">{chamado.numeroSerieLote || '-'}</TableCell>
                    <TableCell><Badge variant="outline">{TIPO_CHAMADO_LABELS[chamado.tipo]}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className={getStatusColor(chamado.status)}>{STATUS_CHAMADO_LABELS[chamado.status]}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className={getUrgenciaColor(chamado.urgencia)}>{URGENCIA_CHAMADO_LABELS[chamado.urgencia]}</Badge></TableCell>
                    <TableCell className="text-center"><Button variant="ghost" size="sm" onClick={() => handleDetalhamentoClick(chamado)}><Eye className="h-4 w-4 mr-2" />Detalhamento</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedChamado && <DetalhesChamadoSheet chamado={selectedChamado} isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />}
    </div>
  );
}
