
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, Plane } from "lucide-react";

interface TipoPropostaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (tipo: 'licitacao' | 'contratacao_simples' | 'importacao_direta') => void;
}

const TipoPropostaModal = ({ isOpen, onClose, onContinue }: TipoPropostaModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Selecione o Tipo de Proposta
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onContinue('licitacao')}>
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-lg">Licitação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Para processos licitatórios públicos com todas as fases de concorrência.
              </p>
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => onContinue('licitacao')}
              >
                Selecionar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onContinue('contratacao_simples')}>
            <CardHeader className="text-center">
              <Building className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle className="text-lg">Contratação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Para contratações diretas e negociações comerciais tradicionais.
              </p>
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => onContinue('contratacao_simples')}
              >
                Selecionar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onContinue('importacao_direta')}>
            <CardHeader className="text-center">
              <Plane className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle className="text-lg">Importação Direta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Para processos de importação direta com controle específico de documentação.
              </p>
              <Button 
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => onContinue('importacao_direta')}
              >
                Selecionar
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipoPropostaModal;
