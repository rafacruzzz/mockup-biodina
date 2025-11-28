import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditoriaQualidadeForm } from './AuditoriaQualidadeForm';
import { PesquisaSatisfacaoTab } from './PesquisaSatisfacaoTab';
import { RastreabilidadeTab } from './RastreabilidadeTab';
import { QueixaTecnicaTab } from './QueixaTecnicaTab';
import { EmailsTelefonemesTab } from './EmailsTelefonemesTab';
import { IntegracaoSensoresTab } from './IntegracaoSensoresTab';

export const ColetaDadosTab = () => {
  const [subTab, setSubTab] = useState('auditoria');

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="auditoria">Auditoria da Qualidade</TabsTrigger>
          <TabsTrigger value="pesquisa">Pesquisa de Satisfação</TabsTrigger>
          <TabsTrigger value="rastreabilidade">Rastreabilidade</TabsTrigger>
          <TabsTrigger value="queixa-tecnica">Queixa Técnica (Notivisa/ANVISA)</TabsTrigger>
          <TabsTrigger value="emails-telefonemas">E-mails e Telefonemas</TabsTrigger>
          <TabsTrigger value="sensores">Integração Sensores/Máquinas</TabsTrigger>
        </TabsList>

        <TabsContent value="auditoria">
          <AuditoriaQualidadeForm />
        </TabsContent>

        <TabsContent value="pesquisa">
          <PesquisaSatisfacaoTab />
        </TabsContent>

        <TabsContent value="rastreabilidade">
          <RastreabilidadeTab />
        </TabsContent>

        <TabsContent value="queixa-tecnica">
          <QueixaTecnicaTab />
        </TabsContent>

        <TabsContent value="emails-telefonemas">
          <EmailsTelefonemesTab />
        </TabsContent>

        <TabsContent value="sensores">
          <IntegracaoSensoresTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
