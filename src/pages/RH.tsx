import { useState } from 'react';
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import ColaboradoresTable from "@/components/rh/ColaboradoresTable";
import ProcessosSeletivosTable from "@/components/rh/ProcessosSeletivosTable";
import DepartamentosTable from "@/components/rh/DepartamentosTable";
import CargosTable from "@/components/rh/CargosTable";
import ExpedientesTable from "@/components/rh/ExpedientesTable";
import PlanosCarreiraTable from "@/components/rh/PlanosCarreiraTable";

import NovoProcessoModal from "@/components/rh/NovoProcessoModal";
import DepartamentoModal from "@/components/rh/DepartamentoModal";
import CargoModal from "@/components/rh/CargoModal";
import ExpedienteModal from "@/components/rh/ExpedienteModal";
import PlanoCarreiraModal from "@/components/rh/PlanoCarreiraModal";

import { ContentHeader } from "@/components/ui/ContentHeader";

const RH = () => {
  const [activeTab, setActiveTab] = useState('colaboradores');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovoProcessoModalOpen, setIsNovoProcessoModalOpen] = useState(false);
  const [isDepartamentoModalOpen, setIsDepartamentoModalOpen] = useState(false);
  const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);
  const [isExpedienteModalOpen, setIsExpedienteModalOpen] = useState(false);
  const [isPlanoCarreiraModalOpen, setIsPlanoCarreiraModalOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8">
      <Tabs defaultValue="colaboradores" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
          <TabsTrigger value="processos-seletivos">Processos Seletivos</TabsTrigger>
          <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
          <TabsTrigger value="cargos">Cargos</TabsTrigger>
          <TabsTrigger value="expedientes">Expedientes</TabsTrigger>
          <TabsTrigger value="planos-carreira">Planos de Carreira</TabsTrigger>
        </TabsList>
        <TabsContent value="colaboradores" className="mt-4">
          <ColaboradoresTable searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="processos-seletivos" className="mt-4">
          <div className="space-y-6">
            <ProcessosSeletivosTable 
              onViewProcess={(processId) => {
                console.log('Viewing process:', processId);
                // TODO: Implement view process logic
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="departamentos" className="mt-4">
          <DepartamentosTable searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="cargos" className="mt-4">
          <CargosTable searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="expedientes" className="mt-4">
          <ExpedientesTable searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="planos-carreira" className="mt-4">
          <PlanosCarreiraTable searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>

      <NovoProcessoModal
        isOpen={isNovoProcessoModalOpen}
        onClose={() => setIsNovoProcessoModalOpen(false)}
      />

      <DepartamentoModal
        isOpen={isDepartamentoModalOpen}
        onClose={() => setIsDepartamentoModalOpen(false)}
      />

      <CargoModal
        isOpen={isCargoModalOpen}
        onClose={() => setIsCargoModalOpen(false)}
      />

      <ExpedienteModal
        isOpen={isExpedienteModalOpen}
        onClose={() => setIsExpedienteModalOpen(false)}
      />

      <PlanoCarreiraModal
        isOpen={isPlanoCarreiraModalOpen}
        onClose={() => setIsPlanoCarreiraModalOpen(false)}
      />

      <ContentHeader
        title="Recursos Humanos"
        description="Gerencie colaboradores, processos seletivos e recursos humanos"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNewRecord={() => {
          if (activeTab === 'processos-seletivos') {
            setIsNovoProcessoModalOpen(true);
          } else if (activeTab === 'departamentos') {
            setIsDepartamentoModalOpen(true);
          } else if (activeTab === 'cargos') {
            setIsCargoModalOpen(true);
          } else if (activeTab === 'expedientes') {
            setIsExpedienteModalOpen(true);
          } else if (activeTab === 'planos-carreira') {
            setIsPlanoCarreiraModalOpen(true);
          }
        }}
      />
    </div>
  );
};

export default RH;
