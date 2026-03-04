import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { AssinaturaPad } from "@/components/ui/assinatura-pad";
import {
  NotificacaoAcaoCampoData,
  ProdutoNotificacao,
  DistribuicaoPais,
  PlanoAcaoItem
} from "@/types/acaoCampo";

const UFS_BRASIL = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

const produtoVazio: ProdutoNotificacao = {
  nomeComercial: '', nomeTecnico: '', registroNotificacao: '',
  classeRisco: '', codigoReferencia: '', modelo: '', loteSerie: ''
};

const distribuicaoPaisVazia: DistribuicaoPais = { pais: '', loteSerie: '', quantidade: '' };

const planoAcaoVazio = (n: number): PlanoAcaoItem => ({
  numero: n, descricao: '', inicio: '', fim: '', situacao: '', observacoes: ''
});

const defaultData: NotificacaoAcaoCampoData = {
  cnpj: '', razaoSocial: '', endereco: '', uf: '', municipio: '',
  responsavelNome: '', responsavelCargo: '', responsavelTelefone: '', responsavelEmail: '',
  dataInicioAcao: '', codigoAcao: '',
  tipoProduto: '',
  produtos: [{ ...produtoVazio }],
  fabricanteNome: '', fabricantePais: '', fabricanteEndereco: '',
  quantidadeTotalEnvolvidos: '', quantidadeTotalComercializada: '',
  quantidadeEstoque: '', quantidadeImplantada: '', tipoUnidadeInformada: '',
  distribuicaoUsoResidencial: false, distribuicaoImplantados: false,
  distribuicaoServicoseSaude: false, distribuicaoEstoqueFabricante: false,
  distribuicaoUFs: [], distribuicaoPaises: [],
  classificacaoRisco: '', classificacaoAcao: [], classificacaoAcaoOutraEspecificar: '',
  destinacaoFinal: '', destinacaoFinalOutraEspecificar: '',
  enquadramento: [], enquadramentoOutraEspecificar: '',
  dataIdentificacaoProblema: '', descricaoProblema: '', avaliacaoRisco: '',
  possiveisConsequencias: '', recomendacaoUsuarios: '',
  notificacoesNotivisa: false, numerosNotificacoes: '',
  planosAcao: [planoAcaoVazio(1)],
  observacoes: '', local: '', data: '', nomeLegivel: '',
  assinaturaDigitalBase64: ''
};

interface Props {
  initialData?: NotificacaoAcaoCampoData;
  onSave: (dados: NotificacaoAcaoCampoData) => void;
  onCancel: () => void;
}

export const NotificacaoAcaoCampoForm = ({ initialData, onSave, onCancel }: Props) => {
  const [dados, setDados] = useState<NotificacaoAcaoCampoData>(initialData || defaultData);

  const set = <K extends keyof NotificacaoAcaoCampoData>(key: K, value: NotificacaoAcaoCampoData[K]) => {
    setDados(prev => ({ ...prev, [key]: value }));
  };

  const toggleCheckboxArray = (key: 'classificacaoAcao' | 'enquadramento' | 'distribuicaoUFs', value: string) => {
    setDados(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const updateProduto = (index: number, field: keyof ProdutoNotificacao, value: string) => {
    setDados(prev => {
      const produtos = [...prev.produtos];
      produtos[index] = { ...produtos[index], [field]: value };
      return { ...prev, produtos };
    });
  };

  const addProduto = () => {
    if (dados.produtos.length < 5) {
      set('produtos', [...dados.produtos, { ...produtoVazio }]);
    }
  };

  const removeProduto = (index: number) => {
    if (dados.produtos.length > 1) {
      set('produtos', dados.produtos.filter((_, i) => i !== index));
    }
  };

  const addDistribuicaoPais = () => {
    set('distribuicaoPaises', [...dados.distribuicaoPaises, { ...distribuicaoPaisVazia }]);
  };

  const removeDistribuicaoPais = (index: number) => {
    set('distribuicaoPaises', dados.distribuicaoPaises.filter((_, i) => i !== index));
  };

  const updateDistribuicaoPais = (index: number, field: keyof DistribuicaoPais, value: string) => {
    setDados(prev => {
      const arr = [...prev.distribuicaoPaises];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, distribuicaoPaises: arr };
    });
  };

  const addPlanoAcao = () => {
    set('planosAcao', [...dados.planosAcao, planoAcaoVazio(dados.planosAcao.length + 1)]);
  };

  const removePlanoAcao = (index: number) => {
    if (dados.planosAcao.length > 1) {
      set('planosAcao', dados.planosAcao.filter((_, i) => i !== index));
    }
  };

  const updatePlanoAcao = (index: number, field: keyof PlanoAcaoItem, value: string | number) => {
    setDados(prev => {
      const arr = [...prev.planosAcao];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, planosAcao: arr };
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="aba1" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="aba1" className="text-xs">1. Info Gerais</TabsTrigger>
          <TabsTrigger value="aba2" className="text-xs">2. Produto</TabsTrigger>
          <TabsTrigger value="aba3" className="text-xs">3. Ação</TabsTrigger>
          <TabsTrigger value="aba4" className="text-xs">4. Problema</TabsTrigger>
          <TabsTrigger value="aba5" className="text-xs">5. Plano</TabsTrigger>
          <TabsTrigger value="aba6" className="text-xs">6. Observações</TabsTrigger>
        </TabsList>

        {/* ABA 1 - Informações Gerais */}
        <TabsContent value="aba1" className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-base mb-3">1.1 Empresa</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">CNPJ</Label>
                <Input value={dados.cnpj} onChange={e => set('cnpj', e.target.value)} placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Razão Social</Label>
                <Input value={dados.razaoSocial} onChange={e => set('razaoSocial', e.target.value)} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">Endereço</Label>
                <Input value={dados.endereco} onChange={e => set('endereco', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">UF</Label>
                <Input value={dados.uf} onChange={e => set('uf', e.target.value)} maxLength={2} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Município</Label>
                <Input value={dados.municipio} onChange={e => set('municipio', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">1.2 Responsável</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Nome</Label>
                <Input value={dados.responsavelNome} onChange={e => set('responsavelNome', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Cargo</Label>
                <Input value={dados.responsavelCargo} onChange={e => set('responsavelCargo', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Telefone</Label>
                <Input value={dados.responsavelTelefone} onChange={e => set('responsavelTelefone', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">E-mail</Label>
                <Input value={dados.responsavelEmail} onChange={e => set('responsavelEmail', e.target.value)} type="email" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">1.3 Ação de Campo</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Data de Início da Ação</Label>
                <Input type="date" value={dados.dataInicioAcao} onChange={e => set('dataInicioAcao', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Código</Label>
                <Input value={dados.codigoAcao} onChange={e => set('codigoAcao', e.target.value)} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ABA 2 - Produto */}
        <TabsContent value="aba2" className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-base mb-3">2.1 Tipo de Produto</h3>
            <RadioGroup value={dados.tipoProduto} onValueChange={v => set('tipoProduto', v)} className="space-y-2">
              {['Equipamento Médico', 'Material de Uso em Saúde', 'Produto para Diagnóstico in vitro (IVD)', 'Software como Dispositivo Médico (SaMD)'].map(t => (
                <div key={t} className="flex items-center space-x-2">
                  <RadioGroupItem value={t} id={`tipo-${t}`} />
                  <Label htmlFor={`tipo-${t}`} className="text-sm">{t}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-base">2.2 Dados do Produto</h3>
              {dados.produtos.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addProduto}>
                  <Plus className="h-3 w-3 mr-1" />Adicionar Produto
                </Button>
              )}
            </div>
            {dados.produtos.map((prod, i) => (
              <div key={i} className="border rounded-lg p-3 mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Produto {i + 1}</span>
                  {dados.produtos.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeProduto(i)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1"><Label className="text-xs">Nome Comercial</Label>
                    <Input value={prod.nomeComercial} onChange={e => updateProduto(i, 'nomeComercial', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Nome Técnico</Label>
                    <Input value={prod.nomeTecnico} onChange={e => updateProduto(i, 'nomeTecnico', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Registro/Notificação</Label>
                    <Input value={prod.registroNotificacao} onChange={e => updateProduto(i, 'registroNotificacao', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Classe de Risco</Label>
                    <Input value={prod.classeRisco} onChange={e => updateProduto(i, 'classeRisco', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Código de Referência</Label>
                    <Input value={prod.codigoReferencia} onChange={e => updateProduto(i, 'codigoReferencia', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Modelo</Label>
                    <Input value={prod.modelo} onChange={e => updateProduto(i, 'modelo', e.target.value)} /></div>
                  <div className="col-span-2 space-y-1"><Label className="text-xs">Lote/Série</Label>
                    <Input value={prod.loteSerie} onChange={e => updateProduto(i, 'loteSerie', e.target.value)} /></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">2.3 Fabricante</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Nome</Label>
                <Input value={dados.fabricanteNome} onChange={e => set('fabricanteNome', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">País</Label>
                <Input value={dados.fabricantePais} onChange={e => set('fabricantePais', e.target.value)} /></div>
              <div className="col-span-2 space-y-1"><Label className="text-xs">Endereço</Label>
                <Input value={dados.fabricanteEndereco} onChange={e => set('fabricanteEndereco', e.target.value)} /></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">2.5 Quantidade dos Produtos sob Risco no Brasil</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Quantidade Total Envolvidos</Label>
                <Input value={dados.quantidadeTotalEnvolvidos} onChange={e => set('quantidadeTotalEnvolvidos', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">Nº Total Comercializada</Label>
                <Input value={dados.quantidadeTotalComercializada} onChange={e => set('quantidadeTotalComercializada', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">Nº Estoque</Label>
                <Input value={dados.quantidadeEstoque} onChange={e => set('quantidadeEstoque', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">Quantidade Implantada (Ex: Marcapassos, próteses...)</Label>
                <Input value={dados.quantidadeImplantada} onChange={e => set('quantidadeImplantada', e.target.value)} /></div>
              <div className="col-span-2 space-y-1"><Label className="text-xs">Tipo de Unidade Informada (Unidades do produto, Caixas com 100 unidades, etc.)</Label>
                <Input value={dados.tipoUnidadeInformada} onChange={e => set('tipoUnidadeInformada', e.target.value)} /></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">2.6 Distribuição do Produto</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'distribuicaoUsoResidencial' as const, label: 'Em uso residencial' },
                { key: 'distribuicaoImplantados' as const, label: 'Implantados' },
                { key: 'distribuicaoServicoseSaude' as const, label: 'Em serviços de saúde' },
                { key: 'distribuicaoEstoqueFabricante' as const, label: 'Em estoque no fabricante' },
              ].map(item => (
                <div key={item.key} className="flex items-center space-x-2">
                  <Checkbox checked={dados[item.key]} onCheckedChange={v => set(item.key, !!v)} id={item.key} />
                  <Label htmlFor={item.key} className="text-sm">{item.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">2.7 Distribuição por UF</h3>
            <div className="grid grid-cols-9 gap-1">
              {UFS_BRASIL.map(uf => (
                <div key={uf} className="flex items-center space-x-1">
                  <Checkbox
                    checked={dados.distribuicaoUFs.includes(uf)}
                    onCheckedChange={() => toggleCheckboxArray('distribuicaoUFs', uf)}
                    id={`uf-${uf}`}
                  />
                  <Label htmlFor={`uf-${uf}`} className="text-xs">{uf}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-base">2.7 Distribuição para Outros Países</h3>
              <Button type="button" variant="outline" size="sm" onClick={addDistribuicaoPais}>
                <Plus className="h-3 w-3 mr-1" />Adicionar País
              </Button>
            </div>
            {dados.distribuicaoPaises.map((dp, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                <Input placeholder="País" value={dp.pais} onChange={e => updateDistribuicaoPais(i, 'pais', e.target.value)} />
                <Input placeholder="Lote/Série" value={dp.loteSerie} onChange={e => updateDistribuicaoPais(i, 'loteSerie', e.target.value)} />
                <Input placeholder="Quantidade" value={dp.quantidade} onChange={e => updateDistribuicaoPais(i, 'quantidade', e.target.value)} />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeDistribuicaoPais(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ABA 3 - Ação de Campo */}
        <TabsContent value="aba3" className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-base mb-3">3.1 Classificação do Risco</h3>
            <RadioGroup value={dados.classificacaoRisco} onValueChange={v => set('classificacaoRisco', v)} className="space-y-2">
              {['Classe I', 'Classe II', 'Classe III'].map(c => (
                <div key={c} className="flex items-center space-x-2">
                  <RadioGroupItem value={c} id={`risco-${c}`} />
                  <Label htmlFor={`risco-${c}`} className="text-sm">{c}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">3.2 Classificação da Ação</h3>
            <div className="space-y-2">
              {[
                'Recolhimento', 'Correção em Campo', 'Correção de partes/peças',
                'Atualização/correção instruções de uso', 'Atualização/correção rotulagem',
                'Comunicação aos clientes', 'Atualização de Software', 'Outra'
              ].map(a => (
                <div key={a} className="flex items-center space-x-2">
                  <Checkbox
                    checked={dados.classificacaoAcao.includes(a)}
                    onCheckedChange={() => toggleCheckboxArray('classificacaoAcao', a)}
                    id={`acao-${a}`}
                  />
                  <Label htmlFor={`acao-${a}`} className="text-sm">{a}</Label>
                </div>
              ))}
              {dados.classificacaoAcao.includes('Outra') && (
                <div className="ml-6 space-y-1">
                  <Label className="text-xs">Especificar</Label>
                  <Input value={dados.classificacaoAcaoOutraEspecificar} onChange={e => set('classificacaoAcaoOutraEspecificar', e.target.value)} />
                </div>
              )}
            </div>
          </div>

          <div>
              <h3 className="font-semibold text-base mb-3">3.2.1 Caso tenha respondido "Recolhimento" no item 3.2, informar a destinação final dos produtos recolhidos</h3>
              {dados.classificacaoAcao.includes('Recolhimento') ? (
                <>
                  <RadioGroup value={dados.destinacaoFinal} onValueChange={v => set('destinacaoFinal', v)} className="space-y-2">
                    {['Destruição', 'Devolução para o fabricante', 'Outra. Especificar'].map(d => (
                      <div key={d} className="flex items-center space-x-2">
                        <RadioGroupItem value={d} id={`dest-${d}`} />
                        <Label htmlFor={`dest-${d}`} className="text-sm">{d}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {dados.destinacaoFinal === 'Outra. Especificar' && (
                    <div className="ml-6 mt-2 space-y-1">
                      <Label className="text-xs">Especificar</Label>
                      <Input value={dados.destinacaoFinalOutraEspecificar} onChange={e => set('destinacaoFinalOutraEspecificar', e.target.value)} />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">Selecione "Recolhimento" no item 3.2 para preencher este campo.</p>
              )}
          </div>

          <div>
            <h3 className="font-semibold text-base mb-3">3.3 Enquadramento</h3>
            <div className="space-y-2">
              {[
                'Requer divulgação na mídia', 'Séria ameaça à saúde pública',
                'Risco de evento adverso grave', 'Ocorrência de evento adverso não grave',
                'Ocorrência de queixa técnica', 'Outra situação'
              ].map(e => (
                <div key={e} className="flex items-center space-x-2">
                  <Checkbox
                    checked={dados.enquadramento.includes(e)}
                    onCheckedChange={() => toggleCheckboxArray('enquadramento', e)}
                    id={`enq-${e}`}
                  />
                  <Label htmlFor={`enq-${e}`} className="text-sm">{e}</Label>
                </div>
              ))}
              {dados.enquadramento.includes('Outra situação') && (
                <div className="ml-6 space-y-1">
                  <Label className="text-xs">Especificar</Label>
                  <Input value={dados.enquadramentoOutraEspecificar} onChange={e => set('enquadramentoOutraEspecificar', e.target.value)} />
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ABA 4 - Descrição do Problema e Avaliação do Risco */}
        <TabsContent value="aba4" className="space-y-4 mt-4">
          <h3 className="font-semibold text-base">4. Descrição do Problema e Avaliação do Risco</h3>
          <div className="space-y-1">
            <Label className="text-xs">Data da Identificação do Problema</Label>
            <Input type="date" value={dados.dataIdentificacaoProblema} onChange={e => set('dataIdentificacaoProblema', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Descrição Sucinta do Problema</Label>
            <Textarea value={dados.descricaoProblema} onChange={e => set('descricaoProblema', e.target.value)} rows={3} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Avaliação de Risco</Label>
            <Textarea value={dados.avaliacaoRisco} onChange={e => set('avaliacaoRisco', e.target.value)} rows={3} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Possíveis Consequências da Utilização do Produto sob Risco</Label>
            <Textarea value={dados.possiveisConsequencias} onChange={e => set('possiveisConsequencias', e.target.value)} rows={3} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Recomendação aos Usuários e Pacientes</Label>
            <Textarea value={dados.recomendacaoUsuarios} onChange={e => set('recomendacaoUsuarios', e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Foram feitas notificações no Notivisa?</Label>
            <RadioGroup
              value={dados.notificacoesNotivisa ? 'sim' : 'nao'}
              onValueChange={v => set('notificacoesNotivisa', v === 'sim')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="notivisa-sim" />
                <Label htmlFor="notivisa-sim" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="notivisa-nao" />
                <Label htmlFor="notivisa-nao" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>
          {dados.notificacoesNotivisa && (
            <div className="space-y-1">
              <Label className="text-xs">Números das Notificações</Label>
              <Input value={dados.numerosNotificacoes} onChange={e => set('numerosNotificacoes', e.target.value)} placeholder="Informe os números das notificações" />
            </div>
          )}
        </TabsContent>

        {/* ABA 5 - Plano de Ação */}
        <TabsContent value="aba5" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">5. Plano de Ação da Empresa</h3>
            <Button type="button" variant="outline" size="sm" onClick={addPlanoAcao}>
              <Plus className="h-3 w-3 mr-1" />Adicionar Ação
            </Button>
          </div>
          {dados.planosAcao.map((pa, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ação {i + 1}</span>
                {dados.planosAcao.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removePlanoAcao(i)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs">Descrição da Ação</Label>
                  <Textarea value={pa.descricao} onChange={e => updatePlanoAcao(i, 'descricao', e.target.value)} rows={2} />
                </div>
                <div className="space-y-1"><Label className="text-xs">Início</Label>
                  <Input type="date" value={pa.inicio} onChange={e => updatePlanoAcao(i, 'inicio', e.target.value)} /></div>
                <div className="space-y-1"><Label className="text-xs">Fim</Label>
                  <Input type="date" value={pa.fim} onChange={e => updatePlanoAcao(i, 'fim', e.target.value)} /></div>
                <div className="space-y-1"><Label className="text-xs">Situação</Label>
                  <Input value={pa.situacao} onChange={e => updatePlanoAcao(i, 'situacao', e.target.value)} /></div>
                <div className="space-y-1"><Label className="text-xs">Observações</Label>
                  <Input value={pa.observacoes} onChange={e => updatePlanoAcao(i, 'observacoes', e.target.value)} /></div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* ABA 6 - Observações e Assinatura */}
        <TabsContent value="aba6" className="space-y-4 mt-4">
          <h3 className="font-semibold text-base">6. Observações e Assinatura</h3>
          <div className="space-y-1">
            <Label className="text-xs">Observações</Label>
            <Textarea value={dados.observacoes} onChange={e => set('observacoes', e.target.value)} rows={4} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1"><Label className="text-xs">Local</Label>
              <Input value={dados.local} onChange={e => set('local', e.target.value)} /></div>
            <div className="space-y-1"><Label className="text-xs">Data</Label>
              <Input type="date" value={dados.data} onChange={e => set('data', e.target.value)} /></div>
            <div className="space-y-1"><Label className="text-xs">Nome Legível</Label>
              <Input value={dados.nomeLegivel} onChange={e => set('nomeLegivel', e.target.value)} /></div>
          </div>

          <div className="space-y-2 pt-4">
            <h3 className="font-semibold text-base">Assinatura Digital</h3>
            {dados.assinaturaDigitalBase64 ? (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-white">
                  <img
                    src={dados.assinaturaDigitalBase64}
                    alt="Assinatura digital"
                    className="max-h-[120px] mx-auto"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => set('assinaturaDigitalBase64', '')}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Refazer Assinatura
                </Button>
              </div>
            ) : (
              <AssinaturaPad
                onSave={(base64) => set('assinaturaDigitalBase64', base64)}
                onClear={() => set('assinaturaDigitalBase64', '')}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={() => onSave(dados)}>Salvar</Button>
      </div>
    </div>
  );
};
