import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Eye, Paperclip, CheckCircle } from "lucide-react";
import { Treinamento } from "@/types/rt";
import { NovoTreinamentoModal } from "./NovoTreinamentoModal";
import { toast } from "@/components/ui/use-toast";

interface TreinamentosSectionProps {
  treinamentosRealizados: Treinamento[];
  treinamentosFuturos: Treinamento[];
  onTreinamentosChange: (realizados: Treinamento[], futuros: Treinamento[]) => void;
}

export const TreinamentosSection = ({
  treinamentosRealizados,
  treinamentosFuturos,
  onTreinamentosChange
}: TreinamentosSectionProps) => {
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [tipoModal, setTipoModal] = useState<'realizado' | 'futuro'>('realizado');

  const handleNovoTreinamento = (treinamento: Treinamento) => {
    if (treinamento.tipo === 'realizado') {
      onTreinamentosChange([treinamento, ...treinamentosRealizados], treinamentosFuturos);
    } else {
      onTreinamentosChange(treinamentosRealizados, [treinamento, ...treinamentosFuturos]);
    }
  };

  const marcarComoRealizado = (treinamentoId: string) => {
    const treinamento = treinamentosFuturos.find(t => t.id === treinamentoId);
    if (!treinamento) return;

    const treinamentoRealizado: Treinamento = {
      ...treinamento,
      tipo: 'realizado',
      status: 'Realizado'
    };

    const novosFuturos = treinamentosFuturos.filter(t => t.id !== treinamentoId);
    onTreinamentosChange([treinamentoRealizado, ...treinamentosRealizados], novosFuturos);

    toast({
      title: "Treinamento Concluído",
      description: `${treinamento.conteudo} foi marcado como realizado`
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Realizado":
        return <Badge variant="default">Realizado</Badge>;
      case "Agendado":
        return <Badge variant="secondary">Agendado</Badge>;
      case "Confirmado":
        return <Badge variant="default">Confirmado</Badge>;
      case "Cancelado":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Treinamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="realizados" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="realizados">Treinamentos Realizados</TabsTrigger>
              <TabsTrigger value="futuros">Treinamentos Futuros</TabsTrigger>
            </TabsList>

            {/* Treinamentos Realizados */}
            <TabsContent value="realizados" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setTipoModal('realizado');
                    setShowNovoModal(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Novo Treinamento Realizado
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[110px]">Data</TableHead>
                      <TableHead>Conteúdo/Tema</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Ministrante</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead className="text-center">Anexos</TableHead>
                      <TableHead className="text-center w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treinamentosRealizados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum treinamento realizado registrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      treinamentosRealizados.map((treinamento) => (
                        <TableRow key={treinamento.id}>
                          <TableCell>{treinamento.data}</TableCell>
                          <TableCell className="font-medium">{treinamento.conteudo}</TableCell>
                          <TableCell>{treinamento.local}</TableCell>
                          <TableCell>{treinamento.ministrante}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">
                                {treinamento.participantes.slice(0, 2).join(", ")}
                              </div>
                              {treinamento.participantes.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{treinamento.participantes.length - 2} mais
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {treinamento.anexos.length > 0 ? (
                              <Badge variant="outline" className="gap-1">
                                <Paperclip className="h-3 w-3" />
                                {treinamento.anexos.length}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="text-sm text-muted-foreground">
                {treinamentosRealizados.length} treinamento(s) realizado(s)
              </div>
            </TabsContent>

            {/* Treinamentos Futuros */}
            <TabsContent value="futuros" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setTipoModal('futuro');
                    setShowNovoModal(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Agendar Treinamento
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[110px]">Data Prevista</TableHead>
                      <TableHead>Conteúdo/Tema</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Ministrante</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center w-[150px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treinamentosFuturos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum treinamento agendado
                        </TableCell>
                      </TableRow>
                    ) : (
                      treinamentosFuturos.map((treinamento) => (
                        <TableRow key={treinamento.id}>
                          <TableCell>{treinamento.data}</TableCell>
                          <TableCell className="font-medium">{treinamento.conteudo}</TableCell>
                          <TableCell>{treinamento.local}</TableCell>
                          <TableCell>{treinamento.ministrante}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">
                                {treinamento.participantes.slice(0, 2).join(", ")}
                              </div>
                              {treinamento.participantes.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{treinamento.participantes.length - 2} mais
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(treinamento.status)}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex gap-1 justify-center">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => marcarComoRealizado(treinamento.id)}
                                title="Marcar como realizado"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="text-sm text-muted-foreground">
                {treinamentosFuturos.length} treinamento(s) agendado(s)
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NovoTreinamentoModal
        open={showNovoModal}
        onOpenChange={setShowNovoModal}
        onSave={handleNovoTreinamento}
        tipo={tipoModal}
      />
    </>
  );
};
