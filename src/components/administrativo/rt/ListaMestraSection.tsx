import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, X, Search, Info } from "lucide-react";
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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItens = searchTerm
    ? listaMestra.itens.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : listaMestra.itens;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Lista Mestra</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar na Lista Mestra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
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
          {filteredItens.map((item) => (
            <div key={item.id}>
              <OrganizacaoDocumentos
                titulo={item.titulo}
                estruturaPastas={item.estruturaPastas}
                onEstruturaChange={(pastas) => handleItemEstruturaChange(item.id, pastas)}
                searchTerm={searchTerm}
              />
            </div>
          ))}
          {filteredItens.length === 0 && searchTerm && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum item encontrado para "{searchTerm}"
            </div>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <p className="text-xs text-amber-700 flex items-center gap-1">
            <Info className="h-3 w-3" />
            <strong>Origem dos dados:</strong> Os itens LTCAT, PCMSO e PGR são alimentados pelo módulo RH.
          </p>
        </div>
      </div>
    </div>
  );
};