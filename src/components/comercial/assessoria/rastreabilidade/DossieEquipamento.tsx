import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Equipamento } from "@/types/rastreabilidade";
import { getHistoricoEquipamento, getTipoIntervencaoLabel, getStatusEquipamentoColor } from "@/data/rastreabilidade";
import { ordensServicoMock } from "@/data/assessoria-cientifica";
import { OrdemServico } from "@/types/assessoria-cientifica";
import { DetalhesOSSheet } from "../DetalhesOSSheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DossieEquipamentoProps {
  equipamento: Equipamento;
  onVoltar: () => void;
}

export function DossieEquipamento({ equipamento, onVoltar }: DossieEquipamentoProps) {
  const [osSheet, setOsSheet] = useState<OrdemServico | null>(null);
  const historico = getHistoricoEquipamento(equipamento.id);
  const statusColor = getStatusEquipamentoColor(equipamento.status);

  const handleIntervencaoClick = (osNumero: string) => {
    const os = ordensServicoMock.find(o => o.numero === osNumero);
    if (os) {
      setOsSheet(os);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para busca
        </Button>
        <Badge
          style={{
            backgroundColor: statusColor.bg,
            borderColor: statusColor.border,
            color: statusColor.text,
          }}
          className="border"
        >
          {equipamento.status === "ativo" ? "Ativo" : equipamento.status === "inativo" ? "Inativo" : "Em Manutenção"}
        </Badge>
      </div>

      {/* Informações Principais */}
      <div className="border rounded-lg p-6 bg-card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{equipamento.modelo}</h2>
            <p className="text-xl text-muted-foreground">{equipamento.numeroSerie}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Marca</p>
            <p className="text-lg font-semibold">{equipamento.marca}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              Cliente
            </div>
            <p className="font-semibold">{equipamento.cliente}</p>
            <p className="text-sm text-muted-foreground">{equipamento.localizacao}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Activity className="h-4 w-4" />
              Setor
            </div>
            <p className="font-semibold">{equipamento.setor}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              Instalação
            </div>
            <p className="font-semibold">
              {format(equipamento.dataInstalacao, "dd/MM/yyyy", { locale: ptBR })}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Info className="h-4 w-4" />
              Última Manutenção
            </div>
            <p className="font-semibold">
              {equipamento.ultimaManutencao 
                ? format(equipamento.ultimaManutencao, "dd/MM/yyyy", { locale: ptBR })
                : "N/A"}
            </p>
          </div>
        </div>

        {equipamento.versaoSoftware && (
          <>
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Versão do Software</p>
                <p className="font-semibold">{equipamento.versaoSoftware}</p>
              </div>
              {equipamento.versaoWindows && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sistema Operacional</p>
                  <p className="font-semibold">{equipamento.versaoWindows}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tabs de Detalhes */}
      <Tabs defaultValue="historico" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="historico">Histórico de Intervenções</TabsTrigger>
          <TabsTrigger value="detalhes">Detalhes Técnicos</TabsTrigger>
        </TabsList>

        <TabsContent value="historico" className="space-y-4">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>OS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historico.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhuma intervenção registrada
                    </TableCell>
                  </TableRow>
                ) : (
                  historico.map((hist) => (
                    <TableRow 
                      key={hist.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => handleIntervencaoClick(hist.osNumero)}
                    >
                      <TableCell>
                        {format(hist.data, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTipoIntervencaoLabel(hist.tipo)}
                        </Badge>
                      </TableCell>
                      <TableCell>{hist.departamento}</TableCell>
                      <TableCell>{hist.responsavel}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {hist.descricao}
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto font-mono">
                          {hist.osNumero}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="detalhes" className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Informações Técnicas</h3>
            <div className="space-y-4">
              {equipamento.observacoes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Observações</p>
                  <p className="text-sm">{equipamento.observacoes}</p>
                </div>
              )}
              {equipamento.proximaManutencao && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Próxima Manutenção Programada</p>
                  <p className="text-sm">
                    {format(equipamento.proximaManutencao, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total de Intervenções</p>
                <p className="text-sm">{historico.length} intervenção(ões) registrada(s)</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sheet de Detalhes da OS */}
      {osSheet && (
        <DetalhesOSSheet
          os={osSheet}
          isOpen={!!osSheet}
          onClose={() => setOsSheet(null)}
        />
      )}
    </div>
  );
}
