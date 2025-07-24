
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ProductTabProps } from "@/types/product";

const RegulamentacaoAnvisaTab = ({ formData, onInputChange }: ProductTabProps) => {
  const detentoresAnvisa = [
    { id: "1", nome: "EMS S.A.", cnpj: "57.507.378/0001-83" },
    { id: "2", nome: "Eurofarma Laboratórios S.A.", cnpj: "61.190.096/0001-92" },
    { id: "3", nome: "Pfizer Brasil Ltda.", cnpj: "46.070.868/0001-69" },
    { id: "4", nome: "Biosintética Farmacêutica Ltda.", cnpj: "53.162.095/0001-06" },
    { id: "5", nome: "Johnson & Johnson do Brasil Ind. e Com. Ltda.", cnpj: "51.780.468/0001-7" }
  ];

  const situacoesRegistro = [
    "Vigente",
    "Vencido", 
    "Suspenso",
    "Cancelado",
    "Arquivado"
  ];

  const classificacoesRisco = [
    "Classe I - Baixo Risco",
    "Classe II - Médio Risco", 
    "Classe III - Alto Risco",
    "Classe IV - Máximo Risco"
  ];

  const handleDetentorChange = (detentorId: string) => {
    const detentor = detentoresAnvisa.find(d => d.id === detentorId);
    if (detentor) {
      onInputChange('detentorRegistroId', detentorId);
      onInputChange('nomeEmpresaDetentora', detentor.nome);
      onInputChange('cnpjDetentor', detentor.cnpj);
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Detentor do Registro */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">🏛️ Detentor do Registro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="detentorRegistro" className="text-sm font-semibold">Nome da Empresa Detentora *</Label>
              <Select value={formData.detentorRegistroId} onValueChange={handleDetentorChange}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione o detentor do registro" />
                </SelectTrigger>
                <SelectContent>
                  {detentoresAnvisa.map((detentor) => (
                    <SelectItem key={detentor.id} value={detentor.id}>
                      {detentor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpjDetentor" className="text-sm font-semibold">CNPJ do Detentor</Label>
              <Input
                id="cnpjDetentor"
                value={formData.cnpjDetentor}
                readOnly
                placeholder="Auto-completado"
                className="border-gray-300 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autorizacaoFuncionamento" className="text-sm font-semibold">Autorização de Funcionamento</Label>
              <Input
                id="autorizacaoFuncionamento"
                value={formData.autorizacaoFuncionamento}
                onChange={(e) => onInputChange('autorizacaoFuncionamento', e.target.value)}
                placeholder="Ex: 25351.916696/2019-26"
                className="border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Informações do Dispositivo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">🔬 Informações do Dispositivo Médico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nomeDispositivoMedico" className="text-sm font-semibold">Nome do Dispositivo Médico *</Label>
              <Input
                id="nomeDispositivoMedico"
                value={formData.nomeDispositivoMedico}
                onChange={(e) => onInputChange('nomeDispositivoMedico', e.target.value)}
                placeholder="Nome comercial do dispositivo"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeTecnicoDispositivo" className="text-sm font-semibold">Nome Técnico do Dispositivo</Label>
              <Input
                id="nomeTecnicoDispositivo"
                value={formData.nomeTecnicoDispositivo}
                onChange={(e) => onInputChange('nomeTecnicoDispositivo', e.target.value)}
                placeholder="Nome técnico/científico"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numeroNotificacaoRegistro" className="text-sm font-semibold">Número da Notificação/Registro *</Label>
              <Input
                id="numeroNotificacaoRegistro"
                value={formData.numeroNotificacaoRegistro}
                onChange={(e) => onInputChange('numeroNotificacaoRegistro', e.target.value)}
                placeholder="Ex: 80146300012"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="situacaoNotificacaoRegistro" className="text-sm font-semibold">Situação da Notificação/Registro</Label>
              <Select 
                value={formData.situacaoNotificacaoRegistro} 
                onValueChange={(value) => onInputChange('situacaoNotificacaoRegistro', value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  {situacoesRegistro.map((situacao) => (
                    <SelectItem key={situacao} value={situacao}>{situacao}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="processoNotificacaoRegistro" className="text-sm font-semibold">Processo da Notificação/Registro</Label>
              <Input
                id="processoNotificacaoRegistro"
                value={formData.processoNotificacaoRegistro}
                onChange={(e) => onInputChange('processoNotificacaoRegistro', e.target.value)}
                placeholder="Ex: 25351.916696/2019-26"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="classificacaoRisco" className="text-sm font-semibold">Classificação de Risco</Label>
              <Select 
                value={formData.classificacaoRisco} 
                onValueChange={(value) => onInputChange('classificacaoRisco', value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione a classe" />
                </SelectTrigger>
                <SelectContent>
                  {classificacoesRisco.map((classe) => (
                    <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Data de Início da Vigência</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !formData.dataInicioVigencia && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataInicioVigencia ? (
                      format(formData.dataInicioVigencia, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataInicioVigencia || undefined}
                    onSelect={(date) => onInputChange('dataInicioVigencia', date || null)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Data de Vencimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !formData.dataVencimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataVencimento ? (
                      format(formData.dataVencimento, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataVencimento || undefined}
                    onSelect={(date) => onInputChange('dataVencimento', date || null)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkConsultaAnvisa" className="text-sm font-semibold">Link para Consulta ANVISA</Label>
              <div className="flex gap-2">
                <Input
                  id="linkConsultaAnvisa"
                  value={formData.linkConsultaAnvisa}
                  onChange={(e) => onInputChange('linkConsultaAnvisa', e.target.value)}
                  placeholder="https://consultas.anvisa.gov.br..."
                  className="border-gray-300"
                />
                {formData.linkConsultaAnvisa && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formData.linkConsultaAnvisa, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulamentacaoAnvisaTab;
