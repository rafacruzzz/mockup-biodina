import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, AlertTriangle, FileUp, Bell, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import CustomAlertModal from './CustomAlertModal';

interface PackingListFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PackingListForm = ({ formData, onInputChange }: PackingListFormProps) => {
  const [packingListRecebido, setPackingListRecebido] = useState('');
  const [packingListFile, setPackingListFile] = useState<File | null>(null);
  const [usuarioResponsavel, setUsuarioResponsavel] = useState('');
  const [clienteAprovou, setClienteAprovou] = useState('');
  const [motivoNaoAprovacao, setMotivoNaoAprovacao] = useState('');
  const [documentacaoFinalRecebida, setDocumentacaoFinalRecebida] = useState('');
  const [documentacaoFile, setDocumentacaoFile] = useState<File | null>(null);
  const [motivoSemDocumentacao, setMotivoSemDocumentacao] = useState('');
  const [clienteRecebeuDocumentacao, setClienteRecebeuDocumentacao] = useState('');
  const [motivoClienteNaoRecebeu, setMotivoClienteNaoRecebeu] = useState('');
  const [liImportada, setLiImportada] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [packingListAprovado, setPackingListAprovado] = useState('');
  const [showReenvioAlert, setShowReenvioAlert] = useState(false);

  // Lista de produtos/mercadorias (mock)
  const [produtos, setProdutos] = useState([
    { id: 1, codigo: 'PROD001', nome: 'Equipamento A', quantidade: 5, valor: 'R$ 15.000,00', validade: '2025-12-31', aprovado: true },
    { id: 2, codigo: 'PROD002', nome: 'Componente B', quantidade: 10, valor: 'R$ 2.500,00', validade: '2025-10-15', aprovado: true },
    { id: 3, codigo: 'PROD003', nome: 'Acessório C', quantidade: 3, valor: 'R$ 800,00', validade: '2025-11-20', aprovado: true },
  ]);

  // Lista de usuários do sistema (mock)
  const usuarios = [
    'João Silva',
    'Maria Santos', 
    'Carlos Oliveira',
    'Ana Costa',
    'Faber Oliveira'
  ];

  // Função para resetar todo o formulário
  const resetForm = () => {
    setPackingListRecebido('');
    setPackingListFile(null);
    setUsuarioResponsavel('');
    setClienteAprovou('');
    setMotivoNaoAprovacao('');
    setDocumentacaoFinalRecebida('');
    setDocumentacaoFile(null);
    setMotivoSemDocumentacao('');
    setClienteRecebeuDocumentacao('');
    setMotivoClienteNaoRecebeu('');
    setLiImportada(false);
    setIsNotifying(false);
    setNotificationSent(false);
    setPackingListAprovado('');
    // Resetar produtos para o estado inicial
    setProdutos([
      { id: 1, codigo: 'PROD001', nome: 'Equipamento A', quantidade: 5, valor: 'R$ 15.000,00', validade: '2025-12-31', aprovado: true },
      { id: 2, codigo: 'PROD002', nome: 'Componente B', quantidade: 10, valor: 'R$ 2.500,00', validade: '2025-10-15', aprovado: true },
      { id: 3, codigo: 'PROD003', nome: 'Acessório C', quantidade: 3, valor: 'R$ 800,00', validade: '2025-11-20', aprovado: true },
    ]);
  };

  const handlePackingListFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPackingListFile(file);
      console.log('Packing List anexado:', file.name);
    }
  };

  const handleDocumentacaoFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentacaoFile(file);
      console.log('Documentação final anexada:', file.name);
    }
  };

  const handleClienteNaoAprovou = () => {
    if (motivoNaoAprovacao.trim()) {
      setShowCustomAlert(true);
      console.log('Cliente não aprovou. Motivo:', motivoNaoAprovacao);
    }
  };

  const handleAlertConfirm = () => {
    setShowCustomAlert(false);
    console.log('Redirecionando para aba SPI...');
  };

  const handleImportarLI = () => {
    setLiImportada(true);
    console.log('LI importada - ativando aba DDR');
  };

  const handleNotifyUser = async () => {
    if (!usuarioResponsavel) return;
    
    setIsNotifying(true);
    setNotificationSent(false);
    
    // Simular delay de envio
    setTimeout(() => {
      setIsNotifying(false);
      setNotificationSent(true);
      console.log(`Notificação enviada para ${usuarioResponsavel}`);
    }, 2000);
  };

  const handleProdutoAprovadoChange = (produtoId: number, aprovado: boolean) => {
    setProdutos(prevProdutos =>
      prevProdutos.map(produto =>
        produto.id === produtoId ? { ...produto, aprovado } : produto
      )
    );
  };

  const handleReenviarPackingList = () => {
    setShowReenvioAlert(true);
    console.log('Reenviando Packing List ou Validades (Fábrica)');
  };

  const handleReenvioAlertConfirm = () => {
    setShowReenvioAlert(false);
    console.log('Histórico da operação de reenvio gerado');
    // Resetar o formulário após confirmar o reenvio
    resetForm();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            PACKING LIST OU VALIDADES
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="border p-4 rounded bg-purple-50">
            <h3 className="font-bold mb-4 text-lg text-purple-700">Packing List ou Validades (Fábrica)</h3>
          </div>

          {/* Packing List Recebido */}
          <div className="border p-4 rounded">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Packing list recebido:</Label>
                <Select value={packingListRecebido} onValueChange={setPackingListRecebido}>
                  <SelectTrigger className="w-48 mt-2">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {packingListRecebido === 'sim' && (
                <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                  <Label className="block mb-2 font-medium">Upload do Packing List</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="packingListFile"
                      onChange={handlePackingListFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <Button
                      onClick={() => document.getElementById('packingListFile')?.click()}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Anexar Packing List
                    </Button>
                    {packingListFile && (
                      <span className="text-sm text-green-600">
                        ✓ {packingListFile.name}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Campos que só aparecem após upload do packing list */}
          {packingListRecebido === 'sim' && packingListFile && (
            <>
              {/* Usuário Responsável */}
              <div className="border p-4 rounded">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Selecionar usuário responsável para verificar itens do Packing list:</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Select value={usuarioResponsavel} onValueChange={setUsuarioResponsavel}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Selecione o usuário responsável" />
                        </SelectTrigger>
                        <SelectContent>
                          {usuarios.map((usuario) => (
                            <SelectItem key={usuario} value={usuario}>
                              {usuario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Button
                        onClick={handleNotifyUser}
                        disabled={!usuarioResponsavel || isNotifying}
                        className="bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50"
                      >
                        {isNotifying ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Notificando...
                          </div>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Notificar
                          </>
                        )}
                      </Button>
                      
                      {notificationSent && (
                        <span className="text-green-600 font-medium text-sm">
                          ✓ Alerta enviado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-600 mt-2 italic">
                      ℹ️ Este processo está gerando histórico na sub-aba Histórico/Chat na aba principal COMERCIAL
                    </p>
                  </div>
                </div>
              </div>

              {/* Cliente Aprovou */}
              <div className="border p-4 rounded">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Cliente aprovou?</Label>
                    <Select value={clienteAprovou} onValueChange={setClienteAprovou}>
                      <SelectTrigger className="w-48 mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {clienteAprovou === 'nao' && (
                    <div className="space-y-6">
                      {/* Tabela de Produtos/Mercadorias */}
                      <div className="border rounded-lg p-4">
                        <Label className="block mb-4 font-semibold text-lg">Lista de Produtos/Mercadorias</Label>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Código</TableHead>
                              <TableHead>Nome</TableHead>
                              <TableHead>Quantidade</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead>Validade</TableHead>
                              <TableHead>Aprovado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {produtos.map((produto) => (
                              <TableRow key={produto.id}>
                                <TableCell className="font-medium">{produto.codigo}</TableCell>
                                <TableCell>{produto.nome}</TableCell>
                                <TableCell>{produto.quantidade}</TableCell>
                                <TableCell>{produto.valor}</TableCell>
                                <TableCell>{produto.validade}</TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={produto.aprovado}
                                    onCheckedChange={(checked) => 
                                      handleProdutoAprovadoChange(produto.id, checked as boolean)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Packing List Aprovado */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-semibold">Packing List aprovado?</Label>
                          <Select value={packingListAprovado} onValueChange={setPackingListAprovado}>
                            <SelectTrigger className="w-48 mt-2">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Botão Reenviar - aparece quando packingListAprovado for "nao" */}
                        {packingListAprovado === 'nao' && (
                          <div className="pt-4">
                            <Button
                              onClick={handleReenviarPackingList}
                              className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reenviar Packing List ou Validades (Fábrica)
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {clienteAprovou === 'sim' && (
                    <p className="text-sm text-blue-600 italic">
                      ℹ️ Este processo está gerando histórico na sub-aba Histórico/Chat na aba principal COMERCIAL
                    </p>
                  )}
                </div>
              </div>

              {/* Documentação Final de Embarque - só aparece se clienteAprovou = "sim" OU packingListAprovado = "sim" */}
              {(clienteAprovou === 'sim' || packingListAprovado === 'sim') && (
                <div className="border p-4 rounded">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Recebeu da fábrica a documentação final de embarque:</Label>
                      <Select value={documentacaoFinalRecebida} onValueChange={setDocumentacaoFinalRecebida}>
                        <SelectTrigger className="w-48 mt-2">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {documentacaoFinalRecebida === 'sim' && (
                      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                        <Label className="block mb-2 font-medium">Upload da Documentação Final</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            id="documentacaoFile"
                            onChange={handleDocumentacaoFileUpload}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                          />
                          <Button
                            onClick={() => document.getElementById('documentacaoFile')?.click()}
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Anexar Documentação
                          </Button>
                          {documentacaoFile && (
                            <span className="text-sm text-green-600">
                              ✓ {documentacaoFile.name}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {documentacaoFinalRecebida === 'nao' && (
                      <div>
                        <Label className="block mb-2 font-medium">Motivo:</Label>
                        <Textarea
                          value={motivoSemDocumentacao}
                          onChange={(e) => setMotivoSemDocumentacao(e.target.value)}
                          placeholder="Digite o motivo de não ter recebido a documentação..."
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cliente Recebeu Documentação */}
              {documentacaoFinalRecebida === 'sim' && documentacaoFile && (
                <div className="border p-4 rounded">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Cliente recebeu a documentação?</Label>
                      <Select value={clienteRecebeuDocumentacao} onValueChange={setClienteRecebeuDocumentacao}>
                        <SelectTrigger className="w-48 mt-2">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {clienteRecebeuDocumentacao === 'nao' && (
                      <div>
                        <Label className="block mb-2 font-medium">Motivo:</Label>
                        <Textarea
                          value={motivoClienteNaoRecebeu}
                          onChange={(e) => setMotivoClienteNaoRecebeu(e.target.value)}
                          placeholder="Digite o motivo do cliente não ter recebido a documentação..."
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    )}

                    {clienteRecebeuDocumentacao === 'sim' && (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded">
                          <p className="text-green-700 font-medium">
                            ✓ Processo de Packing List concluído com sucesso!
                          </p>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button
                            onClick={handleImportarLI}
                            className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3"
                          >
                            <FileUp className="h-4 w-4 mr-2" />
                            Importar LI
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modal de Alerta Customizado */}
      <CustomAlertModal
        isOpen={showCustomAlert}
        title="Atenção"
        message="Você precisa voltar na aba SPI para revisar os itens do pedido."
        onConfirm={handleAlertConfirm}
      />

      {/* Modal de Alerta para Reenvio */}
      <CustomAlertModal
        isOpen={showReenvioAlert}
        title="Reenvio Confirmado"
        message="Foi gerado um histórico da operação de reenvio do Packing List ou Validades (Fábrica)."
        onConfirm={handleReenvioAlertConfirm}
      />
    </div>
  );
};

export default PackingListForm;
