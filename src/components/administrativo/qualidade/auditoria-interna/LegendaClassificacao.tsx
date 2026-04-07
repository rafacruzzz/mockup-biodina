import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Info, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LegendaClassificacao = () => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-4">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-2 border-t">
        <Info className="h-4 w-4" />
        <span>Legenda e Classificação dos Itens</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 pb-2 px-4 space-y-4 animate-in slide-in-from-top-2">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">Legenda</h4>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-medium">
              OM — Oportunidade de Melhoria
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-800 font-medium">
              NC — Não Conforme
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-800 font-medium">
              C — Conforme
            </span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">Classificação dos Itens do Guia de Inspeção</h4>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-red-200 text-red-900 font-medium">
              IM — Imprescindível
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 font-medium">
              N — Necessário
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 font-medium">
              R — Recomendável
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              I — Informativo
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 font-medium">
              NC — Não Corresponde
            </span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
