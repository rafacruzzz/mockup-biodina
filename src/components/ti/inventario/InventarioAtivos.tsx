import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Download, Edit, MoreHorizontal, MonitorSpeaker, Laptop, Server, Printer, Router } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { tiModules } from "@/data/tiModules";
import { AtivoModal } from "./AtivoModal";
import { TransferenciaModal } from "./TransferenciaModal";
import { RelatoriosModal } from "./RelatoriosModal";
import type { AtivoTI } from "@/types/ti";

export const InventarioAtivos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDepartamento, setFilterDepartamento] = useState("todos");
  const [modalAberto, setModalAberto] = useState<'cadastro' | 'edicao' | 'transferencia' | 'relatorios' | null>(null);
  const [ativoSelecionado, setAtivoSelecionado] = useState<AtivoTI | null>(null);

  const ativos = tiModules.inventario.subModules.ativos.data as AtivoTI[];

  const dadosFiltrados = useMemo(() => {
    return ativos.filter(ativo => {
      const matchesSearch = ativo.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ativo.numeroInventario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ativo.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTipo = filterTipo === "todos" || ativo.tipo === filterTipo;
      const matchesStatus = filterStatus === "todos" || ativo.status === filterStatus;
      const matchesDepartamento = filterDepartamento === "todos" || ativo.departamento === filterDepartamento;

      return matchesSearch && matchesTipo && matchesStatus && matchesDepartamento;
    });
  }, [ativos, searchTerm, filterTipo, filterStatus, filterDepartamento]);

  const departamentosUnicos = [...new Set(ativos.map(ativo => ativo.departamento))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'manutencao': return 'bg-yellow-100 text-yellow-800';
      case 'reserva': return 'bg-blue-100 text-blue-800';
      case 'descartado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'notebook': return <Laptop className="h-4 w-4" />;
      case 'desktop': return <MonitorSpeaker className="h-4 w-4" />;
      case 'servidor': return <Server className="h-4 w-4" />;
      case 'impressora': return <Printer className="h-4 w-4" />;
      case 'roteador': return <Router className="h-4 w-4" />;
      default: return <MonitorSpeaker className="h-4 w-4" />;
    }
  };

  const handleEditarAtivo = (ativo: AtivoTI) => {
    setAtivoSelecionado(ativo);
    setModalAberto('edicao');
  };

  const handleTransferirAtivo = (ativo: AtivoTI) => {
    setAtivoSelecionado(ativo);
    setModalAberto('transferencia');
  };

  const exportarRelatorio = () => {
    const csvContent = [
      ['Nº Inventário', 'Equipamento', 'Tipo', 'Status', 'Responsável', 'Departamento', 'Localização', 'Data Aquisição', 'Valor'],
      ...dadosFiltrados.map(ativo => [
        ativo.numeroInventario,
        ativo.equipamento,
        ativo.tipo,
        ativo.status,
        ativo.responsavel,
        ativo.departamento,
        ativo.localizacao,
        ativo.dataAquisicao,
        ativo.valorAquisicao?.toString() || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventario_ativos_ti.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventário de Ativos de TI</h1>
        <p className="text-gray-600 mt-1">Controle consolidado de equipamentos e ativos de tecnologia</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{ativos.length}</p>
              </div>
              <MonitorSpeaker className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {ativos.filter(a => a.status === 'ativo').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Manutenção</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {ativos.filter(a => a.status === 'manutencao').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {ativos.reduce((total, a) => total + (a.valorAquisicao || 0), 0).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Filtros e Ações</span>
            <div className="flex gap-2">
              <Button onClick={() => setModalAberto('cadastro')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Ativo
              </Button>
              <Button variant="outline" onClick={exportarRelatorio}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" onClick={() => setModalAberto('relatorios')}>
                <Filter className="h-4 w-4 mr-2" />
                Relatórios
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Buscar por equipamento, nº inventário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Equipamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="servidor">Servidor</SelectItem>
                <SelectItem value="impressora">Impressora</SelectItem>
                <SelectItem value="roteador">Roteador</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="manutencao">Em Manutenção</SelectItem>
                <SelectItem value="reserva">Reserva</SelectItem>
                <SelectItem value="descartado">Descartado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDepartamento} onValueChange={setFilterDepartamento}>
              <SelectTrigger>
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Departamentos</SelectItem>
                {departamentosUnicos.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterTipo("todos");
                setFilterStatus("todos");
                setFilterDepartamento("todos");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ativos ({dadosFiltrados.length})</CardTitle>
          <CardDescription>
            Lista consolidada de todos os ativos de TI cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipamento</TableHead>
                <TableHead>Nº Inventário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosFiltrados.map((ativo) => (
                <TableRow key={ativo.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTipoIcon(ativo.tipo)}
                      <div>
                        <p className="font-medium">{ativo.equipamento}</p>
                        <p className="text-sm text-gray-500">{ativo.marca} {ativo.modelo}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{ativo.numeroInventario}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {ativo.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(ativo.status)} capitalize`}>
                      {ativo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ativo.responsavel}</p>
                      <p className="text-sm text-gray-500">{ativo.departamento}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{ativo.localizacao}</TableCell>
                  <TableCell>
                    R$ {ativo.valorAquisicao?.toLocaleString('pt-BR') || '—'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditarAtivo(ativo)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTransferirAtivo(ativo)}>
                          <MoreHorizontal className="h-4 w-4 mr-2" />
                          Transferir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <AtivoModal 
        isOpen={modalAberto === 'cadastro' || modalAberto === 'edicao'}
        onClose={() => {
          setModalAberto(null);
          setAtivoSelecionado(null);
        }}
        ativo={ativoSelecionado}
        modo={modalAberto === 'edicao' ? 'edicao' : 'cadastro'}
      />

      <TransferenciaModal
        isOpen={modalAberto === 'transferencia'}
        onClose={() => {
          setModalAberto(null);
          setAtivoSelecionado(null);
        }}
        ativo={ativoSelecionado}
      />

      <RelatoriosModal
        isOpen={modalAberto === 'relatorios'}
        onClose={() => setModalAberto(null)}
        ativos={ativos}
      />
    </div>
  );
};