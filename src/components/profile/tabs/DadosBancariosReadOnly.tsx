
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DadosBancarios } from '@/types/colaborador';

interface DadosBancariosReadOnlyProps {
  data: DadosBancarios;
}

const DadosBancariosReadOnly = ({ data }: DadosBancariosReadOnlyProps) => {
  const getBancoNome = (codigo: string) => {
    const bancos: { [key: string]: string } = {
      '001': 'Banco do Brasil',
      '104': 'Caixa Econômica Federal',
      '237': 'Bradesco',
      '341': 'Itaú',
      '033': 'Santander',
      '260': 'Nu Pagamentos',
      '077': 'Banco Inter',
      '290': 'PagSeguro',
      '323': 'Mercado Pago',
      '336': 'C6 Bank'
    };
    return bancos[codigo] || codigo;
  };

  const getTipoContaNome = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'corrente': 'Conta Corrente',
      'poupanca': 'Conta Poupança',
      'salario': 'Conta Salário'
    };
    return tipos[tipo] || tipo;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Banco</Label>
          <Input
            value={getBancoNome(data.banco)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Conta</Label>
          <Input
            value={getTipoContaNome(data.tipoConta)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Agência</Label>
          <Input
            value={data.agencia}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Conta</Label>
          <Input
            value={data.conta}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default DadosBancariosReadOnly;
