
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Licitacao } from "@/types/licitacao";
import { FileText, MapPin, Calendar, Target, Users, Building } from "lucide-react";

interface LicitacaoCardProps {
  licitacao: Licitacao;
  onEdit: (licitacao: Licitacao) => void;
  onConvert: (licitacao: Licitacao) => void;
}

const LicitacaoCard = ({ licitacao, onEdit, onConvert }: LicitacaoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'triagem': return 'bg-yellow-500';
      case 'acompanhamento': return 'bg-blue-500';
      case 'finalizada': return 'bg-gray-500';
      case 'convertida': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'triagem': return 'Triagem';
      case 'acompanhamento': return 'Acompanhamento';
      case 'finalizada': return 'Encerrada';
      case 'convertida': return 'Convertida em Oportunidade';
      default: return status;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-biodina-blue">
              {licitacao.numeroPregao}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{licitacao.nomeInstituicao}</p>
          </div>
          <Badge className={`${getStatusColor(licitacao.status)} text-white`}>
            {getStatusLabel(licitacao.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{licitacao.uf} - {licitacao.municipio}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{licitacao.dataAbertura}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" />
            <span>Item {licitacao.numeroItem}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span>{licitacao.palavraChave}</span>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <p className="text-sm text-gray-700 line-clamp-2">
            {licitacao.objetoLicitacao}
          </p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(licitacao)}>
            Editar
          </Button>
          {licitacao.status !== 'convertida' && (
            <Button 
              size="sm" 
              className="bg-biodina-gold hover:bg-biodina-gold/90"
              onClick={() => onConvert(licitacao)}
            >
              Converter para Oportunidade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LicitacaoCard;
