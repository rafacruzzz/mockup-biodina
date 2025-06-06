
import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComercialTabs from "@/components/comercial/components/ComercialTabs";

const ComercialVendas = () => {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [formData, setFormData] = useState({
    // Informações Básicas do Cliente
    cpfCnpj: "",
    nome: "",
    razaoSocial: "",
    endereco: "",
    uf: "",
    fonteLead: "",
    ativo: true,
    email: "",
    telefone: "",
    website: "",
    
    // Informações do Negócio
    valorNegocio: "",
    metodoContato: "",
    segmentoLead: "",
    dataInicio: "",
    dataLimite: "",
    dataVisita: "",
    procurandoPor: "",
    descricao: "",
    
    // Campos Específicos de Importação
    spi: "",
    di: "",
    invoice: "",
    comissao: "",
    numeroProjeto: "",
    numeroPedido: "",
    numeroContrato: "",
    publicoPrivado: "",
    naturezaOperacao: "",
    tipoContrato: "",
    situacao: "",
    previsaoFechamento: "",
    gerarExpedicao: false,
    nfConsumoFinal: false,
    localEstoque: "",
    
    // Dados Financeiros
    emailNotasFiscais: "",
    formaPagamento: "",
    dadosBancarios: "",
    parcelas: "",
    prazoPagamento: "",
    documentacaoNF: "",
    destacarIR: false,
    saldoEmpenho: "",
    saldoAta: "",
    programacaoFaturamento: "",
    
    // Informações de Frete
    fretePagar: "",
    freteRetirar: "",
    prazoEntrega: "",
    entregarRetirar: "",
    dadosRecebedor: "",
    horariosPermitidos: "",
    locaisEntrega: "",
    informacoesEntrega: "",
    
    // Campos Adicionais
    urgente: false,
    justificativaUrgencia: "",
    autorizadoPor: "",
    dataAutorizacao: "",
    termometro: "Importação Direta",
    motivoGanho: "",
    
    // Análise Técnica
    analiseTecnica: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SidebarLayout>
      <div className="p-6">
        <ComercialTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          formData={formData}
          onInputChange={handleInputChange}
        />
      </div>
    </SidebarLayout>
  );
};

export default ComercialVendas;
