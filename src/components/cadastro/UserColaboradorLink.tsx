
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, User, Briefcase, Mail, Phone } from 'lucide-react';
import { useColaboradores } from '@/hooks/useColaboradores';

interface UserColaboradorLinkProps {
  colaboradorId: string;
  onViewColaborador: () => void;
}

const UserColaboradorLink = ({ colaboradorId, onViewColaborador }: UserColaboradorLinkProps) => {
  const { colaboradores } = useColaboradores();
  
  const colaborador = colaboradores.find(c => c.id === colaboradorId);

  if (!colaborador) {
    return null;
  }

  return (
    <Card className="border-biodina-gold/20 bg-biodina-gold/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-biodina-gold" />
              <span className="font-medium">{colaborador.nome}</span>
              <Badge variant="outline" className="text-xs">
                {colaborador.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                <span>{colaborador.cargo}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{colaborador.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs">Depto:</span>
                <span>{colaborador.departamento}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{colaborador.telefone}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewColaborador}
            className="border-biodina-gold text-biodina-gold hover:bg-biodina-gold hover:text-white"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Ver Dados Completos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserColaboradorLink;
