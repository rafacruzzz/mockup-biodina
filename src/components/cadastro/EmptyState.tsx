
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

interface EmptyStateProps {
  onGetStarted: () => void;
}

const EmptyState = ({ onGetStarted }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-imuv-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="h-12 w-12 text-imuv-gold" />
        </div>
        <h2 className="text-2xl font-bold text-imuv-blue mb-3">Selecione um módulo</h2>
        <p className="text-gray-600 mb-6">Escolha um módulo no menu lateral para começar a gerenciar seus cadastros</p>
        <Button 
          onClick={onGetStarted}
          className="bg-imuv-gold hover:bg-imuv-gold/90 text-white"
        >
          Começar com Produtos
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
