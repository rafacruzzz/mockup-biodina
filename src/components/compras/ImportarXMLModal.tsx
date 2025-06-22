
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface ImportarXMLModalProps {
  onClose: () => void;
  onImport: (dadosXML: any) => void;
}

const ImportarXMLModal = ({ onClose, onImport }: ImportarXMLModalProps) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/xml") {
      setArquivo(file);
    } else {
      alert("Por favor, selecione um arquivo XML válido");
    }
  };

  const handleImport = async () => {
    if (!arquivo) return;

    setCarregando(true);

    // Simular processamento do XML com dados focados em lote e série
    setTimeout(() => {
      const dadosSimulados = {
        notaFiscal: {
          numero: "000123456",
          fornecedor: "Laboratório Farmacêutico ABC Ltda",
          dataEmissao: "2024-01-15",
          valorTotal: 15750.00,
          cfop: "5102",
          cnpjFornecedor: "12.345.678/0001-90"
        },
        produtos: [
          {
            id: 1,
            codigo: "MED001",
            codigoFornecedor: "LAB-PAR-500",
            descricao: "Paracetamol 500mg - Caixa com 20 comprimidos",
            lote: "LOT2024001",
            numeroSerie: "",
            dataValidade: "2025-12-31",
            dataFabricacao: "2024-01-10",
            quantidade: 50,
            valorUnitario: 12.50,
            valorTotal: 625.00,
            ncm: "30049099",
            codigoBarras: "7891234567890",
            controladoPorLote: true,
            requerNumeroSerie: false,
            tipoProduto: "Medicamento",
            aliquotas: {
              icms: 18.0,
              ipi: 0.0,
              pis: 1.65,
              cofins: 7.6
            }
          },
          {
            id: 2,
            codigo: "EQP001",
            codigoFornecedor: "TER-DIG-001",
            descricao: "Termômetro Digital Clínico",
            lote: "LOTE2024B15",
            numeroSerie: "TD240115001",
            dataValidade: "",
            dataFabricacao: "2024-01-15",
            quantidade: 25,
            valorUnitario: 45.00,
            valorTotal: 1125.00,
            ncm: "90251100",
            codigoBarras: "7891234567891",
            controladoPorLote: true,
            requerNumeroSerie: true,
            tipoProduto: "Equipamento",
            aliquotas: {
              icms: 18.0,
              ipi: 5.0,
              pis: 1.65,
              cofins: 7.6
            }
          },
          {
            id: 3,
            codigo: "MED002",
            codigoFornecedor: "LAB-IBU-400",
            descricao: "Ibuprofeno 400mg - Caixa com 30 comprimidos",
            lote: "LOT2024002",
            numeroSerie: "",
            dataValidade: "2026-06-30",
            dataFabricacao: "2024-01-05",
            quantidade: 100,
            valorUnitario: 18.75,
            valorTotal: 1875.00,
            ncm: "30049099",
            codigoBarras: "7891234567892",
            controladoPorLote: true,
            requerNumeroSerie: false,
            tipoProduto: "Medicamento",
            aliquotas: {
              icms: 18.0,
              ipi: 0.0,
              pis: 1.65,
              cofins: 7.6
            }
          }
        ]
      };

      onImport(dadosSimulados);
      setCarregando(false);
    }, 2000);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-biodina-blue flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar XML da Nota Fiscal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Selecione o arquivo XML da nota fiscal
              </p>
              <Input
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            {arquivo && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{arquivo.name}</span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Dados que serão importados:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Informações da nota fiscal</li>
                    <li>Produtos com <strong>lotes</strong> e <strong>números de série</strong></li>
                    <li>Datas de validade e fabricação</li>
                    <li>Alíquotas fiscais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!arquivo || carregando}
              className="flex-1 bg-biodina-blue hover:bg-biodina-blue/90"
            >
              {carregando ? "Processando..." : "Importar XML"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportarXMLModal;
