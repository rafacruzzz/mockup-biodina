import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { OrganizacaoDocumentos } from "./OrganizacaoDocumentos";
import { PastaRT } from "@/types/rt";

export const DocumentosRTTab = () => {
  const [pastasResponsavelLegal, setPastasResponsavelLegal] = useState<PastaRT[]>([]);
  const [pastasRTProdutos, setPastasRTProdutos] = useState<PastaRT[]>([]);
  const [pastasRTObras, setPastasRTObras] = useState<PastaRT[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Documentos do Responsável Legal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizacaoDocumentos
            titulo=""
            estruturaPastas={pastasResponsavelLegal}
            onEstruturaChange={setPastasResponsavelLegal}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Documentos do Responsável Técnico de Produtos e Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizacaoDocumentos
            titulo=""
            estruturaPastas={pastasRTProdutos}
            onEstruturaChange={setPastasRTProdutos}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Documentos do Responsável Técnico de Obras e Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizacaoDocumentos
            titulo=""
            estruturaPastas={pastasRTObras}
            onEstruturaChange={setPastasRTObras}
          />
        </CardContent>
      </Card>
    </div>
  );
};
