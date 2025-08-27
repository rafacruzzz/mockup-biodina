
import { useState, useEffect } from 'react';

export interface SegmentoLead {
  id: string;
  value: string;
  label: string;
  isDefault: boolean;
}

const SEGMENTOS_DEFAULT: SegmentoLead[] = [
  { id: '1', value: 'filantropico', label: 'FILANTRÓPICO', isDefault: true },
  { id: '2', value: 'privado_estetica', label: 'PRIVADO - ESTÉTICA', isDefault: true },
  { id: '3', value: 'privado_hospital', label: 'PRIVADO - HOSPITAL', isDefault: true },
  { id: '4', value: 'privado_laboratorio', label: 'PRIVADO - LABORATÓRIO', isDefault: true },
  { id: '5', value: 'privado_universidade', label: 'PRIVADO - UNIVERSIDADE', isDefault: true },
  { id: '6', value: 'privado_veterinario', label: 'PRIVADO - VETERINÁRIO', isDefault: true },
  { id: '7', value: 'privado_hospital_os', label: 'PRIVADO - HOSPITAL - OS', isDefault: true },
  { id: '8', value: 'privado_laboratorio_os', label: 'PRIVADO - LABORATÓRIO - OS', isDefault: true },
  { id: '9', value: 'publico_hospital_aeronautica', label: 'PÚBLICO - HOSPITAL - AERONÁUTICA', isDefault: true },
  { id: '10', value: 'publico_hospital_estadual', label: 'PÚBLICO - HOSPITAL - ESTADUAL', isDefault: true },
  { id: '11', value: 'publico_hospital_exercito', label: 'PÚBLICO - HOSPITAL - EXÉRCITO', isDefault: true },
  { id: '12', value: 'publico_hospital_federal', label: 'PÚBLICO - HOSPITAL - FEDERAL', isDefault: true },
  { id: '13', value: 'publico_hospital_marinha', label: 'PÚBLICO - HOSPITAL - MARINHA', isDefault: true },
  { id: '14', value: 'publico_hospital_municipal', label: 'PÚBLICO - HOSPITAL - MUNICIPAL', isDefault: true },
  { id: '15', value: 'publico_hospital_secretaria_saude', label: 'PÚBLICO - HOSPITAL - SECRETARIA DA SAÚDE', isDefault: true },
  { id: '16', value: 'publico_hospital_universidade', label: 'PÚBLICO - HOSPITAL - UNIVERSIDADE', isDefault: true },
  { id: '17', value: 'publico_hospital_upa', label: 'PÚBLICO - HOSPITAL - UPA', isDefault: true },
  { id: '18', value: 'publico_hospital_veterinario', label: 'PÚBLICO - HOSPITAL - VETERINÁRIO', isDefault: true },
  { id: '19', value: 'publico_laboratorio_aeronautica', label: 'PÚBLICO - LABORATÓRIO - AERONÁUTICA', isDefault: true },
  { id: '20', value: 'publico_laboratorio_estadual', label: 'PÚBLICO - LABORATÓRIO - ESTADUAL', isDefault: true },
  { id: '21', value: 'publico_laboratorio_exercito', label: 'PÚBLICO - LABORATÓRIO - EXÉRCITO', isDefault: true },
  { id: '22', value: 'publico_laboratorio_federal', label: 'PÚBLICO - LABORATÓRIO - FEDERAL', isDefault: true },
  { id: '23', value: 'publico_laboratorio_marinha', label: 'PÚBLICO - LABORATÓRIO - MARINHA', isDefault: true },
  { id: '24', value: 'publico_laboratorio_municipal', label: 'PÚBLICO - LABORATÓRIO - MUNICIPAL', isDefault: true },
  { id: '25', value: 'publico_laboratorio_secretaria_saude', label: 'PÚBLICO - LABORATÓRIO - SECRETARIA DA SAÚDE', isDefault: true },
  { id: '26', value: 'publico_laboratorio_universidade', label: 'PÚBLICO - LABORATÓRIO - UNIVERSIDADE', isDefault: true },
  { id: '27', value: 'publico_laboratorio_upa', label: 'PÚBLICO - LABORATÓRIO - UPA', isDefault: true },
  { id: '28', value: 'publico_laboratorio_veterinario', label: 'PÚBLICO - LABORATÓRIO - VETERINÁRIO', isDefault: true },
  { id: '29', value: 'publico_direito_privado', label: 'PÚBLICO – DIREITO PRIVADO', isDefault: true },
];

const STORAGE_KEY = 'segmentos-lead-customizados';

export const useSegmentoLeadManager = () => {
  const [segmentos, setSegmentos] = useState<SegmentoLead[]>(SEGMENTOS_DEFAULT);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar segmentos do localStorage na inicialização
  useEffect(() => {
    const savedSegmentos = localStorage.getItem(STORAGE_KEY);
    if (savedSegmentos) {
      try {
        const parsed = JSON.parse(savedSegmentos);
        setSegmentos(parsed);
      } catch (error) {
        console.error('Erro ao carregar segmentos salvos:', error);
        setSegmentos(SEGMENTOS_DEFAULT);
      }
    }
  }, []);

  // Salvar no localStorage sempre que a lista mudar
  const saveToStorage = (newSegmentos: SegmentoLead[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSegmentos));
    setSegmentos(newSegmentos);
  };

  const adicionarSegmento = (label: string) => {
    if (!label.trim()) return false;
    
    const labelUpper = label.trim().toUpperCase();
    const value = labelUpper.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
    
    // Verificar duplicatas
    if (segmentos.some(s => s.label === labelUpper || s.value === value)) {
      return false;
    }

    const novoSegmento: SegmentoLead = {
      id: Date.now().toString(),
      value,
      label: labelUpper,
      isDefault: false,
    };

    const novosSegmentos = [...segmentos, novoSegmento];
    saveToStorage(novosSegmentos);
    return true;
  };

  const editarSegmento = (id: string, novoLabel: string) => {
    if (!novoLabel.trim()) return false;
    
    const labelUpper = novoLabel.trim().toUpperCase();
    const value = labelUpper.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
    
    // Verificar duplicatas (excluindo o próprio item)
    if (segmentos.some(s => s.id !== id && (s.label === labelUpper || s.value === value))) {
      return false;
    }

    const novosSegmentos = segmentos.map(segmento =>
      segmento.id === id
        ? { ...segmento, label: labelUpper, value }
        : segmento
    );
    
    saveToStorage(novosSegmentos);
    return true;
  };

  const excluirSegmento = (id: string) => {
    const segmento = segmentos.find(s => s.id === id);
    if (segmento?.isDefault) return false; // Não pode excluir padrões
    
    const novosSegmentos = segmentos.filter(s => s.id !== id);
    saveToStorage(novosSegmentos);
    return true;
  };

  const restaurarPadroes = () => {
    setIsLoading(true);
    setTimeout(() => {
      saveToStorage(SEGMENTOS_DEFAULT);
      setIsLoading(false);
    }, 500);
  };

  const getTotalCustomizados = () => {
    return segmentos.filter(s => !s.isDefault).length;
  };

  return {
    segmentos,
    isLoading,
    adicionarSegmento,
    editarSegmento,
    excluirSegmento,
    restaurarPadroes,
    getTotalCustomizados,
  };
};
