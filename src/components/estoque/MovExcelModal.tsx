
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Upload, FileSpreadsheet, Search } from "lucide-react";

interface MovExcelModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MovExcelModal = ({ isOpen, onOpenChange }: MovExcelModalProps) => {
  const [filters, setFilters] = useState({
    cnpj: "",
    deposito: "",
    produto: "",
    lote: "",
    dataInicial: "",
    dataFinal: "",
    tipoMovimentacao: "",
    status: ""
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleExportExcel = () => {
    console.log('Exportando Excel com filtros:', filters);
    // Simular download do Excel
  };

  const handleImportExcel = () => {
    if (uploadedFile) {
      console.log('Importando Excel:', uploadedFile.name);
      // Simular processamento do arquivo
    }
  };

  const handleClearFilters = () => {
    setFilters({
      cnpj: "",
      deposito: "",
      produto: "",
      lote: "",
      dataInicial: "",
      dataFinal: "",
      tipoMovimentacao: "",
      status: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue">
            Movimentação por Excel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filtros para Exportação */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5 text-biodina-gold" />
                Filtros para Exportação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Select value={filters.cnpj} onValueChange={(value) => handleFilterChange('cnpj', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o CNPJ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webmed-rj">WebMED RJ</SelectItem>
                      <SelectItem value="webmed-jf">WebMED JF</SelectItem>
                      <SelectItem value="distrib-sp">Distrib. SP</SelectItem>
                      <SelectItem value="webmed-matriz">WebMED Matriz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposito">Depósito</Label>
                  <Select value={filters.deposito} onValueChange={(value) => handleFilterChange('deposito', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o depósito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prateleira-a1">Prateleira A1</SelectItem>
                      <SelectItem value="prateleira-a2">Prateleira A2</SelectItem>
                      <SelectItem value="camara-fria-1">Câmara Fria 1</SelectItem>
                      <SelectItem value="refrigerado-a1">Refrigerado A1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="produto">Produto</Label>
                  <div className="relative">
                    <Input
                      id="produto"
                      placeholder="Digite o código ou descrição"
                      value={filters.produto}
                      onChange={(e) => handleFilterChange('produto', e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lote">Lote</Label>
                  <Input
                    id="lote"
                    placeholder="Digite o lote"
                    value={filters.lote}
                    onChange={(e) => handleFilterChange('lote', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataInicial">Data Inicial</Label>
                  <Input
                    id="dataInicial"
                    type="date"
                    value={filters.dataInicial}
                    onChange={(e) => handleFilterChange('dataInicial', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataFinal">Data Final</Label>
                  <Input
                    id="dataFinal"
                    type="date"
                    value={filters.dataFinal}
                    onChange={(e) => handleFilterChange('dataFinal', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoMovimentacao">Tipo de Movimentação</Label>
                  <Select value={filters.tipoMovimentacao} onValueChange={(value) => handleFilterChange('tipoMovimentacao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="ajuste">Ajuste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleExportExcel}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Excel
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Importação de Excel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5 text-biodina-gold" />
                Importar Movimentações via Excel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Arquivo Excel</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Baixar Modelo
                  </Button>
                </div>
              </div>

              {uploadedFile && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Arquivo selecionado:</strong> {uploadedFile.name}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleImportExcel}
                  disabled={!uploadedFile}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Processar Arquivo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instruções */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-blue-800 mb-2">Instruções:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use os filtros para exportar apenas as movimentações desejadas</li>
                <li>• O arquivo exportado pode ser editado e reimportado para criar novas movimentações</li>
                <li>• Para importar, baixe o modelo Excel e preencha com os dados das movimentações</li>
                <li>• Certifique-se de que todos os campos obrigatórios estão preenchidos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovExcelModal;
