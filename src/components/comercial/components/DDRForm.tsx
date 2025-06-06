import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface DDRFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const DDRForm = ({ formData, onInputChange }: DDRFormProps) => {
  // Estados para DDR
  const [ddrData, setDdrData] = useState({
    autorizacaoAnvisa: '103.011-6',
    numeroRegularizacao: '10301160243',
    licenciamentoImportacao: '25/1217686-1',
    rdcNumero: '81',
    dataRdc: '05/11/2008',
    unidadeSaude: 'HOSPITAL SAO VICENTE DE PAULO',
    cnpjUnidadeSaude: '18.010.750/0001-00',
    finalidadeImportacao: 'Uso exclusivo',
    codigoInterno: '944-157',
    nomeComercial: 'REF. 944-157 - SOLUTION PACK - SP90, 680 ATIVIDADES. TEMPERATURA DE ARMAZENAGEM: +2°C A +25°C',
    apresentacaoComercial: 'UNIDADE',
    registroMS: '10301160243',
    numeroSerie: '944-157DX10',
    dataFabricacao: '04/03/2025',
    dataValidade: '31/08/2025',
    naoComercio: false,
    rastreabilidade: false,
    normasSanitarias: false,
    declaracaoValida: false,
    responsavelNome: 'Sylvio dos Santos Jr.',
    responsavelFuncao: 'Responsável Técnico e Legal',
    responsavelCrq: '03211626',
    dataDeclaracao: '27/03/2025',
    cidadeEstado: 'Niterói – RJ',
    statusDocumento: 'rascunho'
  });

  const finalidadesImportacao = [
    'Uso exclusivo',
    'Pesquisa científica',
    'Demonstração',
    'Avaliação técnica'
  ];

  const statusDocumento = [
    'rascunho',
    'pronto para assinatura',
    'assinado',
    'vencido'
  ];

  const handleDdrInputChange = (field: string, value: any) => {
    setDdrData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownloadDDR = () => {
    console.log('Baixando DDR...');
    // Aqui seria implementada a lógica de download do DDR
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            DDR - DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="border p-4 rounded bg-blue-50">
            <h3 className="font-bold mb-4 text-lg text-blue-700">
              DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO DO PRODUTO AUTORIZANDO A IMPORTAÇÃO DIRETA POR UNIDADE DE SAÚDE
            </h3>
          </div>

          {/* 1. Cabeçalho */}
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-4 border-b pb-2">1. CABEÇALHO (Carregado automaticamente do sistema)</h3>
            <div className="space-y-2 text-sm">
              <p className="font-bold">BIODINA INSTRUMENTOS CIENTÍFICOS LTDA</p>
              <p>29.375.441/0001-50</p>
              <p>BIODINA</p>
              <p>COMÉRCIO DE MATERIAIS CIENTÍFICOS</p>
            </div>
          </div>

          {/* 2. Informações da Regularização e Importação */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">2. INFORMAÇÕES DA REGULARIZAÇÃO E IMPORTAÇÃO</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Campo</th>
                    <th className="border border-gray-300 p-2 text-left">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Autorização ANVISA (AFE nº)</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.autorizacaoAnvisa}
                        onChange={(e) => handleDdrInputChange('autorizacaoAnvisa', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Número da regularização na ANVISA</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.numeroRegularizacao}
                        onChange={(e) => handleDdrInputChange('numeroRegularizacao', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Licenciamento de Importação nº</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.licenciamentoImportacao}
                        onChange={(e) => handleDdrInputChange('licenciamentoImportacao', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Resolução da Diretoria Colegiada (RDC nº)</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.rdcNumero}
                        onChange={(e) => handleDdrInputChange('rdcNumero', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Data da RDC</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.dataRdc}
                        onChange={(e) => handleDdrInputChange('dataRdc', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Unidade de saúde autorizada</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.unidadeSaude}
                        onChange={(e) => handleDdrInputChange('unidadeSaude', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">CNPJ da unidade de saúde</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.cnpjUnidadeSaude}
                        onChange={(e) => handleDdrInputChange('cnpjUnidadeSaude', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Finalidade da importação</td>
                    <td className="border border-gray-300 p-2">
                      <Select 
                        value={ddrData.finalidadeImportacao} 
                        onValueChange={(value) => handleDdrInputChange('finalidadeImportacao', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {finalidadesImportacao.map((finalidade) => (
                            <SelectItem key={finalidade} value={finalidade}>
                              {finalidade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Informações do Produto */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">3. INFORMAÇÕES DO PRODUTO</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="codigoInterno">Código interno</Label>
                <Input
                  id="codigoInterno"
                  value={ddrData.codigoInterno}
                  onChange={(e) => handleDdrInputChange('codigoInterno', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="apresentacaoComercial">Apresentação Comercial</Label>
                <Input
                  id="apresentacaoComercial"
                  value={ddrData.apresentacaoComercial}
                  onChange={(e) => handleDdrInputChange('apresentacaoComercial', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="lg:col-span-2">
                <Label htmlFor="nomeComercial">Nome Comercial do Produto</Label>
                <Textarea
                  id="nomeComercial"
                  value={ddrData.nomeComercial}
                  onChange={(e) => handleDdrInputChange('nomeComercial', e.target.value)}
                  rows={3}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="registroMS">Registro no Ministério da Saúde nº</Label>
                <Input
                  id="registroMS"
                  value={ddrData.registroMS}
                  onChange={(e) => handleDdrInputChange('registroMS', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="numeroSerie">Número de Série</Label>
                <Input
                  id="numeroSerie"
                  value={ddrData.numeroSerie}
                  onChange={(e) => handleDdrInputChange('numeroSerie', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="dataFabricacao">Data de Fabricação</Label>
                <Input
                  id="dataFabricacao"
                  value={ddrData.dataFabricacao}
                  onChange={(e) => handleDdrInputChange('dataFabricacao', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="dataValidade">Data de Validade</Label>
                <Input
                  id="dataValidade"
                  value={ddrData.dataValidade}
                  onChange={(e) => handleDdrInputChange('dataValidade', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              (Essas informações podem ser preenchidas a partir do XML da DI ou ficha técnica do produto no sistema)
            </p>
          </div>

          {/* 4. Declarações Legais */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">4. DECLARAÇÕES LEGAIS (Checkbox no sistema)</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="naoComercio"
                  checked={ddrData.naoComercio}
                  onCheckedChange={(checked) => handleDdrInputChange('naoComercio', checked)}
                />
                <Label htmlFor="naoComercio">Produtos não serão destinados ao comércio</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rastreabilidade"
                  checked={ddrData.rastreabilidade}
                  onCheckedChange={(checked) => handleDdrInputChange('rastreabilidade', checked)}
                />
                <Label htmlFor="rastreabilidade">Rastreabilidade garantida conforme Lei nº 6360/76 e Decreto nº 8.077/2013</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="normasSanitarias"
                  checked={ddrData.normasSanitarias}
                  onCheckedChange={(checked) => handleDdrInputChange('normasSanitarias', checked)}
                />
                <Label htmlFor="normasSanitarias">Observância das normas sanitárias conforme Lei nº 6437/77</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="declaracaoValida"
                  checked={ddrData.declaracaoValida}
                  onCheckedChange={(checked) => handleDdrInputChange('declaracaoValida', checked)}
                />
                <Label htmlFor="declaracaoValida">Declaração válida por 90 dias a partir da assinatura</Label>
              </div>
            </div>
          </div>

          {/* 5. Assinatura do Responsável */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">5. ASSINATURA DO RESPONSÁVEL</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="responsavelNome">Nome do responsável técnico/legal</Label>
                <Input
                  id="responsavelNome"
                  value={ddrData.responsavelNome}
                  onChange={(e) => handleDdrInputChange('responsavelNome', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="responsavelFuncao">Função</Label>
                <Input
                  id="responsavelFuncao"
                  value={ddrData.responsavelFuncao}
                  onChange={(e) => handleDdrInputChange('responsavelFuncao', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="responsavelCrq">C.R.Q.</Label>
                <Input
                  id="responsavelCrq"
                  value={ddrData.responsavelCrq}
                  onChange={(e) => handleDdrInputChange('responsavelCrq', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* 6. Outros Campos do Sistema */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">6. OUTROS CAMPOS DO SISTEMA</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dataDeclaracao">Data da Declaração</Label>
                <Input
                  id="dataDeclaracao"
                  value={ddrData.dataDeclaracao}
                  onChange={(e) => handleDdrInputChange('dataDeclaracao', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="cidadeEstado">Cidade e Estado</Label>
                <Input
                  id="cidadeEstado"
                  value={ddrData.cidadeEstado}
                  onChange={(e) => handleDdrInputChange('cidadeEstado', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="statusDocumento">Status do Documento</Label>
                <Select 
                  value={ddrData.statusDocumento} 
                  onValueChange={(value) => handleDdrInputChange('statusDocumento', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusDocumento.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="flex justify-end">
        <Button onClick={handleDownloadDDR} className="flex items-center gap-2">
          <Download size={16} />
          Baixar DDR
        </Button>
      </div>
    </div>
  );
};

export default DDRForm;
