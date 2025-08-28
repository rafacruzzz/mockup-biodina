import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, UserPlus, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useColaboradores } from "@/hooks/useColaboradores";
import { ColaboradorData } from "@/types/colaborador";
import { UserData } from "@/types/user";
import UserModal from "@/components/cadastro/UserModal";

interface AdmissaoProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  editMode?: boolean;
  showCredentials?: boolean;
}

const Admissao = ({ isOpen, onClose, userData, editMode = false, showCredentials = false }: AdmissaoProps) => {
  const { toast } = useToast();
  const { adicionarColaborador } = useColaboradores();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ColaboradorData>({
    dadosPessoais: {
      nome: userData?.nome || '',
      cpf: userData?.cpf || '',
      pis: '',
      idade: '',
      dataNascimento: '',
      estadoCivil: '',
      nacionalidade: '',
      genero: '',
      etnia: '',
      rg: '',
      orgaoExpedidorRg: '',
      ufEmissorRg: '',
      dataExpedicaoRg: '',
      naturalidade: '',
      nomeMae: '',
      nomePai: '',
      cep: '',
      endereco: '',
      numeroResidencia: '',
      complemento: '',
      bairro: '',
      pcd: '',
      doencaPreExistente: '',
      email: userData?.email || '',
      telefone: userData?.telefone || '',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: '',
      uf: '',
      setor: '',
      funcao: '',
      cargo: '',
      nivel: '',
      cbo: '',
      compativelFuncao: false,
      funcoesDesempenhadas: '',
      dataAdmissao: '',
      dataCadastro: '',
      tempoCasa: '',
      ultimaPromocao: '',
      previsaoFerias: '',
	  tipoUsuario: '',
	  regimeTrabalho: '',
	  horarioTrabalho: '',
	  cargaHorariaSemanal: '',
	  origemContratacao: ''
    },
    dadosFinanceiros: {
      salarioBase: '',
      adicionalNivel: '',
      insalubridade: '',
      sobreaviso: '',
      salarioBruto: '',
      valorHoraTrabalhada: '',
      pisoSalarial: '',
      mediaSalarial: '',
      dependentesIR: [],
      adiantamentoSalarial: false
    },
    dadosBancarios: {
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    },
    formacaoEscolaridade: {
      escolaridade: '',
      possuiDiploma: false,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: '',
      quantidadeDependentesPlano: '',
      valeTransporte: {
        modalidade: '',
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      planoSaude: {
        operadora: '',
        dataSolicitacao: '',
        vigenciaInicio: '',
        tipoPlano: '',
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: {
      anexos: [],
      exameAdmissional: {
        data: '',
        local: '',
        horario: ''
      }
    },
	dadosTI: {
		servidorAcesso: '',
		permissoesNecessarias: '',
		restricoes: '',
		pastasAcesso: '',
		emailCorporativo: '',
		ramal: ''
	}
  });

  const [anexos, setAnexos] = useState<File[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalData, setModalData] = useState<UserData | null>(null);

  const handleInputChange = (section: keyof ColaboradorData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const colaboradorData = {
        ...formData,
        documentacao: {
          ...formData.documentacao,
          anexos: anexos.map(file => ({
            id: Date.now().toString(),
            nome: file.name,
            tamanho: file.size,
            tipo: file.type,
            dataUpload: new Date().toLocaleDateString(),
            categoria: 'admissao',
            arquivo: file,
            validadeIndeterminada: true
          })),
          observacoesGerais: observacoes
        }
      };

      adicionarColaborador(colaboradorData);

      toast({
        title: "Colaborador Adicionado!",
        description: "O colaborador foi adicionado com sucesso.",
        action: <CheckCircle className="h-4 w-4 text-green-500" />,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Houve um erro ao adicionar o colaborador.",
        action: <AlertTriangle className="h-4 w-4 text-red-500" />,
      });
    }
  };

  const openUserModal = () => {
    setModalData(userData || null);
    setIsUserModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/20">
      <div className="relative m-auto h-fit w-[80%] rounded-lg bg-white p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editMode ? "Editar Admissão" : "Nova Admissão"}
        </h2>
        <p className="text-gray-500 mb-6">Preencha os dados do novo colaborador.</p>

        {/* Progress Indicator */}
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-6">
          <span className={step >= 1 ? "text-blue-600" : ""}>Dados Pessoais</span>
          <span className={step >= 2 ? "text-blue-600" : ""}>Dados Profissionais</span>
          <span className={step >= 3 ? "text-blue-600" : ""}>Documentação</span>
        </div>
        <Separator className="mb-4" />

        {/* Step 1: Dados Pessoais */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  type="text"
                  id="nome"
                  value={formData.dadosPessoais.nome}
                  onChange={(e) => handleInputChange('dadosPessoais', 'nome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  type="text"
                  id="cpf"
                  value={formData.dadosPessoais.cpf}
                  onChange={(e) => handleInputChange('dadosPessoais', 'cpf', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.dadosPessoais.email}
                  onChange={(e) => handleInputChange('dadosPessoais', 'email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  type="tel"
                  id="telefone"
                  value={formData.dadosPessoais.telefone}
                  onChange={(e) => handleInputChange('dadosPessoais', 'telefone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Dados Profissionais */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  type="text"
                  id="cargo"
                  value={formData.dadosProfissionais.cargo}
                  onChange={(e) => handleInputChange('dadosProfissionais', 'cargo', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="setor">Setor</Label>
                <Input
                  type="text"
                  id="setor"
                  value={formData.dadosProfissionais.setor}
                  onChange={(e) => handleInputChange('dadosProfissionais', 'setor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                <Input
                  type="date"
                  id="dataAdmissao"
                  value={formData.dadosProfissionais.dataAdmissao}
                  onChange={(e) => handleInputChange('dadosProfissionais', 'dataAdmissao', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Documentação */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="anexos">Anexos</Label>
                <Input
                  type="file"
                  id="anexos"
                  multiple
                  onChange={(e: any) => setAnexos(Array.from(e.target.files))}
                />
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <div>
            {step > 1 && (
              <Button variant="secondary" onClick={handleBack} className="mr-2">
                Voltar
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext}>Próximo</Button>
            ) : (
              <Button onClick={handleSubmit}>Concluir</Button>
            )}
          </div>
        </div>

        {userData && (
          <div className="absolute top-4 right-4">
            <Button variant="ghost" onClick={openUserModal}>
              <UserPlus className="h-4 w-4 mr-2" />
              Ver Usuário
            </Button>
          </div>
        )}
      </div>

      {modalData && (
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          user={modalData}
        />
      )}
    </div>
  );
};

export default Admissao;
