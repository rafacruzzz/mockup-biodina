
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImportacaoDiretaForm from "@/components/comercial/ImportacaoDiretaForm";

const ImportacaoDireta = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    cliente: "",
    contato: "",
    email: "",
    telefone: "",
    // ... outros campos do formulário
  });

  const handleSave = (data: any) => {
    console.log("Dados da Importação Direta:", data);
    toast({
      title: "Importação Direta salva com sucesso!",
      description: "Os dados foram salvos no sistema.",
    });
    navigate("/comercial");
  };

  const handleCancel = () => {
    navigate("/comercial");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <FileText className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-biodina-blue">Nova Importação Direta</h1>
                <p className="text-gray-600">Cadastre uma nova importação direta no sistema</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button 
              className="bg-biodina-gold hover:bg-biodina-gold/90"
              onClick={() => handleSave(formData)}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Importação Direta
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Card className="w-full">
          <CardContent className="p-6">
            <ImportacaoDiretaForm 
              onSave={handleSave}
              onCancel={handleCancel}
              isModal={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportacaoDireta;
