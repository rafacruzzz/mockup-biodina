
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Download, Trash2, Eye, Calendar, User, AlertTriangle, CheckCircle, Clock, FileCheck } from "lucide-react";
import { DocumentoAnexo, Documentacao, ColaboradorData } from "@/types/colaborador";
import { gerarPDFDocumentacao } from "../utils/documentacaoPDF";

interface DocumentacaoTabProps {
  formData: Documentacao;
  onInputChange: (field: string, value: any) => void;
  colaboradorData?: ColaboradorData;
}

const DocumentacaoTab = ({ formData, onInputChange, colaboradorData }: DocumentacaoTabProps) => {
  const [novoDocumento, setNovoDocumento] = useState<Partial<DocumentoAnexo>>({
    categoria: '',
    observacoes: '',
    validadeIndeterminada: true
  });

  const categorias = [
    'RG',
    'CPF', 
    'Carteira de Trabalho',
    'Comprovante de Residência',
    'Título de Eleitor',
    'Certificado de Reservista',
    'CNH',
    'Certidões Negativas',
    'Diploma/Certificado',
    'Comprovante de Escolaridade',
    'Exames Médicos',
    'Declaração de Imposto de Renda',
    'Certidão de Nascimento/Casamento',
    'Documentos dos Dependentes',
    'Foto Fundo Branco',
    'ASO - Atestado de Saúde Ocupacional',
    'Comprovante de Vacinação',
    'Exame Admissional',
    'Outros'
  ];

  const categoriasObrigatorias = [
    'RG',
    'CPF',
    'Carteira de Trabalho', 
    'Comprovante de Residência',
    'Título de Eleitor',
    'Foto Fundo Branco',
    'ASO - Atestado de Saúde Ocupacional'
  ];

  const calcularStatusValidade = (documento: DocumentoAnexo): 'valido' | 'vencendo' | 'vencido' => {
    if (documento.validadeIndeterminada || !documento.dataValidade) return 'valido';
    
    const hoje = new Date();
    const validade = new Date(documento.dataValidade);
    const diasParaVencer = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    if (diasParaVencer < 0) return 'vencido';
    if (diasParaVencer <= 30) return 'vencendo';
    return 'valido';
  };

  const verificarDocumentosObrigatorios = (): boolean => {
    return categoriasObrigatorias.every(categoria => 
      formData.anexos.some(doc => doc.categoria === categoria)
    );
  };

  const calcularProgresso = (): number => {
    const obrigatoriosCompletos = categoriasObrigatorias.filter(categoria =>
      formData.anexos.some(doc => doc.categoria === categoria)
    ).length;
    return Math.round((obrigatoriosCompletos / categoriasObrigatorias.length) * 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Arquivo muito grande. O tamanho máximo é 10MB.');
      return;
    }

    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString().split('T')[0],
      categoria: novoDocumento.categoria || 'Outros',
      observacoes: novoDocumento.observacoes || '',
      arquivo: file,
      dataValidade: novoDocumento.dataValidade,
      validadeIndeterminada: novoDocumento.validadeIndeterminada || false
    };

    const novosAnexos = [...formData.anexos, documento];
    onInputChange('anexos', novosAnexos);

    // Reset form
    setNovoDocumento({ categoria: '', observacoes: '', validadeIndeterminada: true });
    event.target.value = '';
  };

  const removeDocumento = (id: string) => {
    const novosAnexos = formData.anexos.filter(doc => doc.id !== id);
    onInputChange('anexos', novosAnexos);
  };

  const handleGerarPDF = () => {
    if (colaboradorData) {
      gerarPDFDocumentacao(colaboradorData);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (tipo: string) => {
    if (tipo.includes('image')) return '🖼️';
    if (tipo.includes('pdf')) return '📄';
    if (tipo.includes('word')) return '📝';
    if (tipo.includes('excel') || tipo.includes('spreadsheet')) return '📊';
    return '📎';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'vencido': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'vencendo': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'valido': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <FileCheck className="h-4 w-4 text-gray-500" />;
    }
  };

  const podeGerarPDF = verificarDocumentosObrigatorios() && 
                       formData.solicitadoParaDPEm && 
                       formData.solicitadoPor && 
                       formData.motivoContratacao;

  return (
    <div className="space-y-6">
      {/* Informações para DP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações para DP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="solicitadoParaDPEm">Solicitado para o DP em *</Label>
              <Input
                id="solicitadoParaDPEm"
                type="date"
                value={formData.solicitadoParaDPEm || ''}
                onChange={(e) => onInputChange('solicitadoParaDPEm', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="solicitadoPor">Solicitado por (nome do gestor) *</Label>
              <Input
                id="solicitadoPor"
                value={formData.solicitadoPor || ''}
                onChange={(e) => onInputChange('solicitadoPor', e.target.value)}
                placeholder="Nome do gestor responsável"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="motivoContratacao">Motivo da contratação *</Label>
            <Textarea
              id="motivoContratacao"
              value={formData.motivoContratacao || ''}
              onChange={(e) => onInputChange('motivoContratacao', e.target.value)}
              placeholder="Descreva o motivo da contratação"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="observacoesGerais">Observações Gerais</Label>
            <Textarea
              id="observacoesGerais"
              value={formData.observacoesGerais || ''}
              onChange={(e) => onInputChange('observacoesGerais', e.target.value)}
              placeholder="Observações adicionais (opcional)"
              rows={3}
            />
          </div>

          {/* Exame Admissional */}
          <div className="border-t pt-4">
            <Label className="text-sm font-semibold">Exame Admissional</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="exameData">Data</Label>
                <Input
                  id="exameData"
                  type="date"
                  value={formData.exameAdmissional?.data || ''}
                  onChange={(e) => onInputChange('exameAdmissional', {
                    ...formData.exameAdmissional,
                    data: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="exameLocal">Local</Label>
                <Input
                  id="exameLocal"
                  value={formData.exameAdmissional?.local || ''}
                  onChange={(e) => onInputChange('exameAdmissional', {
                    ...formData.exameAdmissional,
                    local: e.target.value
                  })}
                  placeholder="Local do exame"
                />
              </div>
              <div>
                <Label htmlFor="exameHorario">Horário</Label>
                <Input
                  id="exameHorario"
                  type="time"
                  value={formData.exameAdmissional?.horario || ''}
                  onChange={(e) => onInputChange('exameAdmissional', {
                    ...formData.exameAdmissional,
                    horario: e.target.value
                  })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status da Documentação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Status da Documentação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Documentos Obrigatórios</span>
                <span className="text-sm text-gray-600">{calcularProgresso()}% completo</span>
              </div>
              <Progress value={calcularProgresso()} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {categoriasObrigatorias.map((categoria) => {
                const possuiDocumento = formData.anexos.some(doc => doc.categoria === categoria);
                return (
                  <div key={categoria} className={`p-2 rounded text-center ${
                    possuiDocumento ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {possuiDocumento ? '✅' : '❌'} {categoria}
                  </div>
                );
              })}
            </div>

            {podeGerarPDF && (
              <Button 
                onClick={handleGerarPDF}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar PDF para DP
              </Button>
            )}

            {!podeGerarPDF && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  Para gerar o PDF, é necessário:
                </p>
                <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside">
                  {!verificarDocumentosObrigatorios() && <li>Anexar todos os documentos obrigatórios</li>}
                  {!formData.solicitadoParaDPEm && <li>Informar a data de solicitação para o DP</li>}
                  {!formData.solicitadoPor && <li>Informar o nome do solicitante</li>}
                  {!formData.motivoContratacao && <li>Informar o motivo da contratação</li>}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload de novo documento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Adicionar Documento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select 
                value={novoDocumento.categoria} 
                onValueChange={(value) => setNovoDocumento(prev => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      <div className="flex items-center gap-2">
                        {categoria}
                        {categoriasObrigatorias.includes(categoria) && (
                          <Badge variant="destructive" className="text-xs">OBRIGATÓRIO</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="arquivo">Arquivo *</Label>
              <Input
                id="arquivo"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xls,.xlsx"
                disabled={!novoDocumento.categoria}
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, GIF, XLS, XLSX. Máximo: 10MB
              </p>
            </div>
          </div>

          {/* Campos de Validade */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                id="validadeIndeterminada"
                checked={novoDocumento.validadeIndeterminada}
                onCheckedChange={(checked) => 
                  setNovoDocumento(prev => ({ 
                    ...prev, 
                    validadeIndeterminada: !!checked,
                    dataValidade: checked ? undefined : prev.dataValidade
                  }))
                }
              />
              <Label htmlFor="validadeIndeterminada" className="text-sm">
                Validade indeterminada
              </Label>
            </div>

            {!novoDocumento.validadeIndeterminada && (
              <div>
                <Label htmlFor="dataValidade">Data de Validade</Label>
                <Input
                  id="dataValidade"
                  type="date"
                  value={novoDocumento.dataValidade || ''}
                  onChange={(e) => setNovoDocumento(prev => ({ ...prev, dataValidade: e.target.value }))}
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={novoDocumento.observacoes}
              onChange={(e) => setNovoDocumento(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações sobre o documento (opcional)"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Anexados ({formData.anexos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.anexos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum documento anexado</p>
              <p className="text-sm">Adicione documentos usando o formulário acima</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.anexos.map((documento) => {
                const statusValidade = calcularStatusValidade(documento);
                const isObrigatorio = categoriasObrigatorias.includes(documento.categoria);
                
                return (
                  <div key={documento.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{getFileIcon(documento.tipo)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{documento.nome}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {documento.categoria}
                          </Badge>
                          {isObrigatorio && (
                            <Badge variant="destructive" className="text-xs">OBRIGATÓRIO</Badge>
                          )}
                          {getStatusIcon(statusValidade)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{formatFileSize(documento.tamanho)}</span>
                          <span>Adicionado em {new Date(documento.dataUpload).toLocaleDateString()}</span>
                          {documento.validadeIndeterminada ? (
                            <span className="text-green-600">Validade: Indeterminada</span>
                          ) : documento.dataValidade ? (
                            <span className={`${
                              statusValidade === 'vencido' ? 'text-red-600' :
                              statusValidade === 'vencendo' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              Validade: {new Date(documento.dataValidade).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-gray-500">Validade: Não informada</span>
                          )}
                        </div>
                        {documento.observacoes && (
                          <p className="text-xs text-gray-600 mt-1">{documento.observacoes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (documento.arquivo) {
                            const url = URL.createObjectURL(documento.arquivo);
                            window.open(url, '_blank');
                          }
                        }}
                        disabled={!documento.arquivo}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (documento.arquivo) {
                            const url = URL.createObjectURL(documento.arquivo);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = documento.nome;
                            a.click();
                          }
                        }}
                        disabled={!documento.arquivo}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocumento(documento.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo */}
      {formData.anexos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Resumo dos Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categorias.map((categoria) => {
                const documentos = formData.anexos.filter(doc => doc.categoria === categoria);
                const count = documentos.length;
                const vencidos = documentos.filter(doc => calcularStatusValidade(doc) === 'vencido').length;
                const vencendo = documentos.filter(doc => calcularStatusValidade(doc) === 'vencendo').length;
                
                return count > 0 ? (
                  <div key={categoria} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-lg">{count}</p>
                    <p className="text-xs text-gray-600">{categoria}</p>
                    {(vencidos > 0 || vencendo > 0) && (
                      <div className="text-xs mt-1">
                        {vencidos > 0 && <span className="text-red-600">{vencidos} vencido(s)</span>}
                        {vencendo > 0 && <span className="text-yellow-600">{vencendo} vencendo</span>}
                      </div>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentacaoTab;
