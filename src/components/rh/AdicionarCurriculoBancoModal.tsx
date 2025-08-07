
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, User, Mail, Phone, Plus } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { Curriculo } from '@/types/processoSeletivo';

interface AdicionarCurriculoBancoModalProps {
  isOpen: boolean;
  onClose: () => void;
  processoSeletivoId: string;
}

const AdicionarCurriculoBancoModal: React.FC<AdicionarCurriculoBancoModalProps> = ({
  isOpen,
  onClose,
  processoSeletivoId
}) => {
  const { curriculos, processosSeletivos, adicionarCandidatoProcesso } = useProcessoSeletivo();
  const [searchTerm, setSearchTerm] = useState('');
  const [departamentoFilter, setDepartamentoFilter] = useState<string>('all');
  const [cargoFilter, setCargoFilter] = useState<string>('all');
  const [selectedCurriculos, setSelectedCurriculos] = useState<string[]>([]);

  const processo = processosSeletivos.find(p => p.id === processoSeletivoId);
  
  // Currículos que já estão no processo atual
  const curriculosNoProcesso = new Set(
    processo?.candidatos.map(c => c.curriculoId) || []
  );

  const availableCurriculos = useMemo(() => {
    return curriculos.filter(curriculo => {
      // Não mostrar currículos já adicionados ao processo
      if (curriculosNoProcesso.has(curriculo.id)) return false;

      const matchesSearch = searchTerm === '' ||
        curriculo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculo.cargoDesejado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculo.habilidades.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartamento = departamentoFilter === 'all' || 
        curriculo.departamento === departamentoFilter;

      const matchesCargo = cargoFilter === 'all' ||
        curriculo.cargoDesejado.toLowerCase().includes(cargoFilter.toLowerCase());

      return matchesSearch && matchesDepartamento && matchesCargo;
    });
  }, [curriculos, searchTerm, departamentoFilter, cargoFilter, curriculosNoProcesso]);

  const departamentos = useMemo(() => {
    const depts = [...new Set(curriculos.map(c => c.departamento))];
    return depts.sort();
  }, [curriculos]);

  const cargos = useMemo(() => {
    const jobs = [...new Set(curriculos.map(c => c.cargoDesejado))];
    return jobs.sort();
  }, [curriculos]);

  const handleCurriculoToggle = (curriculoId: string) => {
    setSelectedCurriculos(prev => 
      prev.includes(curriculoId)
        ? prev.filter(id => id !== curriculoId)
        : [...prev, curriculoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCurriculos.length === availableCurriculos.length) {
      setSelectedCurriculos([]);
    } else {
      setSelectedCurriculos(availableCurriculos.map(c => c.id));
    }
  };

  const handleAddCurriculos = () => {
    if (!processo) return;

    selectedCurriculos.forEach(curriculoId => {
      const primeiraEtapa = processo.etapas[0];
      if (primeiraEtapa) {
        adicionarCandidatoProcesso({
          curriculoId,
          processoSeletivoId,
          etapaAtual: primeiraEtapa.id,
          status: 'em-andamento',
          feedback: [],
          dataInicio: new Date().toISOString(),
          dataUltimaAtualizacao: new Date().toISOString()
        });
      }
    });

    setSelectedCurriculos([]);
    setSearchTerm('');
    setDepartamentoFilter('all');
    setCargoFilter('all');
    onClose();
  };

  const handleClose = () => {
    setSelectedCurriculos([]);
    setSearchTerm('');
    setDepartamentoFilter('all');
    setCargoFilter('all');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar Currículos do Banco
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Selecione currículos do banco para adicionar ao processo: <strong>{processo?.titulo}</strong>
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          {/* Filtros */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email, cargo ou habilidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Departamentos</SelectItem>
                {departamentos.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={cargoFilter} onValueChange={setCargoFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Cargos</SelectItem>
                {cargos.map(cargo => (
                  <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Header com contador e seleção */}
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {availableCurriculos.length} currículo(s) disponível(is)
              </span>
              {selectedCurriculos.length > 0 && (
                <Badge variant="outline" className="bg-biodina-blue/10 text-biodina-blue border-biodina-blue">
                  {selectedCurriculos.length} selecionado(s)
                </Badge>
              )}
            </div>
            {availableCurriculos.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedCurriculos.length === availableCurriculos.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </Button>
            )}
          </div>

          {/* Lista de currículos */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {availableCurriculos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum currículo disponível com os filtros aplicados.
              </div>
            ) : (
              availableCurriculos.map(curriculo => (
                <div
                  key={curriculo.id}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCurriculoToggle(curriculo.id)}
                >
                  <Checkbox
                    checked={selectedCurriculos.includes(curriculo.id)}
                    onChange={() => handleCurriculoToggle(curriculo.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{curriculo.nome}</h4>
                          <p className="text-sm text-gray-600">{curriculo.cargoDesejado}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {curriculo.departamento}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>{curriculo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{curriculo.telefone}</span>
                      </div>
                    </div>

                    {curriculo.habilidades.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {curriculo.habilidades.slice(0, 4).map((habilidade, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {habilidade}
                          </Badge>
                        ))}
                        {curriculo.habilidades.length > 4 && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            +{curriculo.habilidades.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAddCurriculos}
            disabled={selectedCurriculos.length === 0}
            className="bg-biodina-blue hover:bg-biodina-blue/90"
          >
            Adicionar {selectedCurriculos.length > 0 ? `${selectedCurriculos.length} ` : ''}Currículo(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarCurriculoBancoModal;
