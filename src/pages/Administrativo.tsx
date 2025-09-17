import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  Shield, FileCheck, Building2, Scale, CheckCircle2, BookOpen, ArrowLeft
} from "lucide-react";

const Administrativo = () => {
  const [activeModule, setActiveModule] = useState<'main' | 'rt' | 'regulatorio' | 'institucional' | 'juridico' | 'compliance' | 'biblioteca'>('main');

  const renderMainModules = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-biodina-blue mb-2">Módulo Administrativo</h1>
        <p className="text-gray-600">Gestão administrativa e institucional</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Primeira linha */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('rt')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Shield className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">RT</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Responsabilidade Técnica e gestão de profissionais habilitados
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('regulatorio')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <FileCheck className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Regulatório</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão de conformidade regulatória e documentação oficial
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('institucional')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Building2 className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Institucional</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão institucional e relações corporativas
            </p>
          </CardContent>
        </Card>

        {/* Segunda linha */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('juridico')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Scale className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Jurídico</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão jurídica, contratos e assessoria legal
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('compliance')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <CheckCircle2 className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Compliance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Conformidade corporativa e gestão de riscos
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('biblioteca')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <BookOpen className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Biblioteca</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Biblioteca de documentos e gestão do conhecimento
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRTModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Responsabilidade Técnica</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo de Responsabilidade Técnica está em desenvolvimento. 
            Em breve você poderá gerenciar profissionais habilitados, 
            certificações e responsabilidades técnicas.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegulatorioModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Regulatório</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo Regulatório está em desenvolvimento. 
            Em breve você poderá gerenciar conformidade regulatória, 
            documentação oficial e processos de aprovação.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderInstitucionalModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Institucional</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo Institucional está em desenvolvimento. 
            Em breve você poderá gerenciar relações corporativas, 
            comunicação institucional e parcerias estratégicas.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderJuridicoModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Jurídico</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo Jurídico está em desenvolvimento. 
            Em breve você poderá gerenciar contratos, 
            assessoria legal e processos jurídicos.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderComplianceModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Compliance</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo de Compliance está em desenvolvimento. 
            Em breve você poderá gerenciar conformidade corporativa, 
            gestão de riscos e auditoria interna.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderBibliotecaModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Biblioteca</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo de Biblioteca está em desenvolvimento. 
            Em breve você poderá gerenciar documentos, 
            base de conhecimento e recursos educacionais.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'rt':
        return renderRTModule();
      case 'regulatorio':
        return renderRegulatorioModule();
      case 'institucional':
        return renderInstitucionalModule();
      case 'juridico':
        return renderJuridicoModule();
      case 'compliance':
        return renderComplianceModule();
      case 'biblioteca':
        return renderBibliotecaModule();
      default:
        return renderMainModules();
    }
  };

  return (
    <SidebarLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {renderContent()}
      </div>
    </SidebarLayout>
  );
};

export default Administrativo;