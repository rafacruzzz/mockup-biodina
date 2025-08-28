
import { useState } from 'react';
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import UsersTable from "@/components/rh/UsersTable";
import ProcessosSeletivosTable from "@/components/rh/ProcessosSeletivosTable";

import NovoProcessoModal from "@/components/rh/NovoProcessoModal";

const RH = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovoProcessoModalOpen, setIsNovoProcessoModalOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recursos Humanos</h1>
          <p className="text-gray-600">Gerencie usuários e processos seletivos</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="processos-seletivos">Processos Seletivos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usuarios" className="mt-4">
          <UsersTable searchTerm={searchTerm} />
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
      </Tabs>

      <NovoProcessoModal
        isOpen={isNovoProcessoModalOpen}
        onClose={() => setIsNovoProcessoModalOpen(false)}
      />
    </div>
  );
};

export default RH;
