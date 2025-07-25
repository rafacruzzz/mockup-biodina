
import { ShoppingCart, FileText, Ship } from "lucide-react";
import { ComprasModulesConfig } from "@/types/compras";

export const comprasModules: ComprasModulesConfig = {
  pedidos: {
    name: "Pedidos",
    icon: ShoppingCart,
    subModules: {
      pedidos: {
        name: "Pedidos",
        data: [
          {
            id: 1,
            numero_pedido: "PED-2024-001",
            hop: "HOP001",
            vendedor: "João Silva",
            cliente: "Hospital São Lucas",
            data_entrega: "2024-01-15",
            transportadora: "Transportadora ABC",
            regiao: "Sul",
            status: "Em Andamento",
            bairro: "Centro",
            cidade: "São Paulo",
            cep: "01234-567",
            peso_bruto: 25.5,
            peso_liquido: 23.2,
            itens: [
              {
                id: 1,
                codigo: "MED001",
                descricao: "Paracetamol 500mg",
                lote: "LOT2024001",
                data_validade: "2025-12-31",
                numero_serie: "SER001",
                deposito: "DEP001",
                localizacao: "A1-P2",
                quantidade: 100
              }
            ]
          },
          {
            id: 2,
            numero_pedido: "PED-2024-002",
            hop: "HOP002",
            vendedor: "Maria Santos",
            cliente: "Clínica Regional",
            data_entrega: "2024-01-20",
            transportadora: "Express Logística",
            regiao: "Norte",
            status: "Finalizado",
            bairro: "Zona Industrial",
            cidade: "Rio de Janeiro",
            cep: "21234-567",
            peso_bruto: 18.3,
            peso_liquido: 16.8
          }
        ]
      }
    }
  },
  compra_fiscal: {
    name: "Compra Fiscal",
    icon: FileText,
    subModules: {
      compra_fiscal: {
        name: "Compra Fiscal",
        data: []
      }
    }
  },
  di: {
    name: "DI",
    icon: Ship,
    subModules: {
      di: {
        name: "DI",
        data: []
      }
    }
  }
};
