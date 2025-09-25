import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  DollarSign, 
  Building2, 
  User, 
  FileText, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  CreditCard,
  Eye,
  Edit
} from "lucide-react";

interface ContaDetalhes {
  id: string;
  descricao: string;
  valor: number;
  fornecedor: string;
  status: string;
  tipo: string;
  origem: string;
  setor: string;
  solicitante: string;
  detalhes: Record<string, any>;
}

interface DetalhesContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conta: ContaDetalhes | null;
}

const DetalhesContaModal = ({ isOpen, onClose, conta }: DetalhesContaModalProps) => {
  if (!conta) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'normal':
        return { icon: Clock, color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Pendente' };
      case 'aprovado':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-700 border-green-200', label: 'Aprovado' };
      case 'urgente':
        return { icon: AlertTriangle, color: 'bg-red-100 text-red-700 border-red-200', label: 'Urgente' };
      case 'recorrente':
        return { icon: Calendar, color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Recorrente' };
      default:
        return { icon: Clock, color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Pendente' };
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'suprimentos': return '📦';
      case 'passagem': return '✈️';
      case 'hospedagem': return '🏨';
      case 'treinamento': return '🎓';
      case 'software': return '💻';
      case 'manutencao': return '🔧';
      case 'aluguel': return '🏢';
      case 'consultoria': return '👥';
      case 'marketing': return '📢';
      case 'telecom': return '📞';
      case 'juridico': return '⚖️';
      case 'combustivel': return '⛽';
      default: return '📄';
    }
  };

  const statusInfo = getStatusInfo(conta.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{getTipoIcon(conta.tipo)}</span>
            <div>
              <div>Detalhes da Conta a Pagar</div>
              <div className="text-sm font-normal text-muted-foreground mt-1">
                {conta.id} • {conta.setor}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Principais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descrição</label>
                  <p className="text-sm font-semibold">{conta.descricao}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor</label>
                  <p className="text-lg font-bold text-primary">{formatCurrency(conta.valor)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant="outline" className={statusInfo.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {conta.fornecedor}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Solicitante</label>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {conta.solicitante}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Origem</label>
                  <p className="text-sm font-semibold">{conta.origem}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes Específicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Detalhes Específicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(conta.detalhes).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagar Conta
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Documentos
                </Button>
                {conta.status === 'normal' && (
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                )}
                {conta.origem.includes('Chamado') && (
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Chamado Original
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Processar Pagamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesContaModal;