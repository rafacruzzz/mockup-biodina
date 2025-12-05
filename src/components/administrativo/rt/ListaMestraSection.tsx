import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, X } from "lucide-react";
import { ListaMestra, ArquivoRT, PastaRT } from "@/types/rt";
import { OrganizacaoDocumentos } from "./OrganizacaoDocumentos";
import { toast } from "@/components/ui/use-toast";

interface ListaMestraSectionProps {
  listaMestra: ListaMestra;
  onListaMestraChange: (listaMestra: ListaMestra) => void;
}

export const ListaMestraSection = ({
  listaMestra,
  onListaMestraChange
}: ListaMestraSectionProps) => {

  const handleArquivoGeralUpload = () => {
    // Simulação de upload
    const novoArquivo: ArquivoRT = {
      id: `arq-geral-${Date.now()}`,
      nome: "Lista_Mestra_Principal.pdf",
      tipo: "application/pdf",
      tamanho: 1024000,
      dataUpload: new Date().toISOString().split('T')[0]
    };
    
    onListaMestraChange({
      ...listaMestra,
      arquivoGeral: novoArquivo
    });
    
    toast({
      title: "Arquivo anexado",
      description: "Arquivo da Lista Mestra anexado com sucesso"
    });
  };

  const removerArquivoGeral = () => {
    onListaMestraChange({
      ...listaMestra,
      arquivoGeral: undefined
    });
    toast({
      title: "Arquivo removido",
      description: "Arquivo da Lista Mestra removido"
    });
  };

  const handleItemEstruturaChange = (itemId: string, novaEstrutura: PastaRT[]) => {
    onListaMestraChange({
      ...listaMestra,
      itens: listaMestra.itens.map(item =>
        item.id === itemId ? { ...item, estruturaPastas: novaEstrutura } : item
      )
    });
  };

  const handleItemCodigoChange = (itemId: string, codigo: string) => {
    onListaMestraChange({
      ...listaMestra,
      itens: listaMestra.itens.map(item =>
        item.id === itemId ? { ...item, codigo } : item
      )
    });
  };

  const handleItemDataChange = (itemId: string, data: string) => {
    onListaMestraChange({
      ...listaMestra,
      itens: listaMestra.itens.map(item =>
        item.id === itemId ? { ...item, data } : item
      )
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Lista Mestra</h2>
        
        {/* Arquivo Geral da Lista Mestra */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Arquivo da Lista Mestra</span>
              </div>
              
              {listaMestra.arquivoGeral ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <span className="font-medium">{listaMestra.arquivoGeral.nome}</span>
                    <span className="text-muted-foreground ml-2">
                      ({(listaMestra.arquivoGeral.tamanho / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removerArquivoGeral}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArquivoGeralUpload}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Anexar Arquivo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Itens da Lista Mestra */}
        <div className="space-y-6">
          {listaMestra.itens.map((item) => (
            <div key={item.id}>
              <OrganizacaoDocumentos
                titulo={item.titulo}
                estruturaPastas={item.estruturaPastas}
                onEstruturaChange={(pastas) => handleItemEstruturaChange(item.id, pastas)}
              />
              
              {/* Campos Código e Data abaixo do card */}
              <Card className="mt-2 border-t-0 rounded-t-none">
                <CardContent className="py-3">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`codigo-${item.id}`} className="text-sm font-medium whitespace-nowrap">
                        Código:
                      </Label>
                      <Input
                        id={`codigo-${item.id}`}
                        value={item.codigo || ""}
                        onChange={(e) => handleItemCodigoChange(item.id, e.target.value)}
                        placeholder="Ex: DOC-001"
                        className="w-40 h-8"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`data-${item.id}`} className="text-sm font-medium whitespace-nowrap">
                        Data:
                      </Label>
                      <Input
                        id={`data-${item.id}`}
                        type="date"
                        value={item.data || ""}
                        onChange={(e) => handleItemDataChange(item.id, e.target.value)}
                        className="w-40 h-8"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};