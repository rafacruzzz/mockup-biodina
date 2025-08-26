
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function getTermometroColor(value: number): string {
  if (value <= 25) return '#ef4444'; // red-500
  if (value <= 50) return '#f97316'; // orange-500
  if (value <= 75) return '#eab308'; // yellow-500
  return '#22c55e'; // green-500
}

export function getTermometroStage(value: number): string {
  if (value <= 25) return 'Estágio Inicial';
  if (value <= 50) return 'Em Desenvolvimento';
  if (value <= 75) return 'Progredindo';
  return 'Quase Finalizado';
}

export function getRankingColor(ranking: number): string {
  switch(ranking) {
    case 1: return 'bg-green-500 text-white';
    case 2: return 'bg-yellow-500 text-white';
    case 3: return 'bg-orange-500 text-white';
    default: return 'bg-red-500 text-white';
  }
}

export function getUnidadeColor(unidade: string): string {
  return 'bg-blue-100 text-blue-800 border-blue-200';
}

export function getAtendeEditalBadge(atende: boolean): string {
  return atende 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-red-100 text-red-800 border-red-200';
}
