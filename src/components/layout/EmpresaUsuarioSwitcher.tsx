import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Check } from "lucide-react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { EmpresaVinculada, ModuloUsuario } from "@/types/permissions";

interface EmpresaUsuarioSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

// Verifica se a empresa tem pelo menos um módulo/submódulo habilitado
const temModuloHabilitado = (moduleAccess?: ModuloUsuario[]): boolean => {
  if (!moduleAccess || moduleAccess.length === 0) return false;
  
  return moduleAccess.some(modulo => 
    modulo.habilitado && modulo.subModulos?.some(sub => sub.habilitado)
  );
};

// Filtra empresas onde o usuário tem pelo menos um módulo habilitado
const filtrarEmpresasComAcesso = (
  empresasVinculadas: EmpresaVinculada[]
): EmpresaVinculada[] => {
  // Filtra apenas empresas que têm pelo menos um módulo habilitado
  const empresasComAcesso = empresasVinculadas.filter(empresa => 
    temModuloHabilitado(empresa.moduleAccess)
  );

  // Se nenhuma empresa tem módulos configurados, retorna todas
  // (para compatibilidade com dados antigos ou usuários sem permissões ainda)
  if (empresasComAcesso.length === 0 && empresasVinculadas.length > 0) {
    return empresasVinculadas;
  }

  return empresasComAcesso;
};

const EmpresaUsuarioSwitcher = ({ isOpen, onClose }: EmpresaUsuarioSwitcherProps) => {
  const { user } = useUser();
  const { empresaAtual, filialAtual, trocarEmpresa, trocarFilial } = useEmpresa();

  // Empresas vinculadas do usuário (agora cada uma tem seu próprio moduleAccess)
  const empresasVinculadas = user?.empresasVinculadas || [];

  // Filtra apenas empresas onde o usuário tem acesso a pelo menos um módulo
  const empresasDisponiveis = useMemo(() => {
    if (empresasVinculadas.length === 0) {
      // Fallback: se não há vínculo explícito, usa empresa atual
      if (empresaAtual) {
        return [{ id: empresaAtual.id, tipo: 'principal' as const, nome: empresaAtual.nome, moduleAccess: [] }];
      }
      return [];
    }

    return filtrarEmpresasComAcesso(empresasVinculadas);
  }, [empresasVinculadas, empresaAtual]);

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

  // Contar módulos habilitados de uma empresa
  const countModulos = (empresa: EmpresaVinculada): number => {
    if (!empresa.moduleAccess) return 0;
    return empresa.moduleAccess.filter(m => 
      m.habilitado && m.subModulos?.some(s => s.habilitado)
    ).length;
  };

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
              Nenhuma empresa com módulos habilitados para seu usuário.
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {empresasDisponiveis.map((empresa) => {
                const modulosCount = countModulos(empresa);
                
                return (
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
                            {modulosCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {modulosCount} módulos
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected(empresa.id, empresa.tipo) && (
                        <Check className="h-4 w-4 text-biodina-gold" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmpresaUsuarioSwitcher;
