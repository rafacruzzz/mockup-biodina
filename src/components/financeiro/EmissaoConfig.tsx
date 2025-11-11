import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface CertificadoData {
  serialCertificado: string;
  inicio: string;
  expiracao: string;
  idctx: string;
}

const EmissaoConfig = () => {
  const [ambiente, setAmbiente] = useState<"homologacao" | "producao" | null>(null);
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setNomeArquivo(file.name);

    // Simular processamento e carregar dados do certificado
    setTimeout(() => {
      const dadosSimulados: CertificadoData = {
        serialCertificado: "5A:3B:7C:9D:2E:1F:4A:8B:6C:0D",
        inicio: new Date().toLocaleDateString("pt-BR"),
        expiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR"),
        idctx: "CTX-" + Math.random().toString(36).substring(2, 15).toUpperCase()
      };
      
      setCertificadoData(dadosSimulados);
      toast.success("Certificado carregado com sucesso!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-biodina-blue">Emissão de Nota Fiscal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Botão de Upload */}
          <div className="space-y-4">
            <Label htmlFor="certificado" className="text-base font-semibold">
              Certificado Digital
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="certificado"
                type="file"
                accept=".pfx,.p12"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => document.getElementById("certificado")?.click()}
                className="bg-biodina-blue hover:bg-biodina-blue/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Enviar certificado
              </Button>
              {nomeArquivo && (
                <span className="text-sm text-muted-foreground">
                  {nomeArquivo}
                </span>
              )}
            </div>
          </div>

          {/* Seleção de Ambiente */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Ambiente de Emissão</Label>
            <div className="flex gap-4">
              <Button
                variant={ambiente === "homologacao" ? "default" : "outline"}
                onClick={() => setAmbiente("homologacao")}
                className={
                  ambiente === "homologacao"
                    ? "bg-biodina-blue hover:bg-biodina-blue/90"
                    : ""
                }
              >
                Homologação
              </Button>
              <Button
                variant={ambiente === "producao" ? "default" : "outline"}
                onClick={() => setAmbiente("producao")}
                className={
                  ambiente === "producao"
                    ? "bg-biodina-blue hover:bg-biodina-blue/90"
                    : ""
                }
              >
                Produção
              </Button>
            </div>
          </div>

          {/* Dados do Certificado */}
          {certificadoData && (
            <Card className="bg-muted/50 border-biodina-blue/20">
              <CardHeader>
                <CardTitle className="text-lg">Dados do Certificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Serial Certificado:
                    </Label>
                    <p className="text-sm font-mono mt-1">
                      {certificadoData.serialCertificado}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Início:
                    </Label>
                    <p className="text-sm mt-1">{certificadoData.inicio}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Expiração:
                    </Label>
                    <p className="text-sm mt-1">{certificadoData.expiracao}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      IDCTX:
                    </Label>
                    <p className="text-sm font-mono mt-1">{certificadoData.idctx}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmissaoConfig;
