import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Relato {
  id: string;
  data: string;
  tipo: 'email' | 'telefonema';
  contato: string;
  assunto: string;
  descricao: string;
}

export const EmailsTelefonemesTab = () => {
  const { toast } = useToast();
  const [relatos, setRelatos] = useState<Relato[]>([
    {
      id: '1',
      data: '2025-01-15',
      tipo: 'email',
      contato: 'cliente@exemplo.com',
      assunto: 'Problema com lote 12345',
      descricao: 'Cliente relatou que o produto do lote 12345 apresentou não conformidade na embalagem. Solicitou informações sobre procedimento de devolução.'
    },
    {
      id: '2',
      data: '2025-01-18',
      tipo: 'telefonema',
      contato: 'João Silva - (11) 98765-4321',
      assunto: 'Dúvida sobre temperatura de armazenamento',
      descricao: 'Cliente ligou questionando a temperatura ideal para armazenamento do produto XYZ. Foi orientado conforme POP-ARM-001.'
    }
  ]);

  const [novoRelato, setNovoRelato] = useState<Omit<Relato, 'id'>>({
    data: new Date().toISOString().split('T')[0],
    tipo: 'email',
    contato: '',
    assunto: '',
    descricao: ''
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const adicionarRelato = () => {
    if (!novoRelato.contato || !novoRelato.assunto || !novoRelato.descricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de adicionar o relato.",
        variant: "destructive"
      });
      return;
    }

    const relato: Relato = {
      ...novoRelato,
      id: Date.now().toString()
    };

    setRelatos([relato, ...relatos]);
    setNovoRelato({
      data: new Date().toISOString().split('T')[0],
      tipo: 'email',
      contato: '',
      assunto: '',
      descricao: ''
    });
    setMostrarFormulario(false);

    toast({
      title: "Relato adicionado",
      description: "O relato foi registrado com sucesso."
    });
  };

  const excluirRelato = (id: string) => {
    setRelatos(relatos.filter(r => r.id !== id));
    toast({
      title: "Relato excluído",
      description: "O relato foi removido com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">E-mails e Telefonemas</h3>
          <p className="text-sm text-muted-foreground">
            Registre problemas reportados por e-mail ou telefone
          </p>
        </div>
        <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Relato
        </Button>
      </div>

      {mostrarFormulario && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={novoRelato.data}
                  onChange={(e) => setNovoRelato({ ...novoRelato, data: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Contato</Label>
                <select
                  id="tipo"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={novoRelato.tipo}
                  onChange={(e) => setNovoRelato({ ...novoRelato, tipo: e.target.value as 'email' | 'telefonema' })}
                >
                  <option value="email">E-mail</option>
                  <option value="telefonema">Telefonema</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contato">Contato (E-mail ou Telefone)</Label>
              <Input
                id="contato"
                placeholder="exemplo@email.com ou (11) 98765-4321"
                value={novoRelato.contato}
                onChange={(e) => setNovoRelato({ ...novoRelato, contato: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Input
                id="assunto"
                placeholder="Resumo do problema"
                value={novoRelato.assunto}
                onChange={(e) => setNovoRelato({ ...novoRelato, assunto: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do Problema</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva detalhadamente o problema relatado..."
                rows={6}
                value={novoRelato.descricao}
                onChange={(e) => setNovoRelato({ ...novoRelato, descricao: e.target.value })}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarRelato}>
                Adicionar Relato
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {relatos.map((relato) => (
          <Card key={relato.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${relato.tipo === 'email' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'}`}>
                    {relato.tipo === 'email' ? (
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{relato.assunto}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(relato.data).toLocaleDateString('pt-BR')}
                      </span>
                      <span>{relato.contato}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => excluirRelato(relato.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="pl-14">
                <p className="text-sm whitespace-pre-wrap">{relato.descricao}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
