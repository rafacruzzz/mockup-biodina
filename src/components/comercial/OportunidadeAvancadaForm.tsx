import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"
import PedidoForm from "./PedidoForm";

interface OportunidadeAvancadaFormProps {
  onClose: () => void;
  onSave: (oportunidade: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [formData, setFormData] = useState({
    id: oportunidade?.id || '',
    cliente: oportunidade?.cliente || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    cnpj: oportunidade?.cnpj || '',
    contato: oportunidade?.contato || '',
    telefone: oportunidade?.telefone || '',
    email: oportunidade?.email || '',
    endereco: oportunidade?.endereco || '',
    numero: oportunidade?.numero || '',
    complemento: oportunidade?.complemento || '',
    bairro: oportunidade?.bairro || '',
    cidade: oportunidade?.cidade || '',
    estado: oportunidade?.estado || '',
    cep: oportunidade?.cep || '',
    vendedor: oportunidade?.vendedor || '',
    dataAbertura: oportunidade?.dataAbertura || new Date().toISOString().split('T')[0],
    dataFechamento: oportunidade?.dataFechamento || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    probabilidade: oportunidade?.probabilidade || 0,
    status: oportunidade?.status || 'aberta',
    origem: oportunidade?.origem || '',
    segmento: oportunidade?.segmento || '',
    tipoCliente: oportunidade?.tipoCliente || '',
    fonteIndicacao: oportunidade?.fonteIndicacao || '',
    consultor: oportunidade?.consultor || '',
    descricao: oportunidade?.descricao || '',
    observacoes: oportunidade?.observacoes || '',
    proximosPassos: oportunidade?.proximosPassos || '',
    historico: oportunidade?.historico || '',
    tags: oportunidade?.tags || '',
    dataProximoContato: oportunidade?.dataProximoContato || '',
    lembrarProximoContato: oportunidade?.lembrarProximoContato || false,
    motivoPerda: oportunidade?.motivoPerda || '',
    dataCadastro: oportunidade?.dataCadastro || new Date().toISOString().split('T')[0],
    dataUltimaAtualizacao: oportunidade?.dataUltimaAtualizacao || new Date().toISOString().split('T')[0],
    responsavel: oportunidade?.responsavel || '',
    produtosInteresse: oportunidade?.produtosInteresse || '',
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: formData.dataAbertura ? new Date(formData.dataAbertura) : undefined,
    to: formData.dataFechamento ? new Date(formData.dataFechamento) : undefined,
  })

  const { toast } = useToast()
  const [isPedidoFormOpen, setIsPedidoFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCriarPedido = () => {
    setIsPedidoFormOpen(true);
  };

  const handleSavePedido = (pedido: any) => {
    console.log('Pedido criado a partir da oportunidade:', pedido);
    setIsPedidoFormOpen(false);
    // Aqui você pode adicionar lógica para atualizar o status da oportunidade
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              placeholder="Nome do cliente"
            />
          </div>
          <div>
            <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
            <Input
              id="nomeFantasia"
              value={formData.nomeFantasia}
              onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
              placeholder="Nome fantasia do cliente"
            />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              placeholder="CNPJ do cliente"
            />
          </div>
          <div>
            <Label htmlFor="contato">Contato</Label>
            <Input
              id="contato"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              placeholder="Nome do contato"
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              placeholder="Telefone do cliente"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email do cliente"
            />
          </div>
          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              placeholder="Endereço do cliente"
            />
          </div>
          <div>
            <Label htmlFor="numero">Número</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              placeholder="Número do endereço"
            />
          </div>
          <div>
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
              placeholder="Complemento do endereço"
            />
          </div>
          <div>
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
              placeholder="Bairro do cliente"
            />
          </div>
          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              placeholder="Cidade do cliente"
            />
          </div>
          <div>
            <Label htmlFor="estado">Estado</Label>
            <Input
              id="estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              placeholder="Estado do cliente"
            />
          </div>
          <div>
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              placeholder="CEP do cliente"
            />
          </div>
          <div>
            <Label htmlFor="vendedor">Vendedor</Label>
            <Input
              id="vendedor"
              value={formData.vendedor}
              onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
              placeholder="Vendedor responsável"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dataAbertura">Data de Abertura</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
                    ) : (
                      format(date.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(value) => {
                    setDate(value)
                    setFormData({
                      ...formData,
                      dataAbertura: value?.from?.toISOString().split('T')[0] || '',
                      dataFechamento: value?.to?.toISOString().split('T')[0] || '',
                    })
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="valorEstimado">Valor Estimado</Label>
            <Input
              id="valorEstimado"
              type="number"
              value={formData.valorEstimado}
              onChange={(e) => setFormData({ ...formData, valorEstimado: Number(e.target.value) })}
              placeholder="Valor estimado da oportunidade"
            />
          </div>
          <div>
            <Label htmlFor="probabilidade">Probabilidade (%)</Label>
            <Input
              id="probabilidade"
              type="number"
              value={formData.probabilidade}
              onChange={(e) => setFormData({ ...formData, probabilidade: Number(e.target.value) })}
              placeholder="Probabilidade de fechamento"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                <SelectItem value="ganha">Ganha</SelectItem>
                <SelectItem value="perdida">Perdida</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="origem">Origem</Label>
            <Input
              id="origem"
              value={formData.origem}
              onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
              placeholder="Origem da oportunidade"
            />
          </div>
          <div>
            <Label htmlFor="segmento">Segmento</Label>
            <Input
              id="segmento"
              value={formData.segmento}
              onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
              placeholder="Segmento do cliente"
            />
          </div>
          <div>
            <Label htmlFor="tipoCliente">Tipo de Cliente</Label>
            <Select value={formData.tipoCliente} onValueChange={(value) => setFormData({ ...formData, tipoCliente: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="existente">Existente</SelectItem>
                <SelectItem value="potencial">Potencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fonteIndicacao">Fonte de Indicação</Label>
            <Input
              id="fonteIndicacao"
              value={formData.fonteIndicacao}
              onChange={(e) => setFormData({ ...formData, fonteIndicacao: e.target.value })}
              placeholder="Fonte de indicação"
            />
          </div>
          <div>
            <Label htmlFor="consultor">Consultor</Label>
            <Input
              id="consultor"
              value={formData.consultor}
              onChange={(e) => setFormData({ ...formData, consultor: e.target.value })}
              placeholder="Consultor responsável"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descrição e Observações</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição da oportunidade"
            />
          </div>
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Observações adicionais"
            />
          </div>
          <div>
            <Label htmlFor="proximosPassos">Próximos Passos</Label>
            <Textarea
              id="proximosPassos"
              value={formData.proximosPassos}
              onChange={(e) => setFormData({ ...formData, proximosPassos: e.target.value })}
              placeholder="Próximos passos a serem seguidos"
            />
          </div>
          <div>
            <Label htmlFor="historico">Histórico</Label>
            <Textarea
              id="historico"
              value={formData.historico}
              onChange={(e) => setFormData({ ...formData, historico: e.target.value })}
              placeholder="Histórico da oportunidade"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            if (!formData.cliente || !formData.nomeFantasia) {
              toast({
                title: "Atenção!",
                description: "Preencha todos os campos obrigatórios.",
              })
              return
            }
            onSave(formData)
            onClose()
          }}
          className="bg-biodina-gold hover:bg-biodina-gold/90"
        >
          Salvar
        </Button>
        <Button 
          onClick={handleCriarPedido}
          className="bg-biodina-gold hover:bg-biodina-gold/90"
        >
          Criar Pedido
        </Button>
      </div>

      {isPedidoFormOpen && (
        <PedidoForm
          onClose={() => setIsPedidoFormOpen(false)}
          onSave={handleSavePedido}
          oportunidade={{
            id: formData.id,
            nome: formData.cliente,
            nomeFantasia: formData.nomeFantasia,
            cliente: formData.cliente
          }}
        />
      )}
    </div>
  );
};

export default OportunidadeAvancadaForm;
