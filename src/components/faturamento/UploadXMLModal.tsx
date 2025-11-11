import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadXMLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: any) => void;
}

const UploadXMLModal = ({ isOpen, onClose, onUpload }: UploadXMLModalProps) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.xml')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo XML válido.",
          variant: "destructive"
        });
        return;
      }
      setArquivo(file);
    }
  };

  const handleImport = async () => {
    if (!arquivo) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo XML.",
        variant: "destructive"
      });
      return;
    }

    setCarregando(true);

    try {
      // Simular processamento do XML
      await new Promise(resolve => setTimeout(resolve, 2000));

      const dadosSimulados = {
        numeroNF: '000' + Math.floor(Math.random() * 999999),
        chaveAcesso: '3525' + Math.random().toString().slice(2, 46),
        fornecedor: 'Fornecedor Nacional Ltda',
        cnpjFornecedor: '12.345.678/0001-90',
        valorTotal: 15000.00 + Math.random() * 50000,
        valorImpostos: 2700.00 + Math.random() * 9000,
        dataEmissao: new Date().toISOString().split('T')[0],
        itens: [
          {
            codigo: 'PROD-' + Math.floor(Math.random() * 1000),
            descricao: 'Produto Importado do XML',
            quantidade: Math.floor(Math.random() * 100) + 1,
            valorUnitario: 150.00 + Math.random() * 500
          }
        ]
      };

      onUpload(dadosSimulados);
      
      toast({
        title: "Sucesso",
        description: "XML importado com sucesso!",
      });

      setArquivo(null);
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar o arquivo XML.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  const handleRemoveFile = () => {
    setArquivo(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload de XML - NF-e Nacional
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="xml-file">Arquivo XML da Nota Fiscal</Label>
            <div className="flex items-center gap-2">
              <Input
                id="xml-file"
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                disabled={carregando}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Selecione o arquivo XML recebido do fornecedor nacional
            </p>
          </div>

          {arquivo && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{arquivo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(arquivo.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={carregando}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Informações importantes
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• O XML será validado automaticamente</li>
              <li>• A chave de acesso será verificada</li>
              <li>• Os dados da NF serão extraídos e pré-preenchidos</li>
              <li>• Após importar, revise os dados antes de confirmar a entrada</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={carregando}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleImport}
            disabled={!arquivo || carregando}
          >
            {carregando ? 'Processando...' : 'Importar XML'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadXMLModal;
