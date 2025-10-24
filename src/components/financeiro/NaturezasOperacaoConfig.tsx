import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, MoreVertical } from "lucide-react";
import { naturezasOperacao } from "@/data/naturezasOperacao";
import NaturezaOperacaoDialog from "./NaturezaOperacaoDialog";

const NaturezasOperacaoConfig = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ativas");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtrar naturezas com base na pesquisa
  const filteredNaturezas = naturezasOperacao.filter(nat => 
    nat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nat.operacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl text-primary">Natureza de operação</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Tributação</p>
            </div>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nova Natureza de Operação
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Barra de pesquisa e filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "ativas" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("ativas")}
              >
                ativas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <span className="text-muted-foreground">⊖</span> limpar filtros
              </Button>
            </div>
          </div>

          {/* Tabela de Naturezas de Operação */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Padrão</TableHead>
                  <TableHead className="text-center">Série</TableHead>
                  <TableHead className="text-center">Consumidor final</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNaturezas.map((natureza) => (
                  <TableRow key={natureza.operacao} className="hover:bg-muted/30">
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell className="font-medium">
                      {natureza.label}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8">
                        {natureza.operacao === "venda" ? (
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        ) : null}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">
                      {natureza.operacao === "venda" ? "Não" : "Não"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>

      <NaturezaOperacaoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default NaturezasOperacaoConfig;
