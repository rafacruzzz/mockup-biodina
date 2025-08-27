
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Edit2, Trash2, RotateCcw } from "lucide-react";
import { useSegmentoLeadManager, SegmentoLead } from "@/hooks/useSegmentoLeadManager";
import { toast } from "sonner";

interface GerenciarSegmentosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GerenciarSegmentosModal = ({ isOpen, onClose }: GerenciarSegmentosModalProps) => {
  const { segmentos, addSegmento, updateSegmento, deleteSegmento, resetToDefault } = useSegmentoLeadManager();
  const [novoSegmento, setNovoSegmento] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [filtro, setFiltro] = useState("");

  const segmentosFiltrados = segmentos.filter(s => 
    s.label.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAdicionar = () => {
    if (!novoSegmento.trim()) {
      toast.error("Digite um nome para o segmento");
      return;
    }

    if (addSegmento(novoSegmento)) {
      toast.success("Segmento adicionado com sucesso!");
      setNovoSegmento("");
    } else {
      toast.error("Este segmento já existe");
    }
  };

  const iniciarEdicao = (segmento: SegmentoLead) => {
    setEditandoId(segmento.id);
    setTextoEdicao(segmento.label);
  };

  const salvarEdicao = () => {
    if (!textoEdicao.trim()) {
      toast.error("Digite um nome para o segmento");
      return;
    }

    if (updateSegmento(editandoId!, textoEdicao)) {
      toast.success("Segmento atualizado com sucesso!");
      setEditandoId(null);
      setTextoEdicao("");
    } else {
      toast.error("Este segmento já existe");
    }
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setTextoEdicao("");
  };

  const handleExcluir = (id: string, label: string) => {
    if (confirm(`Tem certeza que deseja excluir "${label}"?`)) {
      deleteSegmento(id);
      toast.success("Segmento excluído com sucesso!");
    }
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar as opções padrão? Isso irá remover todas as customizações.")) {
      resetToDefault();
      toast.success("Opções restauradas para o padrão!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-biodina-blue">Gerenciar Segmentos do Lead</h2>
            <p className="text-gray-600">Adicione, edite ou remova opções do campo Segmento do Lead</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Adicionar novo segmento */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <Label htmlFor="novo-segmento" className="text-sm font-medium mb-2 block">
              Adicionar Novo Segmento
            </Label>
            <div className="flex gap-2">
              <Input
                id="novo-segmento"
                value={novoSegmento}
                onChange={(e) => setNovoSegmento(e.target.value)}
                placeholder="Ex: PRIVADO - CONSULTÓRIO"
                onKeyPress={(e) => e.key === 'Enter' && handleAdicionar()}
              />
              <Button onClick={handleAdicionar} className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Filtro */}
          <div className="mb-4">
            <Label htmlFor="filtro" className="text-sm font-medium mb-2 block">
              Buscar Segmentos
            </Label>
            <Input
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Digite para filtrar..."
            />
          </div>

          {/* Lista de segmentos */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <span className="font-medium">Segmentos Cadastrados ({segmentosFiltrados.length})</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restaurar Padrão
                </Button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {segmentosFiltrados.map((segmento) => (
                <div key={segmento.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                  {editandoId === segmento.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={textoEdicao}
                        onChange={(e) => setTextoEdicao(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && salvarEdicao()}
                        className="flex-1"
                        autoFocus
                      />
                      <Button size="sm" onClick={salvarEdicao} className="bg-green-600 hover:bg-green-700">
                        Salvar
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelarEdicao}>
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <span className="font-medium">{segmento.label}</span>
                        <div className="text-sm text-gray-500">Value: {segmento.value}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => iniciarEdicao(segmento)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExcluir(segmento.id, segmento.label)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {segmentosFiltrados.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  {filtro ? "Nenhum segmento encontrado com esse filtro" : "Nenhum segmento cadastrado"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GerenciarSegmentosModal;
