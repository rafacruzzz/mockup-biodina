
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, Building2, Users, Mail, Phone, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Curriculo } from '@/types/processoSeletivo';

const CandidaturaPublica = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [dadosCurriculo, setDadosCurriculo] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    departamento: '',
    cargoDesejado: '',
    experiencia: '',
    escolaridade: '',
    habilidades: '',
    observacoes: ''
  });

  const [arquivo, setArquivo] = useState<File | null>(null);

  const departamentos = [
    'Tecnologia',
    'Comercial',
    'Financeiro',
    'Recursos Humanos',
    'Produção',
    'Marketing',
    'Logística'
  ];

  const niveisExperiencia = [
    'Sem experiência',
    'Até 1 ano',
    '1-2 anos',
    '2-5 anos',
    '5-10 anos',
    'Mais de 10 anos'
  ];

  const niveisEscolaridade = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Técnico',
    'Superior Incompleto',
    'Superior Completo',
    'Pós-graduação',
    'Mestrado',
    'Doutorado'
  ];

  const handleInputChange = (field: string, value: string) => {
    setDadosCurriculo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArquivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive"
        });
        return;
      }
      
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: "Formato inválido",
          description: "Apenas arquivos PDF, DOC e DOCX são aceitos",
          variant: "destructive"
        });
        return;
      }
      
      setArquivo(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEnviando(true);

    // Validações básicas
    if (!dadosCurriculo.nome || !dadosCurriculo.email || !dadosCurriculo.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      setEnviando(false);
      return;
    }

    try {
      // Simular envio para o backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const novoCurriculo: Omit<Curriculo, 'id'> = {
        ...dadosCurriculo,
        habilidades: dadosCurriculo.habilidades.split(',').map(h => h.trim()).filter(h => h),
        dataEnvio: new Date().toISOString(),
        status: 'novo',
        fonte: 'site',
        arquivoCurriculo: arquivo?.name
      };

      console.log('Currículo enviado:', novoCurriculo);
      
      setEnviado(true);
      
      toast({
        title: "Currículo enviado com sucesso!",
        description: "Entraremos em contato em breve."
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde",
        variant: "destructive"
      });
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-biodina-blue/5 to-biodina-gold/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Currículo Enviado!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Seu currículo foi recebido com sucesso. Nossa equipe de RH irá analisá-lo e entrar em contato em breve.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Guarde este número de protocolo: <strong>{Date.now().toString().slice(-6)}</strong>
            </p>
            <Button 
              onClick={() => window.close()}
              className="w-full bg-biodina-blue hover:bg-biodina-blue/90"
            >
              Fechar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-biodina-blue/5 to-biodina-gold/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-biodina-blue" />
            <h1 className="text-3xl font-bold text-gray-900">Trabalhe Conosco</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos sempre em busca de talentos excepcionais. Envie seu currículo e faça parte da nossa equipe!
          </p>
        </div>

        {/* Informações da Vaga */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-biodina-blue" />
              Oportunidades Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-biodina-blue/10 text-biodina-blue border-biodina-blue/20">
                  Múltiplas Vagas
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-biodina-gold/10 text-biodina-gold border-biodina-gold/20">
                  Todos os Níveis
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  CLT e PJ
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-biodina-blue" />
              Cadastre seu Currículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Dados Pessoais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      value={dadosCurriculo.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={dadosCurriculo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={dadosCurriculo.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={dadosCurriculo.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              {/* Dados Profissionais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Dados Profissionais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departamento">Área de Interesse</Label>
                    <Select 
                      value={dadosCurriculo.departamento} 
                      onValueChange={(value) => handleInputChange('departamento', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map(dept => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="cargo">Cargo Desejado</Label>
                    <Input
                      id="cargo"
                      value={dadosCurriculo.cargoDesejado}
                      onChange={(e) => handleInputChange('cargoDesejado', e.target.value)}
                      placeholder="Ex: Analista de Sistemas"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experiencia">Experiência</Label>
                    <Select 
                      value={dadosCurriculo.experiencia} 
                      onValueChange={(value) => handleInputChange('experiencia', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tempo de experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveisExperiencia.map(exp => (
                          <SelectItem key={exp} value={exp}>
                            {exp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="escolaridade">Escolaridade</Label>
                    <Select 
                      value={dadosCurriculo.escolaridade} 
                      onValueChange={(value) => handleInputChange('escolaridade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nível de escolaridade" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveisEscolaridade.map(esc => (
                          <SelectItem key={esc} value={esc}>
                            {esc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="habilidades">Habilidades</Label>
                  <Input
                    id="habilidades"
                    value={dadosCurriculo.habilidades}
                    onChange={(e) => handleInputChange('habilidades', e.target.value)}
                    placeholder="Ex: Excel, SAP, Vendas, Negociação (separar por vírgula)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separe as habilidades por vírgula</p>
                </div>
                
                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={dadosCurriculo.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Conte-nos um pouco mais sobre você, seus objetivos e experiências relevantes..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Upload de Currículo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Anexar Currículo
                </h3>
                
                <div>
                  <Label htmlFor="arquivo">Currículo (PDF, DOC, DOCX)</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="arquivo"
                      accept=".pdf,.doc,.docx"
                      onChange={handleArquivoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="arquivo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Clique para anexar</span> ou arraste seu currículo
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC ou DOCX (Máx. 10MB)</p>
                      </div>
                    </label>
                  </div>
                  
                  {arquivo && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-700">
                        📎 {arquivo.name} ({(arquivo.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  type="submit" 
                  disabled={enviando}
                  className="px-8 bg-biodina-blue hover:bg-biodina-blue/90"
                >
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Currículo
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Seus dados serão tratados com total confidencialidade conforme nossa política de privacidade.</p>
        </div>
      </div>
    </div>
  );
};

export default CandidaturaPublica;
