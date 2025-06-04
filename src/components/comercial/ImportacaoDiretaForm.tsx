import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ImportacaoDiretaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ImportacaoDiretaForm = ({
  open,
  onClose,
  onSave,
}: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState("principal");
  const [formData, setFormData] = useState({
    principal: {
      numeroOportunidade: "",
      cliente: "",
      produtoServico: "",
      quantidade: "",
      valorUnitario: "",
      valorTotal: "",
      dataPrevisaoFechamento: "",
      probabilidadeSucesso: "",
      status: "",
    },
    financeiro: {
      condicoesPagamento: "",
      impostosTaxas: "",
      custosAdicionais: "",
      margemLucro: "",
      precoFinal: "",
    },
    spi: {
      numeroProcesso: "",
      dataAbertura: "",
      prazoEntrega: "",
      modalidade: "",
      situacao: "",
      valorEstimado: "",
      orgao: {
        nome: "",
        cnpj: "",
        endereco: "",
        cidade: "",
      },
      responsavel: {
        nome: "",
        cargo: "",
        telefone: "",
        email: "",
        celular: "",
      },
      dataLimiteEsclarecimentos: "",
      dataLimitePropostas: "",
      dataSessaoPublica: "",
      objeto: "",
      observacoes: "",
      linkEdital: "",
    },
  });

  const updatePrincipalField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      principal: { ...prev.principal, [field]: value },
    }));
  };

  const updateFinanceiroField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      financeiro: { ...prev.financeiro, [field]: value },
    }));
  };

  const updateSPIField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      spi: { ...prev.spi, [field]: value },
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const renderPrincipalContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="numero-oportunidade">Número da Oportunidade</Label>
          <Input
            id="numero-oportunidade"
            value={formData.principal.numeroOportunidade}
            onChange={(e) =>
              updatePrincipalField("numeroOportunidade", e.target.value)
            }
            placeholder="Ex: OP-2024-001"
          />
        </div>
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="cliente"
            value={formData.principal.cliente}
            onChange={(e) => updatePrincipalField("cliente", e.target.value)}
            placeholder="Nome do Cliente"
          />
        </div>
        <div>
          <Label htmlFor="produto-servico">Produto/Serviço</Label>
          <Input
            id="produto-servico"
            value={formData.principal.produtoServico}
            onChange={(e) =>
              updatePrincipalField("produtoServico", e.target.value)
            }
            placeholder="Descrição do Produto/Serviço"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input
              id="quantidade"
              type="number"
              value={formData.principal.quantidade}
              onChange={(e) =>
                updatePrincipalField("quantidade", e.target.value)
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="valor-unitario">Valor Unitário (R$)</Label>
            <Input
              id="valor-unitario"
              type="number"
              step="0.01"
              value={formData.principal.valorUnitario}
              onChange={(e) =>
                updatePrincipalField("valorUnitario", e.target.value)
              }
              placeholder="0,00"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="valor-total">Valor Total (R$)</Label>
          <Input
            id="valor-total"
            type="number"
            step="0.01"
            value={formData.principal.valorTotal}
            onChange={(e) => updatePrincipalField("valorTotal", e.target.value)}
            placeholder="0,00"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="data-previsao">Data Prevista para Fechamento</Label>
            <Input
              id="data-previsao"
              type="date"
              value={formData.principal.dataPrevisaoFechamento}
              onChange={(e) =>
                updatePrincipalField("dataPrevisaoFechamento", e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="probabilidade">Probabilidade de Sucesso (%)</Label>
            <Input
              id="probabilidade"
              type="number"
              value={formData.principal.probabilidadeSucesso}
              onChange={(e) =>
                updatePrincipalField("probabilidadeSucesso", e.target.value)
              }
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.principal.status}
            onValueChange={(value) => updatePrincipalField("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em-andamento">Em Andamento</SelectItem>
              <SelectItem value="ganha">Ganha</SelectItem>
              <SelectItem value="perdida">Perdida</SelectItem>
              <SelectItem value="suspensa">Suspensa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderFinanceiroContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="condicoes-pagamento">Condições de Pagamento</Label>
          <Textarea
            id="condicoes-pagamento"
            value={formData.financeiro.condicoesPagamento}
            onChange={(e) =>
              updateFinanceiroField("condicoesPagamento", e.target.value)
            }
            placeholder="Detalhe as condições de pagamento"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="impostos-taxas">Impostos e Taxas (R$)</Label>
            <Input
              id="impostos-taxas"
              type="number"
              step="0.01"
              value={formData.financeiro.impostosTaxas}
              onChange={(e) =>
                updateFinanceiroField("impostosTaxas", e.target.value)
              }
              placeholder="0,00"
            />
          </div>
          <div>
            <Label htmlFor="custos-adicionais">Custos Adicionais (R$)</Label>
            <Input
              id="custos-adicionais"
              type="number"
              step="0.01"
              value={formData.financeiro.custosAdicionais}
              onChange={(e) =>
                updateFinanceiroField("custosAdicionais", e.target.value)
              }
              placeholder="0,00"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="margem-lucro">Margem de Lucro (%)</Label>
          <Input
            id="margem-lucro"
            type="number"
            value={formData.financeiro.margemLucro}
            onChange={(e) => updateFinanceiroField("margemLucro", e.target.value)}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="preco-final">Preço Final (R$)</Label>
          <Input
            id="preco-final"
            type="number"
            step="0.01"
            value={formData.financeiro.precoFinal}
            onChange={(e) => updateFinanceiroField("precoFinal", e.target.value)}
            placeholder="0,00"
          />
        </div>
      </div>
    );
  };

  const renderSPIContent = () => {
    return (
      <div className="space-y-6">
        {/* Seção de Informações Gerais */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-biodina-blue">
            Informações Gerais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="spi-numero-processo">Número do Processo</Label>
              <Input
                id="spi-numero-processo"
                value={formData.spi?.numeroProcesso || ""}
                onChange={(e) =>
                  updateSPIField("numeroProcesso", e.target.value)
                }
                placeholder="Ex: 2024001234"
              />
            </div>
            <div>
              <Label htmlFor="spi-data-abertura">Data de Abertura</Label>
              <Input
                id="spi-data-abertura"
                type="date"
                value={formData.spi?.dataAbertura || ""}
                onChange={(e) => updateSPIField("dataAbertura", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="spi-prazo-entrega">Prazo de Entrega (dias)</Label>
              <Input
                id="spi-prazo-entrega"
                type="number"
                value={formData.spi?.prazoEntrega || ""}
                onChange={(e) => updateSPIField("prazoEntrega", e.target.value)}
                placeholder="Ex: 30"
              />
            </div>
            <div>
              <Label htmlFor="spi-modalidade">Modalidade</Label>
              <Select
                value={formData.spi?.modalidade || ""}
                onValueChange={(value) => updateSPIField("modalidade", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pregao-eletronico">
                    Pregão Eletrônico
                  </SelectItem>
                  <SelectItem value="concorrencia">Concorrência</SelectItem>
                  <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                  <SelectItem value="convite">Convite</SelectItem>
                  <SelectItem value="dispensa">Dispensa</SelectItem>
                  <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="spi-situacao">Situação</Label>
              <Select
                value={formData.spi?.situacao || ""}
                onValueChange={(value) => updateSPIField("situacao", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="suspenso">Suspenso</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="homologado">Homologado</SelectItem>
                  <SelectItem value="revogado">Revogado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="spi-valor-estimado">Valor Estimado (R$)</Label>
              <Input
                id="spi-valor-estimado"
                type="number"
                step="0.01"
                value={formData.spi?.valorEstimado || ""}
                onChange={(e) => updateSPIField("valorEstimado", e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>
        </div>

        {/* Seção de Dados do Órgão */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-biodina-blue">
            Dados do Órgão
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="spi-orgao-nome">Nome do Órgão</Label>
              <Input
                id="spi-orgao-nome"
                value={formData.spi?.orgao?.nome || ""}
                onChange={(e) =>
                  updateSPIField("orgao", {
                    ...formData.spi?.orgao,
                    nome: e.target.value,
                  })
                }
                placeholder="Ex: Secretaria Municipal de Saúde"
              />
            </div>
            <div>
              <Label htmlFor="spi-orgao-cnpj">CNPJ</Label>
              <Input
                id="spi-orgao-cnpj"
                value={formData.spi?.orgao?.cnpj || ""}
                onChange={(e) =>
                  updateSPIField("orgao", {
                    ...formData.spi?.orgao,
                    cnpj: e.target.value,
                  })
                }
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <Label htmlFor="spi-orgao-endereco">Endereço</Label>
              <Input
                id="spi-orgao-endereco"
                value={formData.spi?.orgao?.endereco || ""}
                onChange={(e) =>
                  updateSPIField("orgao", {
                    ...formData.spi?.orgao,
                    endereco: e.target.value,
                  })
                }
                placeholder="Endereço completo"
              />
            </div>
            <div>
              <Label htmlFor="spi-orgao-cidade">Cidade/UF</Label>
              <Input
                id="spi-orgao-cidade"
                value={formData.spi?.orgao?.cidade || ""}
                onChange={(e) =>
                  updateSPIField("orgao", {
                    ...formData.spi?.orgao,
                    cidade: e.target.value,
                  })
                }
                placeholder="Ex: São Paulo/SP"
              />
            </div>
          </div>
        </div>

        {/* Seção de Contatos */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-biodina-blue">
            Contatos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="spi-responsavel-nome">Nome do Responsável</Label>
              <Input
                id="spi-responsavel-nome"
                value={formData.spi?.responsavel?.nome || ""}
                onChange={(e) =>
                  updateSPIField("responsavel", {
                    ...formData.spi?.responsavel,
                    nome: e.target.value,
                  })
                }
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="spi-responsavel-cargo">Cargo</Label>
              <Input
                id="spi-responsavel-cargo"
                value={formData.spi?.responsavel?.cargo || ""}
                onChange={(e) =>
                  updateSPIField("responsavel", {
                    ...formData.spi?.responsavel,
                    cargo: e.target.value,
                  })
                }
                placeholder="Ex: Pregoeiro"
              />
            </div>
            <div>
              <Label htmlFor="spi-responsavel-telefone">Telefone</Label>
              <Input
                id="spi-responsavel-telefone"
                value={formData.spi?.responsavel?.telefone || ""}
                onChange={(e) =>
                  updateSPIField("responsavel", {
                    ...formData.spi?.responsavel,
                    telefone: e.target.value,
                  })
                }
                placeholder="(00) 0000-0000"
              />
            </div>
            <div>
              <Label htmlFor="spi-responsavel-email">E-mail</Label>
              <Input
                id="spi-responsavel-email"
                type="email"
                value={formData.spi?.responsavel?.email || ""}
                onChange={(e) =>
                  updateSPIField("responsavel", {
                    ...formData.spi?.responsavel,
                    email: e.target.value,
                  })
                }
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="spi-responsavel-celular">Celular</Label>
              <Input
                id="spi-responsavel-celular"
                value={formData.spi?.responsavel?.celular || ""}
                onChange={(e) =>
                  updateSPIField("responsavel", {
                    ...formData.spi?.responsavel,
                    celular: e.target.value,
                  })
                }
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </div>

        {/* Seção de Datas Importantes */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-biodina-blue">
            Cronograma
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="spi-data-limite-esclarecimentos">
                Limite para Esclarecimentos
              </Label>
              <Input
                id="spi-data-limite-esclarecimentos"
                type="datetime-local"
                value={formData.spi?.dataLimiteEsclarecimentos || ""}
                onChange={(e) =>
                  updateSPIField("dataLimiteEsclarecimentos", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="spi-data-limite-propostas">
                Limite para Propostas
              </Label>
              <Input
                id="spi-data-limite-propostas"
                type="datetime-local"
                value={formData.spi?.dataLimitePropostas || ""}
                onChange={(e) =>
                  updateSPIField("dataLimitePropostas", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="spi-data-sessao-publica">Sessão Pública</Label>
              <Input
                id="spi-data-sessao-publica"
                type="datetime-local"
                value={formData.spi?.dataSessaoPublica || ""}
                onChange={(e) =>
                  updateSPIField("dataSessaoPublica", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Seção de Observações */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-biodina-blue">
            Observações e Anexos
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="spi-objeto">Objeto da Licitação</Label>
              <Textarea
                id="spi-objeto"
                value={formData.spi?.objeto || ""}
                onChange={(e) => updateSPIField("objeto", e.target.value)}
                placeholder="Descrição detalhada do objeto..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="spi-observacoes">Observações Gerais</Label>
              <Textarea
                id="spi-observacoes"
                value={formData.spi?.observacoes || ""}
                onChange={(e) => updateSPIField("observacoes", e.target.value)}
                placeholder="Observações importantes sobre o processo..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="spi-link-edital">Link do Edital</Label>
              <Input
                id="spi-link-edital"
                type="url"
                value={formData.spi?.linkEdital || ""}
                onChange={(e) => updateSPIField("linkEdital", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <Card className="container relative mx-auto my-24 w-full max-w-4xl overflow-visible">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Importação Direta</CardTitle>
              <Button variant="ghost" className="h-9 w-9 p-0" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </CardHeader>
            <CardContent className="pb-12">
              <div className="flex space-x-4">
                <Button
                  variant={activeTab === "principal" ? "default" : "outline"}
                  onClick={() => setActiveTab("principal")}
                >
                  Principal
                </Button>
                <Button
                  variant={activeTab === "financeiro" ? "default" : "outline"}
                  onClick={() => setActiveTab("financeiro")}
                >
                  Financeiro
                </Button>
                <Button
                  variant={activeTab === "spi" ? "default" : "outline"}
                  onClick={() => setActiveTab("spi")}
                >
                  SPI
                </Button>
              </div>
              <div className="mt-6">
                {activeTab === "principal" && renderPrincipalContent()}
                {activeTab === "financeiro" && renderFinanceiroContent()}
                {activeTab === "spi" && renderSPIContent()}
              </div>
              <div className="mt-8 flex justify-end space-x-2">
                <Button variant="secondary" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>Salvar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default ImportacaoDiretaForm;
