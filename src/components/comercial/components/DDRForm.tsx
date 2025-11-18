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
  // Estado para modelo DDR selecionado
  const [modeloDDR, setModeloDDR] = useState('modelo1');

  // Modelos DDR disponíveis
  const modelosDDR = [
    {
      id: 'modelo1',
      nome: 'Declaração do Detentor da Regularização do Produto Autorizando a Importação Direta por Unidade de Saúde',
      titulo: 'DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO DO PRODUTO AUTORIZANDO A IMPORTAÇÃO DIRETA POR UNIDADE DE SAÚDE'
    },
    {
      id: 'modelo2', 
      nome: 'Importação para Unidade de Saúde por Meio de suas Entidades Vinculadas',
      titulo: 'IMPORTAÇÃO PARA UNIDADE DE SAÚDE POR MEIO DE SUAS ENTIDADES VINCULADAS'
    },
    {
      id: 'modelo3',
      nome: 'Declaração do Detentor da Regularização do Produto Autorizando a Importação por Terceiro', 
      titulo: 'DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO DO PRODUTO AUTORIZANDO A IMPORTAÇÃO POR TERCEIRO'
    }
  ];

  // Estados para DDR
  const [ddrData, setDdrData] = useState({
    // Campos do cabeçalho
    razaoSocial: 'iMuv INSTRUMENTOS CIENTÍFICOS LTDA',
    cnpj: '29.375.441/0001-50',
    nomeFantasia: 'iMuv',
    atividadePrincipal: 'COMÉRCIO DE MATERIAIS CIENTÍFICOS',
    // Campos existentes
    autorizacaoAnvisa: '103.011-6',
    licenciamentoImportacao: '25/1217686-1',
    rdcNumero: '81',
    dataRdc: '05/11/2008',
    unidadeSaude: 'HOSPITAL SAO VICENTE DE PAULO',
    cnpjUnidadeSaude: '18.010.750/0001-00',
    finalidadeImportacao: 'Uso exclusivo',
    // Novos campos para modelo DDR Entidade Vinculada
    empresa: '',
    entidadeVinculada: '',
    cnpjAdicional: '',
    finalidadeImportacaoAdicional: 'Uso exclusivo',
    codigoInterno: '944-157',
    nomeComercial: 'REF. 944-157 - SOLUTION PACK - SP90, 680 ATIVIDADES. TEMPERATURA DE ARMAZENAGEM: +2°C A +25°C',
    apresentacaoComercial: 'UNIDADE',
    registroMS: '10301160243',
    naoComercio: false,
    rastreabilidade: false,
    normasSanitarias: false,
    declaracaoValida: false,
    // Textos editáveis das declarações legais
    textoRastreabilidade: 'Rastreabilidade garantida conforme Lei nº 6360/76 e Decreto nº 8.077/2013',
    textoNormasSanitarias: 'Observância das normas sanitárias conforme Lei nº 6437/77',
    responsavelNome: 'Sylvio dos Santos Jr.',
    responsavelFuncao: 'Responsável Técnico e Legal',
    responsavelCrq: '03211626',
    dataDeclaracao: '27/03/2025',
    cidadeEstado: 'Niterói – RJ',
    statusDocumento: 'rascunho'
  });

  const finalidadesImportacao = [
    'realizar a atividade exclusiva de importação terceirizada',
    'realizar a importação direta do produto para seu uso exclusivo',
    'importação direta do produto',
    'para uso exclusivo pela unidade de saúde'
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
    const modeloSelecionado = modelosDDR.find(m => m.id === modeloDDR);
    console.log('Baixando DDR...', {
      modelo: modeloSelecionado?.nome,
      titulo: modeloSelecionado?.titulo,
      // Apenas inclui campos adicionais se estiverem preenchidos
      cnpjAdicional: ddrData.cnpjAdicional || 'não incluído',
      finalidadeImportacaoAdicional: ddrData.finalidadeImportacaoAdicional || 'não incluído'
    });
    // Aqui seria implementada a lógica de download do DDR baseada no modelo selecionado
    // Os campos cnpjAdicional e finalidadeImportacaoAdicional só serão incluídos no PDF se tiverem valores
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Modelo DDR */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecionar Modelo DDR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="modeloDDR">Tipo de DDR</Label>
            <Select 
              value={modeloDDR} 
              onValueChange={setModeloDDR}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o modelo DDR" />
              </SelectTrigger>
              <SelectContent>
                {modelosDDR.map((modelo) => (
                  <SelectItem key={modelo.id} value={modelo.id}>
                    {modelo.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Formulário DDR */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-sm">
            DDR - {modelosDDR.find(m => m.id === modeloDDR)?.nome.toUpperCase() || 'DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Seção: Dados do Detentor */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">DADOS DO DETENTOR DA REGULARIZAÇÃO</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium w-1/3">Razão Social</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.razaoSocial}
                        onChange={(e) => handleDdrInputChange('razaoSocial', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">CNPJ</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.cnpj}
                        onChange={(e) => handleDdrInputChange('cnpj', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Nome Fantasia</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.nomeFantasia}
                        onChange={(e) => handleDdrInputChange('nomeFantasia', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Atividade Principal</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.atividadePrincipal}
                        onChange={(e) => handleDdrInputChange('atividadePrincipal', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Seção: Informações Regulatórias e da Unidade de Saúde */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">INFORMAÇÕES REGULATÓRIAS E DA UNIDADE DE SAÚDE</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium w-1/3">Autorização ANVISA</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.autorizacaoAnvisa}
                        onChange={(e) => handleDdrInputChange('autorizacaoAnvisa', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Licenciamento de Importação</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.licenciamentoImportacao}
                        onChange={(e) => handleDdrInputChange('licenciamentoImportacao', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">RDC Nº</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.rdcNumero}
                        onChange={(e) => handleDdrInputChange('rdcNumero', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Data da RDC</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.dataRdc}
                        onChange={(e) => handleDdrInputChange('dataRdc', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Unidade de Saúde</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.unidadeSaude}
                        onChange={(e) => handleDdrInputChange('unidadeSaude', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">CNPJ da Unidade de Saúde</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.cnpjUnidadeSaude}
                        onChange={(e) => handleDdrInputChange('cnpjUnidadeSaude', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Finalidade da Importação</td>
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
                  
                  {/* Campos específicos para modelo DDR Entidade Vinculada */}
                  {modeloDDR === 'modelo1' && (
                    <>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Empresa</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.empresa}
                            onChange={(e) => handleDdrInputChange('empresa', e.target.value)}
                            className="w-full"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Entidade Vinculada</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.entidadeVinculada}
                            onChange={(e) => handleDdrInputChange('entidadeVinculada', e.target.value)}
                            className="w-full"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">CNPJ (Adicional)</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.cnpjAdicional}
                            onChange={(e) => handleDdrInputChange('cnpjAdicional', e.target.value)}
                            className="w-full"
                            placeholder="Opcional - não aparece no PDF se vazio"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Finalidade da Importação (Adicional)</td>
                        <td className="border border-gray-300 p-2">
                          <Select 
                            value={ddrData.finalidadeImportacaoAdicional} 
                            onValueChange={(value) => handleDdrInputChange('finalidadeImportacaoAdicional', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Opcional - não aparece no PDF se vazio" />
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
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Seção: Informações do Produto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">INFORMAÇÕES DO PRODUTO</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium w-1/3">Código Interno</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.codigoInterno}
                        onChange={(e) => handleDdrInputChange('codigoInterno', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Apresentação Comercial</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.apresentacaoComercial}
                        onChange={(e) => handleDdrInputChange('apresentacaoComercial', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Nome Comercial</td>
                    <td className="border border-gray-300 p-2">
                      <Textarea
                        value={ddrData.nomeComercial}
                        onChange={(e) => handleDdrInputChange('nomeComercial', e.target.value)}
                        className="w-full min-h-[60px]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">Registro MS</td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        value={ddrData.registroMS}
                        onChange={(e) => handleDdrInputChange('registroMS', e.target.value)}
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Seção: Declarações Obrigatórias */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">DECLARAÇÕES OBRIGATÓRIAS</h3>
              
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="naoComercio"
                    checked={ddrData.naoComercio}
                    onCheckedChange={(checked) => handleDdrInputChange('naoComercio', checked)}
                  />
                  <Label htmlFor="naoComercio" className="text-sm">
                    Declara que o produto não se destina à comercialização
                  </Label>
                </div>
              </div>

              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rastreabilidade"
                    checked={ddrData.rastreabilidade}
                    onCheckedChange={(checked) => handleDdrInputChange('rastreabilidade', checked)}
                  />
                  <Label htmlFor="rastreabilidade" className="text-sm font-semibold">
                    Declara rastreabilidade do produto
                  </Label>
                </div>
                {ddrData.rastreabilidade && (
                  <Textarea
                    value={ddrData.textoRastreabilidade}
                    onChange={(e) => handleDdrInputChange('textoRastreabilidade', e.target.value)}
                    className="mt-2 text-sm"
                    rows={2}
                  />
                )}
              </div>

              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="normasSanitarias"
                    checked={ddrData.normasSanitarias}
                    onCheckedChange={(checked) => handleDdrInputChange('normasSanitarias', checked)}
                  />
                  <Label htmlFor="normasSanitarias" className="text-sm font-semibold">
                    Declara observância das normas sanitárias
                  </Label>
                </div>
                {ddrData.normasSanitarias && (
                  <Textarea
                    value={ddrData.textoNormasSanitarias}
                    onChange={(e) => handleDdrInputChange('textoNormasSanitarias', e.target.value)}
                    className="mt-2 text-sm"
                    rows={2}
                  />
                )}
              </div>

              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="declaracaoValida"
                    checked={ddrData.declaracaoValida}
                    onCheckedChange={(checked) => handleDdrInputChange('declaracaoValida', checked)}
                  />
                  <Label htmlFor="declaracaoValida" className="text-sm">
                    Declara que esta declaração é válida
                  </Label>
                </div>
              </div>
            </div>

            {/* Seção: Assinatura e Informações do Responsável */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">ASSINATURA E INFORMAÇÕES DO RESPONSÁVEL</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavelNome">Nome do Responsável</Label>
                  <Input
                    id="responsavelNome"
                    value={ddrData.responsavelNome}
                    onChange={(e) => handleDdrInputChange('responsavelNome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelFuncao">Função</Label>
                  <Input
                    id="responsavelFuncao"
                    value={ddrData.responsavelFuncao}
                    onChange={(e) => handleDdrInputChange('responsavelFuncao', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelCrq">CRQ</Label>
                  <Input
                    id="responsavelCrq"
                    value={ddrData.responsavelCrq}
                    onChange={(e) => handleDdrInputChange('responsavelCrq', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataDeclaracao">Data da Declaração</Label>
                  <Input
                    id="dataDeclaracao"
                    value={ddrData.dataDeclaracao}
                    onChange={(e) => handleDdrInputChange('dataDeclaracao', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidadeEstado">Cidade - Estado</Label>
                  <Input
                    id="cidadeEstado"
                    value={ddrData.cidadeEstado}
                    onChange={(e) => handleDdrInputChange('cidadeEstado', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusDocumento">Status do Documento</Label>
                  <Select 
                    value={ddrData.statusDocumento} 
                    onValueChange={(value) => handleDdrInputChange('statusDocumento', value)}
                  >
                    <SelectTrigger>
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
