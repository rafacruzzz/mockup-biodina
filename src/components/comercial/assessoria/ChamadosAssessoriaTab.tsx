import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertCircle, Eye, LogOut, UserCircle } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChamadosAssessoriaTabProps {
  departamento: "Assessoria Científica" | "Departamento Técnico";
}

const ASSESSORES_DEMO = [
  { id: 'resp-001', nome: 'Dr. Carlos Mendes', departamento: 'Assessoria Científica' },
  { id: 'resp-003', nome: 'Dra. Maria Santos', departamento: 'Assessoria Científica' },
  { id: 'resp-004', nome: 'Dr. Fernando Souza', departamento: 'Assessoria Científica' },
];

export function ChamadosAssessoriaTab({ departamento }: ChamadosAssessoriaTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChamado, setSelectedChamado] = useState<ChamadoAssessoria | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [demoUserId, setDemoUserId] = useState<string>('resp-001');
  const [viewMode, setViewMode] = useState<'assessor' | 'gestor'>('assessor');
  
  const { getCurrentUser, isGestor } = useAuthDemo();
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const isUserGestor = isGestor();
  
  const effectiveUserId = viewMode === 'gestor' ? null : demoUserId;
  const selectedAssessor = ASSESSORES_DEMO.find(a => a.id === demoUserId);
  const isDemoMode = true;

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
    // Filtro 1: Apenas status ATIVO
    if (!isStatusAtivo(chamado.status)) return false;
    
    // Filtro 2: Por assessor (com modo gestor)
    if (viewMode === 'assessor' && effectiveUserId) {
      if (chamado.assessorVinculadoId !== effectiveUserId) return false;
    }
    
    // Filtro 3: Busca textual
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

      {isDemoMode && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">🎭 Modo Demonstração</p>
                  <p className="text-xs text-blue-700">Visualizar chamados como:</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={demoUserId} onValueChange={setDemoUserId} disabled={viewMode === 'gestor'}>
                  <SelectTrigger className="w-[250px] bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSESSORES_DEMO.map(assessor => (
                      <SelectItem key={assessor.id} value={assessor.id}>
                        {assessor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  variant={viewMode === 'gestor' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'gestor' ? 'assessor' : 'gestor')}
                  className="whitespace-nowrap"
                >
                  {viewMode === 'gestor' ? '✓ Ver Todos' : 'Ver Todos'}
                </Button>
              </div>
            </div>
            
            {viewMode === 'assessor' && selectedAssessor && (
              <p className="text-xs text-blue-600 mt-2">
                Mostrando {chamadosAtivos.length} chamado(s) atribuído(s) a {selectedAssessor.nome}
              </p>
            )}
            {viewMode === 'gestor' && (
              <p className="text-xs text-blue-600 mt-2">
                Mostrando todos os {chamadosAtivos.length} chamados ativos (Modo Gestor)
              </p>
            )}
          </CardContent>
        </Card>
      )}

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
