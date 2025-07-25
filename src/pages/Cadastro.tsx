import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Module } from 'ag-grid-community';
import { AllModules } from 'ag-grid-enterprise';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-community';
import { MenuModule } from 'ag-grid-community';
import { ColumnsToolPanelModule } from 'ag-grid-community';

import cadastroModules from '@/data/cadastroModules';
import { ProductRegistrationData } from '@/types/product';

const Cadastro = () => {
  const [products, setProducts] = useState<ProductRegistrationData[]>([]);

  const [columnDefs] = useState([
    { headerName: 'Código', field: 'codigo', filter: true, sortable: true },
    { headerName: 'Família', field: 'familiaProduto', filter: true, sortable: true },
    { headerName: 'Marca', field: 'marca', filter: true, sortable: true },
    { headerName: 'Modelo', field: 'modelo', filter: true, sortable: true },
    { headerName: 'Descrição', field: 'descricao', filter: true, sortable: true },
    { headerName: 'Unidade Medida', field: 'unidadeMedida', filter: true, sortable: true },
    { headerName: 'Nome Marketing', field: 'nomeMarketing', filter: true, sortable: true },
    { headerName: 'Descritivo Breve', field: 'descritivoBreve', filter: true, sortable: true },
    { headerName: 'Descritivo Completo', field: 'descritivoCompleto', filter: true, sortable: true },
    { headerName: 'Tags', field: 'tags', filter: true, sortable: true },
    { headerName: 'Fabricante ID', field: 'fabricanteId', filter: true, sortable: true },
    { headerName: 'Código Fabricante', field: 'codigoProdutoFabricante', filter: true, sortable: true },
    { headerName: 'Nome Fabricante', field: 'nomeProdutoFabricante', filter: true, sortable: true },
  ]);

  const [modules] = useState<Module[]>([
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
    ...AllModules,
  ]);

  useEffect(() => {
    const formattedProducts = cadastroModules.produtos.map((item: any) => ({
      // Dados Gerais
      codigo: item.codigo || '',
      familiaProduto: item.familiaProduto || '',
      marca: item.marca || '',
      modelo: item.modelo || '',
      descricao: item.descricao || '',
      unidadeMedida: item.unidadeMedida || 'unidade', // Mudança: de vendidoPorUnidade para unidadeMedida
      nomeMarketing: item.nomeMarketing || '',
      descritivoBreve: item.descritivoBreve || '',
      descritivoCompleto: item.descritivoCompleto || '',
      tags: item.tags || [],
      fabricanteId: item.fabricanteId || '',
      codigoProdutoFabricante: item.codigoProdutoFabricante || '',
      nomeProdutoFabricante: item.nomeProdutoFabricante || '',
      // Regulamentação ANVISA
      detentorRegistroId: item.detentorRegistroId || '',
      nomeEmpresaDetentora: item.nomeEmpresaDetentora || '',
      cnpjDetentor: item.cnpjDetentor || '',
      autorizacaoFuncionamento: item.autorizacaoFuncionamento || '',
      nomeDispositivoMedico: item.nomeDispositivoMedico || '',
      nomeTecnicoDispositivo: item.nomeTecnicoDispositivo || '',
      numeroNotificacaoRegistro: item.numeroNotificacaoRegistro || '',
      situacaoNotificacaoRegistro: item.situacaoNotificacaoRegistro || '',
      processoNotificacaoRegistro: item.processoNotificacaoRegistro || '',
      classificacaoRisco: item.classificacaoRisco || '',
      dataInicioVigencia: item.dataInicioVigencia ? new Date(item.dataInicioVigencia) : null,
      dataVencimento: item.dataVencimento ? new Date(item.dataVencimento) : null,
      linkConsultaAnvisa: item.linkConsultaAnvisa || '',
      // Apresentações
      apresentacaoPrimaria: item.apresentacaoPrimaria || '',
      apresentacaoSecundaria: item.apresentacaoSecundaria || '',
      apresentacaoEmbarque: item.apresentacaoEmbarque || '',
      componentes: item.componentes || '',
      referenciasComercializadas: item.referenciasComercializadas || [],
      // Códigos Fiscais
      codigoNCM: item.codigoNCM || '',
      cest: item.cest || '',
      codigoEANPrimaria: item.codigoEANPrimaria || '',
      codigoEANSecundaria: item.codigoEANSecundaria || '',
      codigoEANEmbarque: item.codigoEANEmbarque || '',
      // Preço e Estoque
      precoUnitarioVenda: item.precoUnitarioVenda || 0,
      estoqueFisico: item.estoqueFisico || 0,
      reservado: item.reservado || 0,
      estoqueDisponivel: item.estoqueDisponivel || 0,
      // Dimensões e Peso
      pesoLiquido: item.pesoLiquido || 0,
      pesoBruto: item.pesoBruto || 0,
      altura: item.altura || 0,
      largura: item.largura || 0,
      profundidade: item.profundidade || 0,
      // Documentação e Links
      documentacaoLinks: item.documentacaoLinks || { linksDocumentacao: [], arquivosLocais: [] },
      // Logística e Comercial
      diasGarantia: item.diasGarantia || 0,
      leadtimeRessuprimento: item.leadtimeRessuprimento || 0,
      diasCrossdocking: item.diasCrossdocking || 0,
      cupomFiscalPDV: item.cupomFiscalPDV || false,
      marketplace: item.marketplace || false,
      tipoItemBlocoK: item.tipoItemBlocoK || '',
      origemMercadoria: item.origemMercadoria || '',
      // Auditoria
      inclusao: item.inclusao ? new Date(item.inclusao) : new Date(),
      ultimaAlteracao: item.ultimaAlteracao ? new Date(item.ultimaAlteracao) : new Date(),
      incluidoPor: item.incluidoPor || '',
      alteradoPor: item.alteradoPor || '',
    }));
    setProducts(formattedProducts);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={products}
        modules={modules}
      />
    </div>
  );
};

export default Cadastro;
