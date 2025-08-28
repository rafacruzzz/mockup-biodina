import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useColaboradores } from "@/hooks/useColaboradores";
import { Checkbox } from "@/components/ui/checkbox";

import * as z from "zod";

const formSchema = z.object({
  dadosPessoais: z.object({
    nome: z.string().min(2, {
      message: "Nome must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    telefone: z.string().min(10, {
      message: "Telefone must be at least 10 characters.",
    }),
    dataNascimento: z.date(),
    estadoCivil: z.string().optional(),
    nacionalidade: z.string().optional(),
    naturalidade: z.string().optional(),
    genero: z.string().optional(),
    raca: z.string().optional(),
    endereco: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
    cep: z.string().optional(),
  }),
  documentacao: z.object({
    cpf: z.string().optional(),
    rg: z.string().optional(),
    pis: z.string().optional(),
    ctps: z.string().optional(),
    tituloEleitoral: z.string().optional(),
    reservista: z.string().optional(),
    cnh: z.string().optional(),
    anexos: z.array(z.any()).optional(),
  }),
  dadosProfissionais: z.object({
    cargo: z.string().optional(),
    departamento: z.string().optional(),
    salario: z.string().optional(),
    dataAdmissao: z.date(),
    tipoContrato: z.string().optional(),
    cargaHoraria: z.string().optional(),
    gestorImediato: z.string().optional(),
    observacoes: z.string().optional(),
  }),
  dependentes: z.array(
    z.object({
      nome: z.string().optional(),
      dataNascimento: z.date().optional(),
      cpf: z.string().optional(),
      grauParentesco: z.string().optional(),
    })
  ),
  planoSaude: z.object({
    possuiPlano: z.boolean().optional(),
    tipoPlano: z.string().optional(),
    numeroCarteira: z.string().optional(),
    validadeCarteira: z.date().optional(),
  }),
  contatosEmergencia: z.array(
    z.object({
      nome: z.string().optional(),
      telefone: z.string().optional(),
      email: z.string().optional(),
      grauParentesco: z.string().optional(),
    })
  ),
});

const Admissao = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { adicionarColaborador } = useColaboradores();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dadosPessoais: {
        nome: "",
        email: "",
        telefone: "",
        dataNascimento: new Date(),
        estadoCivil: "",
        nacionalidade: "",
        naturalidade: "",
        genero: "",
        raca: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
      },
      documentacao: {
        cpf: "",
        rg: "",
        pis: "",
        ctps: "",
        tituloEleitoral: "",
        reservista: "",
        cnh: "",
        anexos: [],
      },
      dadosProfissionais: {
        cargo: "",
        departamento: "",
        salario: "",
        dataAdmissao: new Date(),
        tipoContrato: "",
        cargaHoraria: "",
        gestorImediato: "",
        observacoes: "",
      },
      dependentes: [],
      planoSaude: {
        possuiPlano: false,
        tipoPlano: "",
        numeroCarteira: "",
        validadeCarteira: new Date(),
      },
      contatosEmergencia: [],
    },
  });

  const [formData, setFormData] = useState(form.getValues());

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
    setFormData(form.getValues());
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Sucesso",
      description: "Formulário submetido com sucesso!",
    });
  };

  const handleSaveColaborador = () => {
    const novoColaborador = {
      nome: formData.dadosPessoais.nome || '',
      email: formData.dadosPessoais.email || '',
      telefone: formData.dadosPessoais.telefone || '',
      cargo: formData.dadosProfissionais.cargo || '',
      departamento: formData.dadosProfissionais.departamento || '',
      dataAdmissao: formData.dadosProfissionais.dataAdmissao || '',
      status: 'Novo' as const,
      documentos: formData.documentacao?.anexos || []
    };

    adicionarColaborador(novoColaborador);
    setIsUserModalOpen(false);
    toast({
      title: "Sucesso",
      description: "Colaborador adicionado com sucesso!",
    });
  };

  return (
    <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleOpenUserModal}>
          Admitir Colaborador
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admissão de Colaborador</DialogTitle>
          <DialogDescription>
            Preencha os dados do colaborador para realizar a admissão.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-lg font-medium">Dados Pessoais</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dadosPessoais.nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome Completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.dataNascimento"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Nascimento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          side="bottom"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.estadoCivil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado Civil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.nacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nacionalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.naturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Naturalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <FormControl>
                        <Input placeholder="Gênero" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.raca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça</FormLabel>
                      <FormControl>
                        <Input placeholder="Raça" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.endereco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.complemento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.bairro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.uf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosPessoais.cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="CEP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Documentação */}
            <div>
              <h3 className="text-lg font-medium">Documentação</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="documentacao.cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.pis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIS</FormLabel>
                      <FormControl>
                        <Input placeholder="PIS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.ctps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTPS</FormLabel>
                      <FormControl>
                        <Input placeholder="CTPS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.tituloEleitoral"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Eleitoral</FormLabel>
                      <FormControl>
                        <Input placeholder="Título Eleitoral" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.reservista"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reservista</FormLabel>
                      <FormControl>
                        <Input placeholder="Reservista" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentacao.cnh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNH</FormLabel>
                      <FormControl>
                        <Input placeholder="CNH" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Dados Profissionais */}
            <div>
              <h3 className="text-lg font-medium">Dados Profissionais</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dadosProfissionais.cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Cargo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Departamento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.salario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salário</FormLabel>
                      <FormControl>
                        <Input placeholder="Salário" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.dataAdmissao"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Admissão</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          side="bottom"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.tipoContrato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contrato</FormLabel>
                      <FormControl>
                        <Input placeholder="Tipo de Contrato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.cargaHoraria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carga Horária</FormLabel>
                      <FormControl>
                        <Input placeholder="Carga Horária" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.gestorImediato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gestor Imediato</FormLabel>
                      <FormControl>
                        <Input placeholder="Gestor Imediato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dadosProfissionais.observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Observações"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Plano de Saúde */}
            <div>
              <h3 className="text-lg font-medium">Plano de Saúde</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="planoSaude.possuiPlano"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Possui Plano de Saúde?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planoSaude.tipoPlano"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Plano</FormLabel>
                      <FormControl>
                        <Input placeholder="Tipo de Plano" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planoSaude.numeroCarteira"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da Carteira</FormLabel>
                      <FormControl>
                        <Input placeholder="Número da Carteira" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planoSaude.validadeCarteira"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Validade da Carteira</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          side="bottom"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={handleCloseUserModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveColaborador}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Admissao;
