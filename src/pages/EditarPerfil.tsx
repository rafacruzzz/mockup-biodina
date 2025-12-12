
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, DollarSign, CreditCard, GraduationCap, Heart, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import SidebarLayout from '@/components/SidebarLayout';
import InformacoesPessoaisTab from '@/components/profile/tabs/InformacoesPessoaisTab';
import DadosProfissionaisReadOnly from '@/components/profile/tabs/DadosProfissionaisReadOnly';
import DadosFinanceirosReadOnly from '@/components/profile/tabs/DadosFinanceirosReadOnly';
import DadosBancariosReadOnly from '@/components/profile/tabs/DadosBancariosReadOnly';
import FormacaoEscolaridadeReadOnly from '@/components/profile/tabs/FormacaoEscolaridadeReadOnly';
import BeneficiosReadOnly from '@/components/profile/tabs/BeneficiosReadOnly';
import DocumentacaoReadOnly from '@/components/profile/tabs/DocumentacaoReadOnly';

const EditarPerfil = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('informacoes-pessoais');

  const handleSave = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!user) {
    return null;
  }

  if (!user.colaboradorData) {
    return (
      <SidebarLayout>
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-biodina-blue">Meu Perfil</h1>
                <p className="text-gray-600">Visualize e edite suas informações pessoais</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Colaborador</CardTitle>
                <CardDescription>
                  Seus dados de colaborador ainda não foram vinculados ao seu usuário.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Entre em contato com o RH para vincular seus dados de colaborador.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-biodina-blue">Meu Perfil</h1>
              <p className="text-gray-600">Visualize e edite suas informações pessoais</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Colaborador</CardTitle>
              <CardDescription>
                Visualize todos os seus dados cadastrais. Apenas informações pessoais básicas podem ser editadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                  <TabsTrigger value="informacoes-pessoais" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Informações Pessoais</span>
                    <span className="sm:hidden">Pessoais</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-profissionais" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Dados Profissionais</span>
                    <span className="sm:hidden">Profissionais</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-financeiros" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Dados Financeiros</span>
                    <span className="sm:hidden">Financeiros</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-bancarios" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Dados Bancários</span>
                    <span className="sm:hidden">Bancários</span>
                  </TabsTrigger>
                  <TabsTrigger value="formacao" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Formação</span>
                    <span className="sm:hidden">Formação</span>
                  </TabsTrigger>
                  <TabsTrigger value="beneficios" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Benefícios</span>
                    <span className="sm:hidden">Benefícios</span>
                  </TabsTrigger>
                  <TabsTrigger value="documentacao" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Documentação</span>
                    <span className="sm:hidden">Docs</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes-pessoais" className="mt-6">
                  <InformacoesPessoaisTab onSave={handleSave} onCancel={handleCancel} />
                </TabsContent>

                <TabsContent value="dados-profissionais" className="mt-6">
                  <DadosProfissionaisReadOnly data={user.colaboradorData.dadosProfissionais} />
                </TabsContent>

                <TabsContent value="dados-financeiros" className="mt-6">
                  <DadosFinanceirosReadOnly data={user.colaboradorData.dadosFinanceiros} />
                </TabsContent>

                <TabsContent value="dados-bancarios" className="mt-6">
                  <DadosBancariosReadOnly data={user.colaboradorData.dadosBancarios} />
                </TabsContent>

                <TabsContent value="formacao" className="mt-6">
                  <FormacaoEscolaridadeReadOnly data={user.colaboradorData.formacaoEscolaridade} />
                </TabsContent>

                <TabsContent value="beneficios" className="mt-6">
                  <BeneficiosReadOnly data={user.colaboradorData.beneficios} />
                </TabsContent>

                <TabsContent value="documentacao" className="mt-6">
                  <DocumentacaoReadOnly data={user.colaboradorData.documentacao} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default EditarPerfil;
