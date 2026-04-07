import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditoriaQualidadeForm } from './AuditoriaQualidadeForm';
import { PesquisaSatisfacaoTab } from './PesquisaSatisfacaoTab';
import { RastreabilidadeTab } from './RastreabilidadeTab';
import { QueixaTecnicaTab } from './QueixaTecnicaTab';
import { ReclamacaoClientesTab } from './ReclamacaoClientesTab';
import { IntegracaoSensoresTab } from './IntegracaoSensoresTab';
import { AuditoriaInternaTab } from './auditoria-interna/AuditoriaInternaTab';

export const ColetaDadosTab = () => {
  const [subTab, setSubTab] = useState('auditoria-externa');

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="auditoria-externa">Auditoria - Externa</TabsTrigger>
          <TabsTrigger value="auditoria-interna">Auditoria - Interna</TabsTrigger>
          <TabsTrigger value="pesquisa">Pesquisa de Satisfação</TabsTrigger>
          <TabsTrigger value="rastreabilidade">Rastreabilidade</TabsTrigger>
          <TabsTrigger value="queixa-tecnica">Queixa Técnica (Notivisa/ANVISA)</TabsTrigger>
          <TabsTrigger value="reclamacao-clientes">Reclamação de Clientes</TabsTrigger>
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

        <TabsContent value="reclamacao-clientes">
          <ReclamacaoClientesTab />
        </TabsContent>

        <TabsContent value="sensores">
          <IntegracaoSensoresTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
