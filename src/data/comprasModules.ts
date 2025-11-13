
import { ShoppingCart, FileText, Ship, CreditCard, TrendingUp, Calculator } from "lucide-react";
import { ComprasModulesConfig } from "@/types/compras";

export const comprasModules: ComprasModulesConfig = {
  pedidos: {
    name: "Mercadoria para Revenda",
    icon: ShoppingCart,
    subModules: {
      pedidos: {
        name: "Mercadoria para Revenda",
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
  di: {
    name: "Importação/DI",
    icon: Ship,
    subModules: {
      di: {
        name: "Declaração de Importação",
        data: []
      },
      pagamentos_importacao: {
        name: "Pagamentos de Importação",
        data: [],
        subSections: [
          {
            key: "programacao_pagamentos",
            name: "Programação de Pagamentos",
            icon: CreditCard,
            description: "Gerencie pagamentos internacionais programados",
            data: []
          },
          {
            key: "comprovantes",
            name: "Comprovantes",
            icon: FileText,
            description: "Upload e gestão de comprovantes SWIFT e bancários",
            data: []
          }
        ]
      },
      fechamento_cambio: {
        name: "Fechamento de Câmbio",
        data: [],
        subSections: [
          {
            key: "operacoes_cambio",
            name: "Operações de Câmbio",
            icon: TrendingUp,
            description: "Registre fechamentos de câmbio por mesa",
            data: []
          },
          {
            key: "contratos_cambio",
            name: "Contratos de Câmbio",
            icon: FileText,
            description: "Gestão de contratos e documentos",
            data: []
          }
        ]
      },
      custos_importacao: {
        name: "Custos de Importação",
        data: [],
        subSections: [
          {
            key: "custos_detalhados",
            name: "Custos Detalhados",
            icon: Calculator,
            description: "Cadastro e acompanhamento de todos os custos",
            data: []
          },
          {
            key: "relatorio_custos",
            name: "Relatório de Custos",
            icon: FileText,
            description: "Comparação previsão vs realizado por processo",
            data: []
          }
        ]
      }
    }
  }
};
