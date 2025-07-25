
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit3, AlertCircle } from 'lucide-react';
import { DadosBancarios } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface DadosBancariosReadOnlyProps {
  data: DadosBancarios;
}

const DadosBancariosReadOnly = ({ data }: DadosBancariosReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
  };

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
          <div className="flex items-center gap-2">
            <Input
              value={getBancoNome(data.banco)}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Banco', getBancoNome(data.banco))}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tipo de Conta</Label>
          <div className="flex items-center gap-2">
            <Input
              value={getTipoContaNome(data.tipoConta)}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Tipo de Conta', getTipoContaNome(data.tipoConta))}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Agência</Label>
          <div className="flex items-center gap-2">
            <Input
              value={data.agencia}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Agência', data.agencia)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Conta</Label>
          <div className="flex items-center gap-2">
            <Input
              value={data.conta}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Conta', data.conta)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Aviso sobre dados bancários */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Dados Bancários Importantes</h3>
              <p className="text-sm text-red-700">
                Alterações nos dados bancários são críticas para o recebimento do seu salário. Certifique-se de que as informações estão corretas.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Dados Bancários', 'Alteração completa dos dados bancários')}
            className="text-red-600 hover:text-red-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Alteração
          </Button>
        </div>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Dados Bancários"
      />
    </div>
  );
};

export default DadosBancariosReadOnly;
