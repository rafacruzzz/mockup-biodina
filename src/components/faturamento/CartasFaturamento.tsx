import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { CartaFaturamento } from "@/types/faturamento";
import GerarCartaModal from "./modals/GerarCartaModal";
import VisualizarCartaModal from "./modals/VisualizarCartaModal";
import ConfigurarEnvioModal from "./modals/ConfigurarEnvioModal";

const CartasFaturamento = () => {
  const [cartas, setCartas] = useState<CartaFaturamento[]>([]);
  const [modalGerar, setModalGerar] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalConfigurar, setModalConfigurar] = useState(false);
  const [cartaSelecionada, setCartaSelecionada] = useState<CartaFaturamento | null>(null);

  const getStatusBadge = (status: CartaFaturamento['status']) => {
    const configs = {
      rascunho: { color: 'bg-gray-500', label: 'Rascunho', icon: Clock },
      pendente_assinatura: { color: 'bg-yellow-500', label: 'Aguardando Assinatura', icon: AlertCircle },
      assinado: { color: 'bg-green-500', label: 'Assinado', icon: CheckCircle },
      enviado_tesouraria: { color: 'bg-blue-500', label: 'Enviado Tesouraria', icon: CheckCircle },
    };
    
    const config = configs[status];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleNovaCartaGerada = (novaCarta: CartaFaturamento) => {
    setCartas([novaCarta, ...cartas]);
    setModalGerar(false);
  };

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Cartas de Faturamento
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie declarações mensais de faturamento com assinatura digital
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setModalConfigurar(true)} variant="outline">
                ⚙️ Configurar Envio Automático
              </Button>
              <Button onClick={() => setModalGerar(true)}>
                + Gerar Nova Carta
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {cartas.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhuma carta de faturamento gerada ainda</p>
              <Button onClick={() => setModalGerar(true)}>
                Gerar Primeira Carta
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competência</TableHead>
                  <TableHead>Data Geração</TableHead>
                  <TableHead>Faturamento Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Signatários</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartas.map((carta) => (
                  <TableRow key={carta.id}>
                    <TableCell className="font-medium">{carta.competencia}</TableCell>
                    <TableCell>{new Date(carta.dataGeracao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{formatCurrency(carta.totalPeriodo)}</TableCell>
                    <TableCell>{getStatusBadge(carta.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {carta.signatarios.filter(s => s.status === 'assinado').length} / {carta.signatarios.length}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setCartaSelecionada(carta);
                          setModalVisualizar(true);
                        }}
                      >
                        👁️ Visualizar
                      </Button>
                      {carta.arquivoPdfAssinado && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            // Download PDF
                            const link = document.createElement('a');
                            link.href = carta.arquivoPdfAssinado!;
                            link.download = `Carta_Faturamento_${carta.competencia.replace('/', '_')}.pdf`;
                            link.click();
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modais */}
      {modalGerar && (
        <GerarCartaModal 
          onClose={() => setModalGerar(false)} 
          onCartaGerada={handleNovaCartaGerada}
        />
      )}
      {modalVisualizar && cartaSelecionada && (
        <VisualizarCartaModal
          carta={cartaSelecionada}
          onClose={() => {
            setModalVisualizar(false);
            setCartaSelecionada(null);
          }}
        />
      )}
      {modalConfigurar && (
        <ConfigurarEnvioModal 
          onClose={() => setModalConfigurar(false)} 
        />
      )}
    </div>
  );
};

export default CartasFaturamento;
