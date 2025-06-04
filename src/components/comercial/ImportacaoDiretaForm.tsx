import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm: React.FC<ImportacaoDiretaFormProps> = ({ isOpen, onClose, onSave, oportunidade }) => {
  const [showOvcTable, setShowOvcTable] = useState(false);

  // Dados de exemplo para a tabela OVC
  const ovcData = [
    { item: "Item 1", codigo: "001", descricao: "Produto A", quantidade: 10, valorUnitario: 100.00, valorTotal: 1000.00 },
    { item: "Item 2", codigo: "002", descricao: "Produto B", quantidade: 5, valorUnitario: 200.00, valorTotal: 1000.00 },
    { item: "Item 3", codigo: "003", descricao: "Produto C", quantidade: 8, valorUnitario: 150.00, valorTotal: 1200.00 },
  ];

  const totalGeral = ovcData.reduce((sum, item) => sum + item.valorTotal, 0);

  const handleUploadPI = () => {
    setShowOvcTable(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importação Direta</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="comercial" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comercial">COMERCIAL</TabsTrigger>
            <TabsTrigger value="spi">SPI</TabsTrigger>
          </TabsList>

          <TabsContent value="comercial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="vendedor">Vendedor *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendedor1">Vendedor 1</SelectItem>
                    <SelectItem value="vendedor2">Vendedor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dataEntrega">Data de Entrega</Label>
                <Input type="date" id="dataEntrega" />
              </div>

              <div>
                <Label htmlFor="condicaoPagamento">Condição de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avista">À Vista</SelectItem>
                    <SelectItem value="30dias">30 dias</SelectItem>
                    <SelectItem value="60dias">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Digite as observações" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spi" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">SPI</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numeroSPI">Número SPI</Label>
                <Input id="numeroSPI" placeholder="Digite o número SPI" />
              </div>

              <div>
                <Label htmlFor="dataSPI">Data SPI</Label>
                <Input type="date" id="dataSPI" />
              </div>

              <div>
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
                    <SelectItem value="fornecedor2">Fornecedor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="valorSPI">Valor SPI</Label>
                <Input id="valorSPI" type="number" placeholder="0,00" />
              </div>

              <div>
                <Label htmlFor="moeda">Moeda</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="brl">BRL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="incoterm">Incoterm</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o incoterm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fob">FOB</SelectItem>
                    <SelectItem value="cif">CIF</SelectItem>
                    <SelectItem value="exw">EXW</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                <Input id="prazoEntrega" placeholder="Ex: 30 dias" />
              </div>

              <div>
                <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                <Input id="condicoesPagamento" placeholder="Ex: 50% antecipado" />
              </div>

              <div>
                <Label htmlFor="validadeProposta">Validade da Proposta</Label>
                <Input type="date" id="validadeProposta" />
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleUploadPI}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload PI
              </Button>
            </div>

            {showOvcTable && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Tabela OVC</h4>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="font-semibold">Item</TableHead>
                        <TableHead className="font-semibold">Código</TableHead>
                        <TableHead className="font-semibold">Descrição</TableHead>
                        <TableHead className="font-semibold text-right">Quantidade</TableHead>
                        <TableHead className="font-semibold text-right">Valor Unitário</TableHead>
                        <TableHead className="font-semibold text-right">Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ovcData.map((row, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>{row.item}</TableCell>
                          <TableCell>{row.codigo}</TableCell>
                          <TableCell>{row.descricao}</TableCell>
                          <TableCell className="text-right">{row.quantidade}</TableCell>
                          <TableCell className="text-right">
                            R$ {row.valorUnitario.toFixed(2).replace('.', ',')}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            R$ {row.valorTotal.toFixed(2).replace('.', ',')}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-blue-50 font-semibold">
                        <TableCell colSpan={5} className="text-right">Total Geral:</TableCell>
                        <TableCell className="text-right">
                          R$ {totalGeral.toFixed(2).replace('.', ',')}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
