import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Produto } from "@/types/produto";
import { Plus, FileText, Download, Edit } from "lucide-react";
import { format } from "date-fns";
import { ComparativoTecnicoModal } from "./ComparativoTecnicoModal";
import { JustificativaTecnicaModal } from "./JustificativaTecnicaModal";
import { TermoReferenciaModal } from "./TermoReferenciaModal";

interface SuporteVendasTabProps {
  produto: Produto;
}

interface Comparativo {
  id: string;
  titulo: string;
  criadoPor: string;
  data: Date;
  conteudo: any;
}

interface Justificativa {
  id: string;
  titulo: string;
  criadoPor: string;
  data: Date;
  conteudo: any;
}

interface TermoReferencia {
  id: string;
  titulo: string;
  modelo: string;
  criadoPor: string;
  data: Date;
  conteudo: any;
}

export function SuporteVendasTab({ produto }: SuporteVendasTabProps) {
  const [comparativos, setComparativos] = useState<Comparativo[]>([
    {
      id: "1",
      titulo: "ABL800 FLEX vs Concorrente X",
      criadoPor: "Dr. Carlos Mendes",
      data: new Date("2025-01-10"),
      conteudo: {},
    },
  ]);
  const [justificativas, setJustificativas] = useState<Justificativa[]>([]);
  const [termosReferencia, setTermosReferencia] = useState<TermoReferencia[]>([]);

  const [comparativoModalOpen, setComparativoModalOpen] = useState(false);
  const [justificativaModalOpen, setJustificativaModalOpen] = useState(false);
  const [termoModalOpen, setTermoModalOpen] = useState(false);

  const [comparativoEditando, setComparativoEditando] = useState<Comparativo | null>(null);
  const [justificativaEditando, setJustificativaEditando] = useState<Justificativa | null>(null);
  const [termoEditando, setTermoEditando] = useState<TermoReferencia | null>(null);

  const handleNovoComparativo = () => {
    setComparativoEditando(null);
    setComparativoModalOpen(true);
  };

  const handleEditarComparativo = (comp: Comparativo) => {
    setComparativoEditando(comp);
    setComparativoModalOpen(true);
  };

  const handleSalvarComparativo = (comparativo: Comparativo) => {
    if (comparativoEditando) {
      setComparativos(prev =>
        prev.map(c => (c.id === comparativo.id ? comparativo : c))
      );
    } else {
      setComparativos(prev => [...prev, comparativo]);
    }
  };

  const handleNovaJustificativa = () => {
    setJustificativaEditando(null);
    setJustificativaModalOpen(true);
  };

  const handleEditarJustificativa = (just: Justificativa) => {
    setJustificativaEditando(just);
    setJustificativaModalOpen(true);
  };

  const handleSalvarJustificativa = (justificativa: Justificativa) => {
    if (justificativaEditando) {
      setJustificativas(prev =>
        prev.map(j => (j.id === justificativa.id ? justificativa : j))
      );
    } else {
      setJustificativas(prev => [...prev, justificativa]);
    }
  };

  const handleNovoTermo = () => {
    setTermoEditando(null);
    setTermoModalOpen(true);
  };

  const handleEditarTermo = (termo: TermoReferencia) => {
    setTermoEditando(termo);
    setTermoModalOpen(true);
  };

  const handleSalvarTermo = (termo: TermoReferencia) => {
    if (termoEditando) {
      setTermosReferencia(prev =>
        prev.map(t => (t.id === termo.id ? termo : t))
      );
    } else {
      setTermosReferencia(prev => [...prev, termo]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comparativos Técnicos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Comparativos Técnicos
            </CardTitle>
            <Button onClick={handleNovoComparativo}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Comparativo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {comparativos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum comparativo criado</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparativos.map((comp) => (
                    <TableRow key={comp.id}>
                      <TableCell className="font-medium">{comp.titulo}</TableCell>
                      <TableCell>{comp.criadoPor}</TableCell>
                      <TableCell>{format(comp.data, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditarComparativo(comp)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Justificativas Técnicas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Justificativas Técnicas
            </CardTitle>
            <Button onClick={handleNovaJustificativa}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Justificativa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {justificativas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma justificativa criada</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {justificativas.map((just) => (
                    <TableRow key={just.id}>
                      <TableCell className="font-medium">{just.titulo}</TableCell>
                      <TableCell>{just.criadoPor}</TableCell>
                      <TableCell>{format(just.data, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditarJustificativa(just)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Termos de Referência */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Termos de Referência
            </CardTitle>
            <Button onClick={handleNovoTermo}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Termo de Referência
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {termosReferencia.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum termo de referência criado</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {termosReferencia.map((termo) => (
                    <TableRow key={termo.id}>
                      <TableCell className="font-medium">{termo.titulo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{termo.modelo}</Badge>
                      </TableCell>
                      <TableCell>{termo.criadoPor}</TableCell>
                      <TableCell>{format(termo.data, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditarTermo(termo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modais */}
      <ComparativoTecnicoModal
        open={comparativoModalOpen}
        onClose={() => {
          setComparativoModalOpen(false);
          setComparativoEditando(null);
        }}
        comparativo={comparativoEditando}
        onSalvar={handleSalvarComparativo}
        produto={produto}
      />

      <JustificativaTecnicaModal
        open={justificativaModalOpen}
        onClose={() => {
          setJustificativaModalOpen(false);
          setJustificativaEditando(null);
        }}
        justificativa={justificativaEditando}
        onSalvar={handleSalvarJustificativa}
        produto={produto}
      />

      <TermoReferenciaModal
        open={termoModalOpen}
        onClose={() => {
          setTermoModalOpen(false);
          setTermoEditando(null);
        }}
        termo={termoEditando}
        onSalvar={handleSalvarTermo}
        produto={produto}
      />
    </div>
  );
}
