
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, X, CheckCircle, FileText, User, Package, RotateCcw, Link } from "lucide-react";
import DadosGeraisTab from "./components/DadosGeraisTab";
import ProdutoEmprestadoTab from "./components/ProdutoEmprestadoTab";
import DANFEUploadTab from "./components/DANFEUploadTab";
import RetornoTab from "./components/RetornoTab";
import VinculacaoTab from "./components/VinculacaoTab";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DANFEData {
  id: string;
  numeroDanfe: string;
  cnpjCliente: string;
  nomeCliente: string;
  valorTotal: string;
  dataEmissao: Date;
  dataUpload: Date;
  tipoDanfe: 'entrada' | 'saida';
  produtos: Array<{
    referencia: string;
    descricao: string;
    valor: string;
  }>;
}

const NovoEmprestimoModal = ({ isOpen, onClose }: NovoEmprestimoModalProps) => {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [extractedDANFE, setExtractedDANFE] = useState<DANFEData | null>(null);
  const [historicoDANFEs, setHistoricoDANFEs] = useState<DANFEData[]>([]);
  
  const [formData, setFormData] = useState({
    numeroProcesso: `EMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    cnpjCliente: "",
    nomeCliente: "",
    observacoes: "",
    numeroDanfeEmprestimo: "",
    referenciaProdutoEmprestado: "",
    descricaoProdutoEmprestado: "",
    valorEmprestimo: "",
    moeda: "BRL" as "BRL" | "USD",
    dataEmprestimo: null as Date | null,
    dataSaida: null as Date | null,
    numeroDanfeRetorno: "",
    referenciaProdutoRecebido: "",
    descricaoProdutoRecebido: "",
    dataRetorno: null as Date | null,
    dataBaixa: null as Date | null,
    valorRetornado: "",
    idImportacaoDireta: ""
  });

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDANFEDataExtracted = (data: DANFEData) => {
    setExtractedDANFE(data);
    
    // Auto-fill form data
    setFormData(prev => ({
      ...prev,
      numeroDanfeEmprestimo: data.numeroDanfe,
      cnpjCliente: data.cnpjCliente,
      nomeCliente: data.nomeCliente,
      valorEmprestimo: data.valorTotal,
      dataEmprestimo: data.dataEmissao,
      referenciaProdutoEmprestado: data.produtos[0]?.referencia || "",
      descricaoProdutoEmprestado: data.produtos[0]?.descricao || ""
    }));
  };

  const handleHistoricoUpdate = (novoHistorico: DANFEData[]) => {
    setHistoricoDANFEs(novoHistorico);
  };

  const handleSave = () => {
    console.log("Salvando empréstimo:", formData);
    console.log("Histórico de DANFEs:", historicoDANFEs);
    if (extractedDANFE) {
      console.log("Com dados da DANFE:", extractedDANFE);
    }
    onClose();
  };

  // Tab completion validation
  const getTabStatus = (tabId: string) => {
    switch (tabId) {
      case "dados-gerais":
        return formData.cnpjCliente && formData.nomeCliente && formData.dataEmprestimo ? "complete" : "incomplete";
      case "produto":
        return formData.numeroDanfeEmprestimo && formData.referenciaProdutoEmprestado && formData.valorEmprestimo ? "complete" : "incomplete";
      case "danfe":
        return extractedDANFE ? "complete" : "optional";
      case "retorno":
        return "optional";
      case "vinculacao":
        return "optional";
      default:
        return "incomplete";
    }
  };

  const TabTriggerWithStatus = ({ 
    value, 
    icon: Icon, 
    children 
  }: { 
    value: string; 
    icon: any; 
    children: React.ReactNode;
  }) => {
    const status = getTabStatus(value);
    return (
      <TabsTrigger value={value} className="relative flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {children}
        {status === "complete" && (
          <Badge className="ml-2 h-5 w-5 p-0 bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
          </Badge>
        )}
        {status === "optional" && value !== "danfe" && value !== "retorno" && (
          <Badge variant="outline" className="ml-2 text-xs">
            Opcional
          </Badge>
        )}
        {status === "complete" && value === "danfe" && (
          <Badge className="ml-2 h-5 w-5 p-0 bg-blue-100 text-blue-700">
            <FileText className="h-3 w-3" />
          </Badge>
        )}
      </TabsTrigger>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue">
            Novo Empréstimo
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabTriggerWithStatus value="dados-gerais" icon={User}>
              Dados Gerais
            </TabTriggerWithStatus>
            <TabTriggerWithStatus value="produto" icon={Package}>
              Produto
            </TabTriggerWithStatus>
            <TabTriggerWithStatus value="danfe" icon={FileText}>
              DANFE
            </TabTriggerWithStatus>
            <TabTriggerWithStatus value="retorno" icon={RotateCcw}>
              Retorno
            </TabTriggerWithStatus>
            <TabTriggerWithStatus value="vinculacao" icon={Link}>
              Vinculação
            </TabTriggerWithStatus>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dados-gerais" className="space-y-4">
              <DadosGeraisTab 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </TabsContent>

            <TabsContent value="produto" className="space-y-4">
              <ProdutoEmprestadoTab 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </TabsContent>

            <TabsContent value="danfe" className="space-y-4">
              <DANFEUploadTab 
                onDataExtracted={handleDANFEDataExtracted}
                extractedData={extractedDANFE}
                historicoDANFEs={historicoDANFEs}
                onHistoricoUpdate={handleHistoricoUpdate}
              />
            </TabsContent>

            <TabsContent value="retorno" className="space-y-4">
              <RetornoTab 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </TabsContent>

            <TabsContent value="vinculacao" className="space-y-4">
              <VinculacaoTab 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Empréstimo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;
