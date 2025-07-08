
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTermometroColor = (stage: string) => {
  switch (stage) {
    case 'frio': return 'bg-blue-500';
    case 'morno': return 'bg-yellow-500';
    case 'quente': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getTermometroStage = (valor: number) => {
  if (valor <= 30) return 'frio';
  if (valor <= 70) return 'morno';
  return 'quente';
};

export const getRankingColor = (posicao: number) => {
  switch (posicao) {
    case 1: return 'bg-green-500';
    case 2: return 'bg-yellow-500';
    case 3: return 'bg-orange-500';
    default: return 'bg-red-500';
  }
};

export const getUnidadeColor = (unidade: string) => {
  switch (unidade) {
    case 'kg': return 'bg-blue-500';
    case 'un': return 'bg-green-500';
    case 'cx': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
