import { useState } from "react";
import { OrganizacaoDocumentos } from "../rt/OrganizacaoDocumentos";
import { PastaRT } from "@/types/rt";

const estruturaInicial = {
  manuais: {
    nomeArquivo: "Manual de Gestão da Qualidade - Revisão 5.0",
    pastas: [
      {
        id: "pasta-manual-1",
        nome: "Política da Qualidade",
        subtitulo: "Documentos de política e diretrizes",
        arquivos: [],
        subPastas: [],
        expandido: false
      },
      {
        id: "pasta-manual-2",
        nome: "Organograma e Responsabilidades",
        subtitulo: "Estrutura organizacional",
        arquivos: [],
        subPastas: [],
        expandido: false
      }
    ] as PastaRT[]
  },
  pop: {
    nomeArquivo: "POP - Controle de Temperatura da Câmara Fria",
    pastas: [
      {
        id: "pasta-pop-1",
        nome: "Recebimento",
        subtitulo: "Procedimentos de entrada de materiais",
        arquivos: [],
        subPastas: [],
        expandido: false
      },
      {
        id: "pasta-pop-2",
        nome: "Armazenamento",
        subtitulo: "Controles de estoque e temperatura",
        arquivos: [],
        subPastas: [],
        expandido: false
      }
    ] as PastaRT[]
  },
  instrucoesTrabalho: {
    nomeArquivo: "IT - Inspeção de Recebimento de Matéria-Prima",
    pastas: [
      {
        id: "pasta-it-1",
        nome: "Inspeção Visual",
        subtitulo: "Critérios de aceitação visual",
        arquivos: [],
        subPastas: [],
        expandido: false
      },
      {
        id: "pasta-it-2",
        nome: "Testes Físico-Químicos",
        subtitulo: "Procedimentos de análise",
        arquivos: [],
        subPastas: [],
        expandido: false
      }
    ] as PastaRT[]
  }
};

export const EstruturaEPadroesTab = () => {
  const [manuaisNome, setManuaisNome] = useState(estruturaInicial.manuais.nomeArquivo);
  const [manuaisPastas, setManuaisPastas] = useState(estruturaInicial.manuais.pastas);

  const [popNome, setPopNome] = useState(estruturaInicial.pop.nomeArquivo);
  const [popPastas, setPopPastas] = useState(estruturaInicial.pop.pastas);

  const [itNome, setItNome] = useState(estruturaInicial.instrucoesTrabalho.nomeArquivo);
  const [itPastas, setItPastas] = useState(estruturaInicial.instrucoesTrabalho.pastas);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Estrutura e Padrões</h2>
        <p className="text-muted-foreground">
          Organização e acesso aos documentos de qualidade
        </p>
      </div>

      {/* Seção 1: Manuais da Qualidade */}
      <OrganizacaoDocumentos
        titulo="Manuais da Qualidade"
        nomeArquivoPrincipal={manuaisNome}
        onNomeArquivoChange={setManuaisNome}
        estruturaPastas={manuaisPastas}
        onEstruturaChange={setManuaisPastas}
      />

      {/* Seção 2: POP (Procedimentos Operacionais Padrão) */}
      <OrganizacaoDocumentos
        titulo="POP - Procedimentos Operacionais Padrão"
        nomeArquivoPrincipal={popNome}
        onNomeArquivoChange={setPopNome}
        estruturaPastas={popPastas}
        onEstruturaChange={setPopPastas}
      />

      {/* Seção 3: Instruções de Trabalho */}
      <OrganizacaoDocumentos
        titulo="Instruções de Trabalho"
        nomeArquivoPrincipal={itNome}
        onNomeArquivoChange={setItNome}
        estruturaPastas={itPastas}
        onEstruturaChange={setItPastas}
      />
    </div>
  );
};
