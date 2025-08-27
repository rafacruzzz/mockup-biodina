
import { useState, useEffect } from "react";

export interface SegmentoLead {
  value: string;
  label: string;
  id: string;
}

const DEFAULT_SEGMENTOS: SegmentoLead[] = [
  { id: "1", value: "filantropico_hospital", label: "FILANTRÓPICO - HOSPITAL" },
  { id: "2", value: "filantropico_laboratorio", label: "FILANTRÓPICO - LABORATÓRIO" },
  { id: "3", value: "privado_clinica", label: "PRIVADO - CLÍNICA" },
  { id: "4", value: "privado_hospital", label: "PRIVADO - HOSPITAL" },
  { id: "5", value: "privado_laboratorio", label: "PRIVADO - LABORATÓRIO" },
  { id: "6", value: "privado_universidade", label: "PRIVADO - UNIVERSIDADE" },
  { id: "7", value: "privado_veterinario", label: "PRIVADO - VETERINÁRIO" },
  { id: "8", value: "privado_hospital_os", label: "PRIVADO - HOSPITAL - OS" },
  { id: "9", value: "privado_laboratorio_os", label: "PRIVADO - LABORATÓRIO - OS" },
  { id: "10", value: "publico_hospital_aeronautica", label: "PÚBLICO - HOSPITAL - AERONÁUTICA" },
  { id: "11", value: "publico_hospital_estadual", label: "PÚBLICO - HOSPITAL - ESTADUAL" },
  { id: "12", value: "publico_hospital_exercito", label: "PÚBLICO - HOSPITAL - EXÉRCITO" },
  { id: "13", value: "publico_hospital_federal", label: "PÚBLICO - HOSPITAL - FEDERAL" },
  { id: "14", value: "publico_hospital_marinha", label: "PÚBLICO - HOSPITAL - MARINHA" },
  { id: "15", value: "publico_hospital_municipal", label: "PÚBLICO - HOSPITAL - MUNICIPAL" },
  { id: "16", value: "publico_hospital_secretaria_saude", label: "PÚBLICO - HOSPITAL - SECRETARIA DA SAÚDE" },
  { id: "17", value: "publico_hospital_universidade", label: "PÚBLICO - HOSPITAL - UNIVERSIDADE" },
  { id: "18", value: "publico_hospital_upa", label: "PÚBLICO - HOSPITAL - UPA" },
  { id: "19", value: "publico_hospital_veterinario", label: "PÚBLICO - HOSPITAL - VETERINÁRIO" },
  { id: "20", value: "publico_laboratorio_aeronautica", label: "PÚBLICO - LABORATÓRIO - AERONÁUTICA" },
  { id: "21", value: "publico_laboratorio_estadual", label: "PÚBLICO - LABORATÓRIO - ESTADUAL" },
  { id: "22", value: "publico_laboratorio_exercito", label: "PÚBLICO - LABORATÓRIO - EXÉRCITO" },
  { id: "23", value: "publico_laboratorio_federal", label: "PÚBLICO - LABORATÓRIO - FEDERAL" },
  { id: "24", value: "publico_laboratorio_marinha", label: "PÚBLICO - LABORATÓRIO - MARINHA" },
  { id: "25", value: "publico_laboratorio_municipal", label: "PÚBLICO - LABORATÓRIO - MUNICIPAL" },
  { id: "26", value: "publico_laboratorio_secretaria_saude", label: "PÚBLICO - LABORATÓRIO - SECRETARIA DA SAÚDE" },
  { id: "27", value: "publico_laboratorio_universidade", label: "PÚBLICO - LABORATÓRIO - UNIVERSIDADE" },
  { id: "28", value: "publico_laboratorio_upa", label: "PÚBLICO - LABORATÓRIO - UPA" },
  { id: "29", value: "publico_laboratorio_veterinario", label: "PÚBLICO - LABORATÓRIO - VETERINÁRIO" },
  { id: "30", value: "publico_direito_privado", label: "PÚBLICO – DIREITO PRIVADO" },
];

const STORAGE_KEY = "segmentos_lead_customizados";

export const useSegmentoLeadManager = () => {
  const [segmentos, setSegmentos] = useState<SegmentoLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSegmentos();
  }, []);

  const loadSegmentos = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSegmentos(JSON.parse(saved));
      } else {
        setSegmentos(DEFAULT_SEGMENTOS);
      }
    } catch (error) {
      console.error("Erro ao carregar segmentos:", error);
      setSegmentos(DEFAULT_SEGMENTOS);
    }
    setIsLoading(false);
  };

  const saveSegmentos = (newSegmentos: SegmentoLead[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSegmentos));
      setSegmentos(newSegmentos);
    } catch (error) {
      console.error("Erro ao salvar segmentos:", error);
    }
  };

  const addSegmento = (label: string): boolean => {
    const value = label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    
    if (segmentos.some(s => s.value === value || s.label === label)) {
      return false;
    }

    const newSegmento: SegmentoLead = {
      id: Date.now().toString(),
      value,
      label: label.trim(),
    };

    saveSegmentos([...segmentos, newSegmento]);
    return true;
  };

  const updateSegmento = (id: string, label: string): boolean => {
    const value = label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    
    if (segmentos.some(s => s.id !== id && (s.value === value || s.label === label))) {
      return false;
    }

    const updated = segmentos.map(s => 
      s.id === id ? { ...s, label: label.trim(), value } : s
    );
    
    saveSegmentos(updated);
    return true;
  };

  const deleteSegmento = (id: string) => {
    const filtered = segmentos.filter(s => s.id !== id);
    saveSegmentos(filtered);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSegmentos(DEFAULT_SEGMENTOS);
  };

  return {
    segmentos,
    isLoading,
    addSegmento,
    updateSegmento,
    deleteSegmento,
    resetToDefault,
  };
};
