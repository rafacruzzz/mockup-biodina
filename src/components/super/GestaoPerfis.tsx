import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search } from "lucide-react";
import { PerfilAcesso } from "@/types/super";
import { modulosDisponiveis } from "@/data/superModules";

interface GestaoPerfisProps {
  perfis: PerfilAcesso[];
  onNovoPerfil: () => void;
  onEditarPerfil: (perfil: PerfilAcesso) => void;
  onExcluirPerfil: (perfilId: string) => void;
}

export const GestaoPerfis = ({
  perfis,
  onNovoPerfil,
  onEditarPerfil,
  onExcluirPerfil,
}: GestaoPerfisProps) => {
  const [busca, setBusca] = useState("");

  const perfisFiltrados = perfis.filter((perfil) =>
    perfil.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const getModuloNome = (moduloId: string) => {
    return modulosDisponiveis.find((m) => m.id === moduloId)?.nome || moduloId;
  };

  return (
    <div className="space-y-6">
      {/* Busca */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar perfis..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Grid de Perfis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {perfisFiltrados.map((perfil) => (
          <Card key={perfil.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{perfil.nome}</CardTitle>
                  <CardDescription className="mt-1">
                    Criado em {new Date(perfil.dataCriacao).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditarPerfil(perfil)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExcluirPerfil(perfil.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Módulos habilitados:</span>
                  <Badge variant="secondary">
                    {perfil.modulosHabilitados.length}/{modulosDisponiveis.length}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {perfil.modulosHabilitados.slice(0, 6).map((moduloId) => (
                    <Badge key={moduloId} variant="outline" className="text-xs">
                      {getModuloNome(moduloId)}
                    </Badge>
                  ))}
                  {perfil.modulosHabilitados.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{perfil.modulosHabilitados.length - 6}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {perfisFiltrados.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              {busca ? "Nenhum perfil encontrado" : "Nenhum perfil cadastrado"}
            </p>
            {!busca && (
              <Button onClick={onNovoPerfil}>Criar Primeiro Perfil</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
