import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Link, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface IntegracaoFinanceiroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotaFiscalMock {
  id: number;
  numeroNF: string;
  fornecedor: string;
  dataEmissao: string;
  valorTotal: number;
  status: 'pendente' | 'vinculada';
  itens: {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    categoria: string;
  }[];
}

// Mock de notas fiscais pendentes de vínculo
const notasFiscaisPendentes: NotaFiscalMock[] = [
  {
    id: 1,
    numeroNF: "NF-2024-089",
    fornecedor: "Dell do Brasil Ltda",
    dataEmissao: "2024-01-15",
    valorTotal: 7500.00,
    status: 'pendente',
    itens: [
      {
        descricao: "Notebook Dell Vostro 15-3520",
        quantidade: 3,
        valorUnitario: 2500.00,
        categoria: "Equipamentos de TI"
      }
    ]
  },
  {
    id: 2,
    numeroNF: "NF-2024-090",
    fornecedor: "HP Brasil Ltda",
    dataEmissao: "2024-01-16",
    valorTotal: 2400.00,
    status: 'pendente',
    itens: [
      {
        descricao: "Impressora HP LaserJet Pro M404",
        quantidade: 2,
        valorUnitario: 1200.00,
        categoria: "Equipamentos de TI"
      }
    ]
  }
];

export const IntegracaoFinanceiroModal = ({ isOpen, onClose }: IntegracaoFinanceiroModalProps) => {
  const [notaSelecionada, setNotaSelecionada] = useState<NotaFiscalMock | null>(null);
  const [ativosParaCadastro, setAtivosParaCadastro] = useState<any[]>([]);

  const handleSelecionarNota = (notaId: string) => {
    const nota = notasFiscaisPendentes.find(n => n.id.toString() === notaId);
    if (nota) {
      setNotaSelecionada(nota);
      // Pre-cadastro automático baseado nos itens da NF
      const ativos = nota.itens.map((item, index) => ({
        id: `temp-${index}`,
        equipamento: item.descricao,
        tipo: item.descricao.toLowerCase().includes('notebook') ? 'notebook' : 
              item.descricao.toLowerCase().includes('impressora') ? 'impressora' : 'outro',
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
        numeroNF: nota.numeroNF,
        fornecedor: nota.fornecedor,
        dataAquisicao: nota.dataEmissao,
        status: 'aguardando_aprovacao'
      }));
      setAtivosParaCadastro(ativos);
    }
  };

  const handleGerarInventario = () => {
    // Simulação do processo de aprovação e geração
    toast.success("Ativos pré-cadastrados! Aguardando aprovação do Financeiro.");
    onClose();
    
    // Reset
    setNotaSelecionada(null);
    setAtivosParaCadastro([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Integração com Financeiro
          </DialogTitle>
          <DialogDescription>
            Vincule Notas Fiscais de material de TI ao Inventário para rastreabilidade completa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Fluxo de Integração */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Fluxo de Integração Financeiro → TI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="font-medium">NF Lançada no Financeiro</p>
                  <p className="text-gray-600">Suprimentos marca "Vincular ao Inventário TI"</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="font-medium">Pré-cadastro Automático</p>
                  <p className="text-gray-600">Sistema gera pré-cadastro dos ativos</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="font-medium">Aprovação Financeiro</p>
                  <p className="text-gray-600">Financeiro aprova o vínculo</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <p className="font-medium">Disponível no TI</p>
                  <p className="text-gray-600">Ativo integra base do Inventário TI</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Nota Fiscal */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Fiscais Pendentes de Vínculo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Selecionar Nota Fiscal</Label>
                <Select onValueChange={handleSelecionarNota}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma NF para vincular ao inventário" />
                  </SelectTrigger>
                  <SelectContent>
                    {notasFiscaisPendentes.map((nota) => (
                      <SelectItem key={nota.id} value={nota.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{nota.numeroNF} - {nota.fornecedor}</span>
                          <span className="ml-4 text-sm text-gray-500">
                            R$ {nota.valorTotal.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Lista de NFs Pendentes */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Todas as NFs Pendentes:</h4>
                {notasFiscaisPendentes.map((nota) => (
                  <Card key={nota.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{nota.numeroNF}</span>
                            <Badge variant="outline" className="text-xs">
                              {nota.status === 'pendente' ? 'Pendente' : 'Vinculada'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{nota.fornecedor}</p>
                          <p className="text-xs text-gray-500">Emissão: {nota.dataEmissao}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {nota.valorTotal.toLocaleString('pt-BR')}</p>
                          <p className="text-xs text-gray-500">{nota.itens.length} item(s)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detalhes da Nota Selecionada */}
          {notaSelecionada && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Nota Fiscal: {notaSelecionada.numeroNF}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Fornecedor</p>
                    <p>{notaSelecionada.fornecedor}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Data Emissão</p>
                    <p>{notaSelecionada.dataEmissao}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Valor Total</p>
                    <p>R$ {notaSelecionada.valorTotal.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Status</p>
                    <Badge variant="outline">
                      {notaSelecionada.status === 'pendente' ? 'Pendente' : 'Vinculada'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Itens da Nota Fiscal</h4>
                  <div className="space-y-2">
                    {notaSelecionada.itens.map((item, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.descricao}</p>
                              <p className="text-sm text-gray-600">
                                Qtd: {item.quantidade} | Valor Unit.: R$ {item.valorUnitario.toLocaleString('pt-BR')}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {item.categoria}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pré-cadastro dos Ativos */}
          {ativosParaCadastro.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Pré-cadastro de Ativos Gerado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Os ativos abaixo foram automaticamente pré-cadastrados baseados nos itens da NF.
                    Após aprovação do Financeiro, estarão disponíveis para controle da equipe de TI.
                  </p>
                </div>

                <div className="space-y-2">
                  {ativosParaCadastro.map((ativo, index) => (
                    <Card key={index} className="border-green-200 bg-green-50">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{ativo.equipamento}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Tipo: {ativo.tipo}</span>
                              <span>Qtd: {ativo.quantidade}</span>
                              <span>Valor: R$ {ativo.valorUnitario.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Aguardando Aprovação
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-700">NF Vinculada:</p>
                    <p>{notaSelecionada.numeroNF}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Fornecedor:</p>
                    <p>{notaSelecionada.fornecedor}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Data Aquisição:</p>
                    <p>{notaSelecionada.dataEmissao}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Centro de Custo:</p>
                    <p>TI (Padrão)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            
            {ativosParaCadastro.length > 0 && (
              <Button onClick={handleGerarInventario} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Gerar Pré-cadastro no Inventário
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};