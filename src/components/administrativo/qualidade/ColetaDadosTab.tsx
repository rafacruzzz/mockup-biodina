import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditoriaQualidadeForm } from './AuditoriaQualidadeForm';
import { PesquisaSatisfacaoTab } from './PesquisaSatisfacaoTab';
import { RastreabilidadeTab } from './RastreabilidadeTab';

export const ColetaDadosTab = () => {
  const [subTab, setSubTab] = useState('auditoria');

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auditoria">Auditoria da Qualidade</TabsTrigger>
          <TabsTrigger value="pesquisa">Pesquisa de Satisfação</TabsTrigger>
          <TabsTrigger value="rastreabilidade">Rastreabilidade</TabsTrigger>
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
      </Tabs>
    </div>
  );
};
