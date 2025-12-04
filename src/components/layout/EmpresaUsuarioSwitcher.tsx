import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Check } from "lucide-react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface EmpresaUsuarioSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmpresaUsuarioSwitcher = ({ isOpen, onClose }: EmpresaUsuarioSwitcherProps) => {
  const { user } = useUser();
  const { empresaAtual, filialAtual, empresas, filiais, trocarEmpresa, trocarFilial } = useEmpresa();

  // Empresas vinculadas do usuário
  const empresasVinculadas = user?.empresasVinculadas || [];

  // Se não há empresas vinculadas, usar todas as empresas disponíveis
  const empresasDisponiveis = empresasVinculadas.length > 0
    ? empresasVinculadas
    : [
        ...(empresaAtual ? [{ id: empresaAtual.id, tipo: 'principal' as const, nome: empresaAtual.nome }] : []),
        ...filiais.map(f => ({ id: f.id, tipo: 'filial' as const, nome: f.nome }))
      ];

  const handleSelectEmpresa = (empresaId: string, tipo: 'principal' | 'filial') => {
    if (tipo === 'principal') {
      // Selecionar empresa principal
      trocarEmpresa(empresaId);
      trocarFilial(null);
    } else {
      // Selecionar filial
      trocarFilial(empresaId);
    }
    onClose();
  };

  // Verificar qual empresa/filial está selecionada
  const isSelected = (id: string, tipo: 'principal' | 'filial') => {
    if (tipo === 'principal') {
      return !filialAtual && empresaAtual?.id === id;
    }
    return filialAtual?.id === id;
  };

  // Nome atual para exibição
  const nomeAtual = filialAtual?.nome || empresaAtual?.nome || 'Selecione uma empresa';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-biodina-gold" />
            Trocar Empresa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Selecione a empresa que deseja acessar:
          </p>

          {empresasDisponiveis.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma empresa vinculada ao seu usuário.
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {empresasDisponiveis.map((empresa) => (
                <Button
                  key={empresa.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-3 px-4",
                    isSelected(empresa.id, empresa.tipo) && "border-biodina-gold bg-biodina-gold/5"
                  )}
                  onClick={() => handleSelectEmpresa(empresa.id, empresa.tipo)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div className="text-left">
                        <span className="font-medium">{empresa.nome}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={empresa.tipo === 'principal' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {empresa.tipo === 'principal' ? 'Principal' : 'Filial'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {isSelected(empresa.id, empresa.tipo) && (
                      <Check className="h-4 w-4 text-biodina-gold" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmpresaUsuarioSwitcher;
