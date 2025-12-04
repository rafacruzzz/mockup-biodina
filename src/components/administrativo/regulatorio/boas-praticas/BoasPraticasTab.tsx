import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Eye, Edit, FileCheck, AlertCircle } from 'lucide-react';
import { NovoCertificadoBPModal } from './NovoCertificadoBPModal';
import { mockCertificados } from '@/data/boasPraticas';
import { CertificadoBoasPraticas, getStatusLabel, getStatusColor, getAlertaVencimento } from '@/types/boasPraticas';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const BoasPraticasTab = () => {
  const [certificados, setCertificados] = useState<CertificadoBoasPraticas[]>(mockCertificados);
  const [modalOpen, setModalOpen] = useState(false);
  const [certificadoEdit, setCertificadoEdit] = useState<CertificadoBoasPraticas | undefined>();

  const handleNovoCertificado = () => {
    setCertificadoEdit(undefined);
    setModalOpen(true);
  };

  const handleEditarCertificado = (cert: CertificadoBoasPraticas) => {
    setCertificadoEdit(cert);
    setModalOpen(true);
  };

  const handleSalvarCertificado = (certificado: CertificadoBoasPraticas) => {
    if (certificadoEdit) {
      setCertificados(certificados.map(c => c.id === certificado.id ? certificado : c));
    } else {
      setCertificados([...certificados, certificado]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com botão de novo certificado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Certificados de Boas Práticas</h2>
          <p className="text-muted-foreground mt-1">
            Gerencie a documentação e informações regulatórias dos certificados BPF
          </p>
        </div>
        <Button onClick={handleNovoCertificado} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Novo Certificado
        </Button>
      </div>

      {/* Lista de Certificados */}
      {certificados.length === 0 ? (
        <Card className="p-12 text-center">
          <FileCheck className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Nenhum certificado cadastrado</h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando seu primeiro certificado de boas práticas
          </p>
          <Button onClick={handleNovoCertificado}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Primeiro Certificado
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {certificados.map((cert) => {
            const alerta = getAlertaVencimento(cert.validade);
            
            return (
              <Card key={cert.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-4">
                      <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-lg">{cert.nomeArquivoPrincipal}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                            {getStatusLabel(cert.status)}
                          </span>
                          {alerta.tipo && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              alerta.tipo === 'danger' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              <AlertCircle className="h-3 w-3" />
                              {alerta.mensagem}
                            </span>
                          )}
                        </div>
                        
                        {cert.fabricanteLegal && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Fabricante: {cert.fabricanteLegal}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Processo ANVISA:</span>
                            <p className="font-medium">{cert.numeroProcessoAnvisa}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assunto:</span>
                            <p className="font-medium truncate">{cert.assunto}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Data de Envio:</span>
                            <p className="font-medium">
                              {format(new Date(cert.dataEnvio), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </p>
                          </div>
                          {cert.dataPublicacaoDOU && (
                            <div>
                              <span className="text-muted-foreground">Publicação DOU:</span>
                              <p className="font-medium">
                                {format(new Date(cert.dataPublicacaoDOU), "dd/MM/yyyy", { locale: ptBR })}
                                {cert.numeroPublicacaoDOU && ` - Nº ${cert.numeroPublicacaoDOU}`}
                              </p>
                            </div>
                          )}
                          {cert.validade && (
                            <div>
                              <span className="text-muted-foreground">Validade:</span>
                              <p className="font-medium">
                                {format(new Date(cert.validade), "dd/MM/yyyy", { locale: ptBR })}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {cert.observacaoGeral && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-md">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {cert.observacaoGeral}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditarCertificado(cert)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <NovoCertificadoBPModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSalvarCertificado}
        certificadoEdit={certificadoEdit}
      />
    </div>
  );
};
