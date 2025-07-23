
import { planosCarreira, cargosPlanos } from "@/data/planosCarreira";
import { SugestaoSalarial } from "@/types/planoCarreira";

export const calcularSugestaoSalarial = (
  empresa: string,
  uf: string,
  cargo: string,
  nivel: string
): SugestaoSalarial | null => {
  if (!empresa || !uf || !cargo || !nivel) {
    return null;
  }

  // Encontrar o plano de carreira correspondente
  const plano = planosCarreira.find(p => 
    p.empresa === empresa && 
    p.uf === uf && 
    p.ativo
  );

  if (!plano) {
    return null;
  }

  // Encontrar o cargo no plano
  const cargoPlano = cargosPlanos.find(c => 
    c.planoCarreiraId === plano.id && 
    c.cargo === cargo
  );

  if (!cargoPlano) {
    return null;
  }

  // Encontrar o nível correspondente
  const nivelNum = parseInt(nivel);
  const nivelProgressao = cargoPlano.niveis.find(n => n.nivel === nivelNum);

  if (!nivelProgressao) {
    return null;
  }

  // Calcular valores usando o valor médio da faixa
  const adicionalNivel = (nivelProgressao.valorMinimo + nivelProgressao.valorMaximo) / 2;
  const salarioTotal = cargoPlano.salarioBase + adicionalNivel;

  const breakdown = `Salário Base: R$ ${cargoPlano.salarioBase.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} + Nível ${nivel}: R$ ${adicionalNivel.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  return {
    planoCarreira: plano.nome,
    salarioBase: cargoPlano.salarioBase,
    adicionalNivel,
    salarioTotal,
    breakdown
  };
};

export const obterCargosDisponiveis = (empresa: string, uf: string): string[] => {
  const plano = planosCarreira.find(p => 
    p.empresa === empresa && 
    p.uf === uf && 
    p.ativo
  );

  if (!plano) {
    return [];
  }

  return cargosPlanos
    .filter(c => c.planoCarreiraId === plano.id)
    .map(c => c.cargo);
};
