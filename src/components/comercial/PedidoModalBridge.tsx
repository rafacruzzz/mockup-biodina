
import PedidoForm from "./PedidoForm";

interface PedidoModalBridgeProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pedido: any) => void;
  oportunidade: any;
}

const PedidoModalBridge = ({ isOpen, onClose, onSave, oportunidade }: PedidoModalBridgeProps) => {
  if (!isOpen) return null;

  return (
    <PedidoForm
      onClose={onClose}
      onSave={onSave}
      oportunidade={oportunidade}
    />
  );
};

export default PedidoModalBridge;
