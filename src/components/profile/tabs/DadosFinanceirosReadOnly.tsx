
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit3, AlertCircle, User } from 'lucide-react';
import { DadosFinanceiros } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface DadosFinanceirosReadOnlyProps {
  data: DadosFinanceiros;
}

const DadosFinanceirosReadOnly = ({ data }: DadosFinanceirosReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
  };

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value);
    return isNaN(numValue) ? 'R$ 0,00' : `R$ ${numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Salário Base</Label>
          <Input
            value={formatCurrency(data.salarioBase)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Adicional Nível</Label>
          <Input
            value={formatCurrency(data.adicionalNivel)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Insalubridade</Label>
          <Input
            value={formatCurrency(data.insalubridade)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Sobreaviso</Label>
          <Input
            value={formatCurrency(data.sobreaviso)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Salário Bruto</Label>
          <Input
            value={formatCurrency(data.salarioBruto)}
            readOnly
            className="bg-gray-50 font-semibold"
          />
        </div>

        <div className="space-y-2">
          <Label>Valor da Hora Trabalhada</Label>
          <Input
            value={formatCurrency(data.valorHoraTrabalhada)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Piso Salarial</Label>
          <Input
            value={formatCurrency(data.pisoSalarial)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Média Salarial</Label>
          <Input
            value={formatCurrency(data.mediaSalarial)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Adiantamento Salarial</Label>
          <div className="flex items-center gap-2">
            <Input
              value={data.adiantamentoSalarial ? 'Sim' : 'Não'}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Adiantamento Salarial', data.adiantamentoSalarial ? 'Sim' : 'Não')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dependentes para IR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Dependentes para IR</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSolicitarAlteracao('Dependentes IR', `${data.dependentesIR.length} dependentes`)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        {data.dependentesIR.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Nenhum dependente cadastrado</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {data.dependentesIR.map((dependente, index) => (
              <Card key={dependente.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Dependente {index + 1}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {dependente.idade} anos
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Nome:</span>
                      <p className="font-medium">{dependente.nome}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Documento:</span>
                      <p className="font-medium">{dependente.documento}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Aviso sobre alterações */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Informações Financeiras</h3>
              <p className="text-sm text-yellow-700">
                Estes dados são calculados automaticamente pelo sistema. Para dúvidas sobre valores salariais, entre em contato com o RH.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Dados Financeiros', 'Esclarecimentos sobre valores')}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Esclarecimento
          </Button>
        </div>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Dados Financeiros"
      />
    </div>
  );
};

export default DadosFinanceirosReadOnly;
