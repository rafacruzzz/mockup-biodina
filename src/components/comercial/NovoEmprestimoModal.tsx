
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, X, CheckCircle, User, ShoppingCart, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import DadosGeraisTab from "./components/DadosGeraisTab";
import PedidosEmprestimoTab from "./components/PedidosEmprestimoTab";
import RetornoTab from "./components/RetornoTab";
import PedidoEmprestimoModal from "./PedidoEmprestimoModal";
import { PedidoEmprestimo } from "@/types/comercial";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoEmprestimoModal = ({ isOpen, onClose }: NovoEmprestimoModalProps) => {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  
  // Estados para gerenciar pedidos
  const [pedidosVinculados, setPedidosVinculados] = useState<PedidoEmprestimo[]>([]);
  const [modalPedidoAberto, setModalPedidoAberto] = useState(false);
  const [pedidoEmEdicao, setPedidoEmEdicao] = useState<PedidoEmprestimo | null>(null);
  
  const [formData, setFormData] = useState({
    numeroProcesso: `EMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    cnpjCliente: "",
    nomeCliente: "",
    observacoes: "",
    moeda: "BRL" as "BRL" | "USD",
    valorEmprestimo: 0,
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

  // Calcular valor total automaticamente
  useEffect(() => {
    const valorTotal = pedidosVinculados.reduce((total, pedido) => {
      return total + pedido.valorTotal;
    }, 0);
    setFormData(prev => ({ ...prev, valorEmprestimo: valorTotal }));
  }, [pedidosVinculados]);

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handlers para gerenciar pedidos
  const handleCriarNovoPedido = () => {
    setPedidoEmEdicao(null);
    setModalPedidoAberto(true);
  };

  const handleEditarPedido = (pedido: PedidoEmprestimo) => {
    setPedidoEmEdicao(pedido);
    setModalPedidoAberto(true);
  };

  const handleVisualizarPedido = (pedido: PedidoEmprestimo) => {
    setPedidoEmEdicao(pedido);
    setModalPedidoAberto(true);
  };

  const handleRemoverPedido = (pedidoId: number) => {
    if (confirm("Tem certeza que deseja remover este pedido do empréstimo?")) {
      setPedidosVinculados(prev => prev.filter(p => p.id !== pedidoId));
      toast.success("Pedido removido com sucesso");
    }
  };

  const handleSalvarPedido = (pedido: PedidoEmprestimo) => {
    if (pedidoEmEdicao) {
      // Atualizar pedido existente
      setPedidosVinculados(prev => 
        prev.map(p => p.id === pedido.id ? pedido : p)
      );
    } else {
      // Adicionar novo pedido
      setPedidosVinculados(prev => [...prev, pedido]);
    }
    setModalPedidoAberto(false);
    setPedidoEmEdicao(null);
  };

  const handleSave = () => {
    // Validações
    if (!formData.moeda) {
      toast.error("Selecione a moeda do empréstimo");
      setActiveTab("pedidos");
      return;
    }

    if (pedidosVinculados.length === 0) {
      toast.error("Adicione pelo menos um pedido ao empréstimo");
      setActiveTab("pedidos");
      return;
    }

    console.log("Salvando empréstimo:", formData);
    console.log("Pedidos vinculados:", pedidosVinculados);
    
    toast.success("Empréstimo salvo com sucesso!");
    onClose();
  };

  // Tab completion validation
  const getTabStatus = (tabId: string) => {
    switch (tabId) {
      case "dados-gerais":
        return formData.cnpjCliente && formData.nomeCliente && formData.dataEmprestimo ? "complete" : "incomplete";
      case "pedidos":
        return formData.moeda && pedidosVinculados.length > 0 ? "complete" : "incomplete";
      case "retorno":
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
        {status === "optional" && value !== "retorno" && (
          <Badge variant="outline" className="ml-2 text-xs">
            Opcional
          </Badge>
        )}
      </TabsTrigger>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-biodina-blue">
              Novo Empréstimo
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabTriggerWithStatus value="dados-gerais" icon={User}>
                Dados Gerais
              </TabTriggerWithStatus>
              <TabTriggerWithStatus value="pedidos" icon={ShoppingCart}>
                Pedidos
              </TabTriggerWithStatus>
              <TabTriggerWithStatus value="retorno" icon={RotateCcw}>
                Retorno
              </TabTriggerWithStatus>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="dados-gerais" className="space-y-4">
                <DadosGeraisTab 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </TabsContent>

              <TabsContent value="pedidos" className="space-y-4">
                <PedidosEmprestimoTab 
                  moeda={formData.moeda}
                  onMoedaChange={(moeda) => handleInputChange('moeda', moeda)}
                  valorTotal={formData.valorEmprestimo}
                  pedidos={pedidosVinculados}
                  onCriarNovoPedido={handleCriarNovoPedido}
                  onVisualizarPedido={handleVisualizarPedido}
                  onEditarPedido={handleEditarPedido}
                  onRemoverPedido={handleRemoverPedido}
                />
              </TabsContent>

              <TabsContent value="retorno" className="space-y-4">
                <RetornoTab 
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

      {/* Modal de Pedido */}
      <PedidoEmprestimoModal
        isOpen={modalPedidoAberto}
        onClose={() => {
          setModalPedidoAberto(false);
          setPedidoEmEdicao(null);
        }}
        onSave={handleSalvarPedido}
        pedidoInicial={pedidoEmEdicao}
        dadosEmprestimo={{
          numeroProcesso: formData.numeroProcesso,
          cliente: formData.nomeCliente,
          cnpj: formData.cnpjCliente,
          moeda: formData.moeda
        }}
      />
    </>
  );
};

export default NovoEmprestimoModal;
