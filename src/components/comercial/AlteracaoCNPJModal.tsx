import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Lock, 
  Upload, 
  FileText, 
  Building2, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMasterValidation } from '@/hooks/useMasterValidation';
import { AditivoContratual } from '@/types/licitacao';

interface AlteracaoCNPJModalProps {
  isOpen: boolean;
  onClose: () => void;
  contratoData: {
    id: string;
    numero: string;
    empresaAtualNome: string;
    empresaAtualCNPJ: string;
  };
  onConfirmar: (aditivo: AditivoContratual) => void;
}

// Mock de empresas disponíveis
const empresasDisponiveis = [
  { id: 'master-001', nome: 'iMuv Tecnologia LTDA', cnpj: '12.345.678/0001-00' },
  { id: 'filial-sp-001', nome: 'iMuv Tecnologia - Filial SP', cnpj: '12.345.678/0002-81' },
  { id: 'filial-rj-001', nome: 'iMuv Tecnologia - Filial RJ', cnpj: '12.345.678/0003-62' },
  { id: 'filial-mg-001', nome: 'iMuv Tecnologia - Filial MG', cnpj: '12.345.678/0004-43' },
];

type Step = 'password' | 'empresa' | 'upload' | 'justificativa' | 'confirmacao';

export default function AlteracaoCNPJModal({
  isOpen,
  onClose,
  contratoData,
  onConfirmar
}: AlteracaoCNPJModalProps) {
  const { toast } = useToast();
  const { validateMasterPassword, attemptsRemaining, isBlocked, isValidating } = useMasterValidation();
  
  const [currentStep, setCurrentStep] = useState<Step>('password');
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  
  const [novaEmpresaId, setNovaEmpresaId] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [justificativa, setJustificativa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: { key: Step; label: string; number: number }[] = [
    { key: 'password', label: 'Senha Master', number: 1 },
    { key: 'empresa', label: 'Nova Empresa', number: 2 },
    { key: 'upload', label: 'Aditivo', number: 3 },
    { key: 'justificativa', label: 'Justificativa', number: 4 },
    { key: 'confirmacao', label: 'Confirmação', number: 5 },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const novaEmpresa = empresasDisponiveis.find(e => e.id === novaEmpresaId);

  const handleValidatePassword = async () => {
    const isValid = await validateMasterPassword(masterPassword);
    if (isValid) {
      setPasswordValidated(true);
      setCurrentStep('empresa');
      toast({
        title: "Senha validada",
        description: "Acesso autorizado. Continue com a alteração.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PDF.",
          variant: "destructive"
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive"
        });
        return;
      }
      setArquivo(file);
    }
  };

  const handleConfirmar = async () => {
    if (justificativa.length < 50) {
      toast({
        title: "Justificativa insuficiente",
        description: "A justificativa deve ter no mínimo 50 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simula upload e processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aditivo: AditivoContratual = {
      id: `ADIT-${Date.now()}`,
      tipo: 'alteracao_cnpj',
      cnpjAnterior: contratoData.empresaAtualCNPJ,
      cnpjNovo: novaEmpresa?.cnpj || '',
      justificativa,
      arquivoUrl: arquivo ? URL.createObjectURL(arquivo) : '',
      alteradoPor: 'Usuário Master', // Em produção viria do contexto
      alteradoEm: new Date().toISOString(),
      validadoPorMaster: true,
      senhaMasterValidada: true
    };

    onConfirmar(aditivo);
    
    toast({
      title: "CNPJ alterado com sucesso",
      description: "O aditivo foi registrado e a alteração foi efetuada.",
    });

    // Reset estados
    setCurrentStep('password');
    setMasterPassword('');
    setPasswordValidated(false);
    setNovaEmpresaId('');
    setArquivo(null);
    setJustificativa('');
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setCurrentStep('password');
    setMasterPassword('');
    setPasswordValidated(false);
    setNovaEmpresaId('');
    setArquivo(null);
    setJustificativa('');
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'password': return passwordValidated;
      case 'empresa': return !!novaEmpresaId && novaEmpresaId !== contratoData.empresaAtualCNPJ;
      case 'upload': return !!arquivo;
      case 'justificativa': return justificativa.length >= 50;
      default: return true;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0 && steps[prevIndex].key !== 'password') {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-600" />
            Alteração de CNPJ - Contrato {contratoData.numero}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span 
                key={step.key}
                className={index <= currentStepIndex ? 'text-primary font-medium' : ''}
              >
                {step.number}. {step.label}
              </span>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Separator />

        <div className="min-h-[300px]">
          {/* Step 1: Senha Master */}
          {currentStep === 'password' && (
            <div className="space-y-4">
              <div className="text-center space-y-2 mb-6">
                <Lock className="h-12 w-12 mx-auto text-red-600" />
                <h3 className="text-lg font-semibold">Validação de Segurança</h3>
                <p className="text-sm text-muted-foreground">
                  Insira a senha master para autorizar a alteração de CNPJ
                </p>
              </div>

              {isBlocked ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="font-medium text-red-800">Acesso Bloqueado</p>
                  <p className="text-sm text-red-600">
                    Número máximo de tentativas excedido. Tente novamente mais tarde.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="masterPassword">Senha Master</Label>
                    <div className="relative">
                      <Input
                        id="masterPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                        placeholder="Digite a senha master"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tentativas restantes: {attemptsRemaining}
                    </p>
                  </div>

                  <Button 
                    onClick={handleValidatePassword}
                    disabled={!masterPassword || isValidating}
                    className="w-full"
                  >
                    {isValidating ? 'Validando...' : 'Validar Senha'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Seleção de Nova Empresa */}
          {currentStep === 'empresa' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecione a Nova Empresa</h3>

              {/* Empresa Atual */}
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-red-800">CNPJ Atual (será substituído)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{contratoData.empresaAtualNome}</p>
                  <p className="text-sm text-muted-foreground">{contratoData.empresaAtualCNPJ}</p>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              {/* Nova Empresa */}
              <div className="space-y-2">
                <Label>Nova Empresa</Label>
                <Select value={novaEmpresaId} onValueChange={setNovaEmpresaId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a nova empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresasDisponiveis
                      .filter(e => e.cnpj !== contratoData.empresaAtualCNPJ)
                      .map((empresa) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                          <div>
                            <span className="font-medium">{empresa.nome}</span>
                            <span className="text-xs text-muted-foreground ml-2">{empresa.cnpj}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {novaEmpresa && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-800">Novo CNPJ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{novaEmpresa.nome}</p>
                    <p className="text-sm text-muted-foreground">{novaEmpresa.cnpj}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Upload do Aditivo */}
          {currentStep === 'upload' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload do Aditivo Contratual</h3>
              <p className="text-sm text-muted-foreground">
                É obrigatório anexar o aditivo contratual que autoriza a alteração do CNPJ.
              </p>

              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                {arquivo ? (
                  <div className="space-y-2">
                    <FileText className="h-12 w-12 mx-auto text-green-600" />
                    <p className="font-medium">{arquivo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setArquivo(null)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Arraste o arquivo aqui ou clique para selecionar</p>
                      <p className="text-sm text-muted-foreground">Apenas PDF, máximo 10MB</p>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Justificativa */}
          {currentStep === 'justificativa' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Justificativa da Alteração</h3>
              <p className="text-sm text-muted-foreground">
                Descreva o motivo da alteração de CNPJ. Mínimo de 50 caracteres.
              </p>

              <Textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Descreva detalhadamente o motivo da alteração de CNPJ no contrato..."
                rows={6}
              />
              <p className={`text-xs ${justificativa.length >= 50 ? 'text-green-600' : 'text-muted-foreground'}`}>
                {justificativa.length}/50 caracteres (mínimo)
              </p>
            </div>
          )}

          {/* Step 5: Confirmação */}
          {currentStep === 'confirmacao' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-2" />
                <h3 className="text-lg font-semibold">Confirmar Alteração</h3>
              </div>

              <Card>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contrato:</span>
                    <span className="font-medium">{contratoData.numero}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CNPJ Anterior:</span>
                    <span className="text-red-600">{contratoData.empresaAtualCNPJ}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Novo CNPJ:</span>
                    <span className="text-green-600 font-medium">{novaEmpresa?.cnpj}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aditivo:</span>
                    <span>{arquivo?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Justificativa:</span>
                    <p className="mt-1 bg-muted/50 p-2 rounded text-sm">{justificativa}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Esta ação será registrada para auditoria e não pode ser desfeita sem um novo aditivo.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {currentStep !== 'password' && currentStep !== 'empresa' && (
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            {currentStep === 'confirmacao' ? (
              <Button onClick={handleConfirmar} disabled={isSubmitting}>
                {isSubmitting ? 'Processando...' : 'Confirmar Alteração'}
              </Button>
            ) : currentStep !== 'password' ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Próximo
              </Button>
            ) : null}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
