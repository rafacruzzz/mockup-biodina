import { AlertasCriticosSection } from './AlertasCriticosSection';
import { DashboardKPIsSection } from './DashboardKPIsSection';
import { TrilhaAuditoriaSection } from './TrilhaAuditoriaSection';
import { alertasRTMockados, kpisRTMockados, trilhaAuditoriaMockada } from '@/data/rtModules';

export const MonitoramentoAuditoriaTab = () => {
  return (
    <div className="space-y-6">
      <AlertasCriticosSection alertas={alertasRTMockados} />
      <DashboardKPIsSection kpis={kpisRTMockados} />
      <TrilhaAuditoriaSection registros={trilhaAuditoriaMockada} />
    </div>
  );
};
