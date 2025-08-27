
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  RotateCcw, 
  Search,
  Check,
  AlertTriangle 
} from 'lucide-react';
import { useSegmentoLeadManager, SegmentoLead } from '@/hooks/useSegmentoLeadManager';
import { useToast } from '@/hooks/use-toast';

interface GerenciarSegmentosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GerenciarSegmentosModal = ({ isOpen, onClose }: GerenciarSegmentosModalProps) => {
  const { toast } = useToast();
  const {
    segmentos,
    isLoading,
    adicionarSegmento,
    editarSegmento,
    excluirSegmento,
    restaurarPadroes,
    getTotalCustomizados
  } = useSegmentoLeadManager();

  const [novoSegmento, setNovoSegmento] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [valorEdicao, setValorEdicao] = useState('');
  const [filtro, setFiltro] = useState('');
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);

  const segmentosFiltrados = segmentos.filter(segmento =>
    segmento.label.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAdicionarSegmento = () => {
    if (adicionarSegmento(novoSegmento)) {
      setNovoSegmento('');
      toast({
        title: "Segmento adicionado",
        description: "O novo segmento foi adicionado com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao adicionar",
        description: "Segmento duplicado ou inválido.",
        variant: "destructive"
      });
    }
  };

  const handleIniciarEdicao = (segmento: SegmentoLead) => {
    if (segmento.isDefault) return;
    setEditandoId(segmento.id);
    setValorEdicao(segmento.label);
  };

  const handleSalvarEdicao = () => {
    if (editandoId && editarSegmento(editandoId, valorEdicao)) {
      setEditandoId(null);
      setValorEdicao('');
      toast({
        title: "Segmento editado",
        description: "O segmento foi editado com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao editar",
        description: "Não foi possível editar o segmento.",
        variant: "destructive"
      });
    }
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setValorEdicao('');
  };

  const handleExcluirSegmento = (id: string) => {
    if (excluirSegmento(id)) {
      toast({
        title: "Segmento excluído",
        description: "O segmento foi excluído com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao excluir",
        description: "Não é possível excluir segmentos padrão.",
        variant: "destructive"
      });
    }
  };

  const handleRestaurarPadroes = () => {
    restaurarPadroes();
    setShowConfirmRestore(false);
    toast({
      title: "Padrões restaurados",
      description: "Todos os segmentos foram restaurados para os valores padrão.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Gerenciar Segmentos do Lead</span>
              {getTotalCustomizados() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getTotalCustomizados()} personalizado(s)
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Adicionar Novo Segmento */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label htmlFor="novoSegmento" className="text-sm font-medium">
              Adicionar Novo Segmento
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="novoSegmento"
                value={novoSegmento}
                onChange={(e) => setNovoSegmento(e.target.value)}
                placeholder="Digite o nome do novo segmento..."
                onKeyPress={(e) => e.key === 'Enter' && handleAdicionarSegmento()}
              />
              <Button 
                onClick={handleAdicionarSegmento}
                disabled={!novoSegmento.trim()}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Filtro e Ações */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar segmentos..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            {!showConfirmRestore ? (
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmRestore(true)}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar Padrões
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">Confirmar restauração?</span>
                <Button size="sm" variant="outline" onClick={handleRestaurarPadroes}>
                  Sim
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowConfirmRestore(false)}>
                  Não
                </Button>
              </div>
            )}
          </div>

          {/* Tabela de Segmentos */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-32">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segmentosFiltrados.map((segmento) => (
                  <TableRow key={segmento.id}>
                    <TableCell>
                      {editandoId === segmento.id ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            value={valorEdicao}
                            onChange={(e) => setValorEdicao(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleSalvarEdicao();
                              if (e.key === 'Escape') handleCancelarEdicao();
                            }}
                            className="text-sm"
                            autoFocus
                          />
                          <Button size="sm" onClick={handleSalvarEdicao}>
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelarEdicao}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-medium">{segmento.label}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={segmento.isDefault ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {segmento.isDefault ? 'Padrão' : 'Personalizado'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {!segmento.isDefault && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleIniciarEdicao(segmento)}
                              disabled={editandoId !== null}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleExcluirSegmento(segmento.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {segmentosFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      {filtro ? 'Nenhum segmento encontrado com esse filtro' : 'Nenhum segmento encontrado'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Informações */}
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Dicas de uso:</p>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>• Segmentos padrão não podem ser editados ou excluídos</li>
                  <li>• Use nomes descritivos para facilitar a identificação</li>
                  <li>• Pressione Enter para salvar rapidamente</li>
                  <li>• Suas personalizações ficam salvas automaticamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GerenciarSegmentosModal;
