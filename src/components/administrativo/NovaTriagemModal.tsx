import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Save, CheckCircle2 } from "lucide-react";
import { RecebimentoPropostaStep } from "./components/RecebimentoPropostaStep";
import { ChecklistDocumentalStep } from "./components/ChecklistDocumentalStep";
import { AnaliseCientificaStep } from "./components/AnaliseCientificaStep";
import { AnaliseCustosRegulatóriosStep } from "./components/AnaliseCustosRegulatóriosStep";
import { AnaliseComercialStep } from "./components/AnaliseComercialStep";
import { AnaliseLogisticaStep } from "./components/AnaliseLogisticaStep";
import { ParecerRegulatórioStep } from "./components/ParecerRegulatórioStep";
import { AnaliseFinanceiraStep } from "./components/AnaliseFinanceiraStep";
import { ReuniãoDiretoriaStep } from "./components/ReuniãoDiretoriaStep";
import { toast } from "@/components/ui/use-toast";

interface NovaTriagemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingData?: any;
}

export const NovaTriagemModal = ({ open, onOpenChange, editingData }: NovaTriagemModalProps) => {
  const [activeTab, setActiveTab] = useState("triagem-inicial");
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({});

  const masterTabs = [
    { id: "triagem-inicial", label: "Triagem Inicial", steps: [1, 2] },
    { id: "analise-detalhada", label: "Análise Detalhada", steps: [3, 4, 5, 6, 7, 8, 9] }
  ];

  const steps = [
    { id: 1, title: "Recebimento da Proposta", masterTab: "triagem-inicial" },
    { id: 2, title: "Checklist Documental", masterTab: "triagem-inicial" },
    { id: 3, title: "Análise Científica", masterTab: "analise-detalhada" },
    { id: 4, title: "Análise Custos Regulatórios", masterTab: "analise-detalhada" },
    { id: 5, title: "Análise Comercial", masterTab: "analise-detalhada" },
    { id: 6, title: "Análise Logística", masterTab: "analise-detalhada" },
    { id: 7, title: "Parecer Regulatório Final", masterTab: "analise-detalhada" },
    { id: 8, title: "Análise Financeira", masterTab: "analise-detalhada" },
    { id: 9, title: "Reunião da Diretoria", masterTab: "analise-detalhada" }
  ];

  const currentStep = steps.find(step => step.id === activeStep);
  const currentMasterTab = masterTabs.find(tab => tab.id === currentStep?.masterTab);

  const handleStepChange = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      setActiveStep(stepId);
      setActiveTab(step.masterTab);
    }
  };

  const handleNext = () => {
    if (activeStep < 9) {
      handleStepChange(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      handleStepChange(activeStep - 1);
    }
  };

  const handleSave = () => {
    toast({
      title: "Dados salvos",
      description: "Os dados da triagem foram salvos com sucesso.",
    });
  };

  const getStepComponent = () => {
    switch (activeStep) {
      case 1: return <RecebimentoPropostaStep data={formData} onChange={setFormData} />;
      case 2: return <ChecklistDocumentalStep data={formData} onChange={setFormData} />;
      case 3: return <AnaliseCientificaStep data={formData} onChange={setFormData} />;
      case 4: return <AnaliseCustosRegulatóriosStep data={formData} onChange={setFormData} />;
      case 5: return <AnaliseComercialStep data={formData} onChange={setFormData} />;
      case 6: return <AnaliseLogisticaStep data={formData} onChange={setFormData} />;
      case 7: return <ParecerRegulatórioStep data={formData} onChange={setFormData} />;
      case 8: return <AnaliseFinanceiraStep data={formData} onChange={setFormData} />;
      case 9: return <ReuniãoDiretoriaStep data={formData} onChange={setFormData} />;
      default: return <RecebimentoPropostaStep data={formData} onChange={setFormData} />;
    }
  };

  const progressPercentage = (activeStep / 9) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{editingData ? "Editar Triagem" : "Nova Triagem Due Diligence"}</span>
            <Badge variant="outline" className="ml-2">
              Etapa {activeStep} de 9
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso da Triagem</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>

          {/* Master Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              {masterTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  {tab.steps.every(stepId => stepId < activeStep) && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="triagem-inicial" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {masterTabs[0].steps.map((stepId) => (
                  <Button
                    key={stepId}
                    variant={stepId === activeStep ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStepChange(stepId)}
                    className="flex items-center gap-2"
                  >
                    {stepId < activeStep && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {steps.find(s => s.id === stepId)?.title}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analise-detalhada" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {masterTabs[1].steps.map((stepId) => (
                  <Button
                    key={stepId}
                    variant={stepId === activeStep ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStepChange(stepId)}
                    className="flex items-center gap-2"
                  >
                    {stepId < activeStep && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {steps.find(s => s.id === stepId)?.title}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Step Content */}
          <div className="min-h-[400px] max-h-[500px] overflow-y-auto border rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{currentStep?.title}</h3>
              <div className="h-px bg-border mt-2" />
            </div>
            {getStepComponent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Salvar
              </Button>

              <Button
                onClick={handleNext}
                disabled={activeStep === 9}
                className="flex items-center gap-2"
              >
                Avançar
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};