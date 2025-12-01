import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

interface UploadDocumentoModalProps {
  open: boolean;
  onClose: () => void;
  produtoId: string;
  produtoNome?: string;
  onDocumentoUpload: (documento: any) => void;
}

type TipoDocumento = 
  | "catalogo"
  | "ficha_tecnica"
  | "ifu_pop_manual"
  | "comparativo_tecnico"
  | "justificativa_tecnica"
  | "termo_referencia"
  | "catmat"
  | "certificado_treinamento"
  | "imagem"
  | "video"
  | "artigo";

// Schema de validação dinâmico por tipo
const createValidationSchema = (tipo: TipoDocumento) => {
  const baseSchema = {
    titulo: z.string().trim().min(1, "Título é obrigatório").max(200, "Título muito longo"),
  };

  switch (tipo) {
    case "catalogo":
    case "ficha_tecnica":
      return z.object({
        ...baseSchema,
        produto: z.string().trim().min(1, "Produto é obrigatório"),
        idioma: z.string().min(1, "Idioma é obrigatório"),
        versao: z.string().trim().min(1, "Versão é obrigatória"),
        data: z.string().min(1, "Data é obrigatória"),
      });
    
    case "ifu_pop_manual":
      return z.object({
        ...baseSchema,
        subTipo: z.string().min(1, "Tipo (IFU/POP/Manual) é obrigatório"),
        produto: z.string().trim().min(1, "Produto é obrigatório"),
        idioma: z.string().min(1, "Idioma é obrigatório"),
        versao: z.string().trim().min(1, "Versão é obrigatória"),
        data: z.string().min(1, "Data é obrigatória"),
      });
    
    case "comparativo_tecnico":
      return z.object({
        ...baseSchema,
        escopo: z.string().trim().min(1, "Escopo é obrigatório"),
        produtosComparados: z.string().trim().min(1, "Produtos comparados são obrigatórios"),
        versao: z.string().trim().min(1, "Versão é obrigatória"),
        data: z.string().min(1, "Data é obrigatória"),
      });
    
    case "justificativa_tecnica":
    case "termo_referencia":
    case "certificado_treinamento":
      return z.object({
        ...baseSchema,
        produto: z.string().trim().min(1, "Produto é obrigatório"),
        versao: z.string().trim().min(1, "Versão é obrigatória"),
        data: z.string().min(1, "Data é obrigatória"),
      });
    
    case "catmat":
      return z.object({
        ...baseSchema,
        entidade: z.string().trim().min(1, "Entidade é obrigatória"),
        data: z.string().min(1, "Data é obrigatória"),
      });
    
    case "imagem":
      return z.object({
        legenda: z.string().trim().min(1, "Legenda é obrigatória").max(300, "Legenda muito longa"),
        fonte: z.string().trim().min(1, "Fonte é obrigatória"),
        direitosUso: z.string().trim().min(1, "Direitos de uso são obrigatórios"),
      });
    
    case "video":
      return z.object({
        ...baseSchema,
        duracao: z.string().trim().min(1, "Duração é obrigatória"),
        fonte: z.string().trim().min(1, "Fonte é obrigatória"),
        direitosUso: z.string().trim().min(1, "Direitos de uso são obrigatórios"),
      });
    
    case "artigo":
      return z.object({
        ...baseSchema,
        ano: z.string().trim().min(4, "Ano é obrigatório"),
        periodico: z.string().trim().min(1, "Periódico é obrigatório"),
        autor: z.string().trim().min(1, "Autor é obrigatório"),
      });
    
    default:
      return z.object(baseSchema);
  }
};

export function UploadDocumentoModal({
  open,
  onClose,
  produtoId,
  produtoNome = "",
  onDocumentoUpload,
}: UploadDocumentoModalProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    tipo: "",
    produto: produtoNome,
    data: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validação de tamanho (máximo 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Tamanho máximo: 20MB");
        return;
      }
      setArquivo(file);
      
      // Preencher título automaticamente com o nome do arquivo (sem extensão)
      if (!formData.titulo) {
        const nomeArquivo = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, titulo: nomeArquivo }));
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleRemoveFile = () => {
    setArquivo(null);
  };

  const handleSubmit = () => {
    // Validação de arquivo
    if (!arquivo && formData.tipo !== "imagem" && formData.tipo !== "video") {
      toast.error("Selecione um arquivo para upload");
      return;
    }

    if (!formData.tipo) {
      toast.error("Selecione o tipo do documento");
      return;
    }

    // Validação com Zod
    try {
      const schema = createValidationSchema(formData.tipo as TipoDocumento);
      schema.parse(formData);
      
      // Se passou na validação, limpar erros
      setErrors({});
      
      // Criar o objeto documento
      const novoDocumento = {
        id: `doc-${Date.now()}`,
        produtoId,
        tipo: formData.tipo,
        ...formData,
        dataUpload: new Date(),
        uploadPor: "Usuário Atual",
        nomeArquivo: arquivo?.name,
        tamanhoArquivo: arquivo?.size,
        historicoVersoes: [],
      };

      onDocumentoUpload(novoDocumento);
      toast.success("Documento enviado com sucesso");
      handleClose();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Preencha todos os campos obrigatórios");
      }
    }
  };

  const handleClose = () => {
    setArquivo(null);
    setFormData({
      tipo: "",
      produto: produtoNome,
      data: new Date().toISOString().split('T')[0],
    });
    setErrors({});
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const renderCamposCondicionais = () => {
    const tipo = formData.tipo as TipoDocumento;
    
    if (!tipo) return null;

    // Campos comuns para vários tipos
    const campoTitulo = (
      <div>
        <Label htmlFor="titulo" className="flex items-center gap-1">
          Título do Documento <span className="text-destructive">*</span>
        </Label>
        <Input
          id="titulo"
          value={formData.titulo || ""}
          onChange={(e) => handleInputChange("titulo", e.target.value)}
          placeholder="Ex: Manual do Usuário DxH 520"
          className={`mt-2 ${errors.titulo ? 'border-destructive' : ''}`}
          maxLength={200}
        />
        {errors.titulo && (
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.titulo}
          </div>
        )}
      </div>
    );

    const campoProduto = (
      <div>
        <Label htmlFor="produto" className="flex items-center gap-1">
          Produto <span className="text-destructive">*</span>
        </Label>
        <Input
          id="produto"
          value={formData.produto || ""}
          onChange={(e) => handleInputChange("produto", e.target.value)}
          placeholder="Nome do produto"
          className={`mt-2 ${errors.produto ? 'border-destructive' : ''}`}
          maxLength={200}
        />
        {errors.produto && (
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.produto}
          </div>
        )}
      </div>
    );

    const campoIdioma = (
      <div>
        <Label htmlFor="idioma" className="flex items-center gap-1">
          Idioma <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.idioma || ""}
          onValueChange={(value) => handleInputChange("idioma", value)}
        >
          <SelectTrigger id="idioma" className={`mt-2 ${errors.idioma ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PT-BR">Português (BR)</SelectItem>
            <SelectItem value="EN">English</SelectItem>
            <SelectItem value="ES">Español</SelectItem>
            <SelectItem value="FR">Français</SelectItem>
            <SelectItem value="DE">Deutsch</SelectItem>
            <SelectItem value="IT">Italiano</SelectItem>
          </SelectContent>
        </Select>
        {errors.idioma && (
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.idioma}
          </div>
        )}
      </div>
    );

    const campoVersao = (
      <div>
        <Label htmlFor="versao" className="flex items-center gap-1">
          Versão <span className="text-destructive">*</span>
        </Label>
        <Input
          id="versao"
          value={formData.versao || ""}
          onChange={(e) => handleInputChange("versao", e.target.value)}
          placeholder="Ex: 1.0, 2.1"
          className={`mt-2 ${errors.versao ? 'border-destructive' : ''}`}
          maxLength={20}
        />
        {errors.versao && (
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.versao}
          </div>
        )}
      </div>
    );

    const campoData = (
      <div>
        <Label htmlFor="data" className="flex items-center gap-1">
          Data <span className="text-destructive">*</span>
        </Label>
        <Input
          id="data"
          type="date"
          value={formData.data || ""}
          onChange={(e) => handleInputChange("data", e.target.value)}
          className={`mt-2 ${errors.data ? 'border-destructive' : ''}`}
        />
        {errors.data && (
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.data}
          </div>
        )}
      </div>
    );

    switch (tipo) {
      case "catalogo":
      case "ficha_tecnica":
        return (
          <div className="space-y-4">
            {campoTitulo}
            {campoProduto}
            <div className="grid grid-cols-2 gap-4">
              {campoIdioma}
              {campoVersao}
            </div>
            {campoData}
          </div>
        );

      case "ifu_pop_manual":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subTipo" className="flex items-center gap-1">
                Tipo <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.subTipo || ""}
                onValueChange={(value) => handleInputChange("subTipo", value)}
              >
                <SelectTrigger id="subTipo" className={`mt-2 ${errors.subTipo ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IFU">IFU (Instructions for Use)</SelectItem>
                  <SelectItem value="POP">POP (Procedimento Operacional Padrão)</SelectItem>
                  <SelectItem value="Manual">Manual de Operação</SelectItem>
                </SelectContent>
              </Select>
              {errors.subTipo && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.subTipo}
                </div>
              )}
            </div>
            {campoTitulo}
            {campoProduto}
            <div className="grid grid-cols-2 gap-4">
              {campoIdioma}
              {campoVersao}
            </div>
            {campoData}
          </div>
        );

      case "comparativo_tecnico":
        return (
          <div className="space-y-4">
            {campoTitulo}
            <div>
              <Label htmlFor="escopo" className="flex items-center gap-1">
                Escopo <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="escopo"
                value={formData.escopo || ""}
                onChange={(e) => handleInputChange("escopo", e.target.value)}
                placeholder="Descreva o escopo da comparação"
                className={`mt-2 ${errors.escopo ? 'border-destructive' : ''}`}
                maxLength={500}
              />
              {errors.escopo && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.escopo}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="produtosComparados" className="flex items-center gap-1">
                Produtos Comparados <span className="text-destructive">*</span>
              </Label>
              <Input
                id="produtosComparados"
                value={formData.produtosComparados || ""}
                onChange={(e) => handleInputChange("produtosComparados", e.target.value)}
                placeholder="Ex: DxH 520 vs Concorrente X"
                className={`mt-2 ${errors.produtosComparados ? 'border-destructive' : ''}`}
                maxLength={200}
              />
              {errors.produtosComparados && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.produtosComparados}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {campoVersao}
              {campoData}
            </div>
          </div>
        );

      case "justificativa_tecnica":
      case "termo_referencia":
      case "certificado_treinamento":
        return (
          <div className="space-y-4">
            {campoTitulo}
            {campoProduto}
            <div className="grid grid-cols-2 gap-4">
              {campoVersao}
              {campoData}
            </div>
          </div>
        );

      case "catmat":
        return (
          <div className="space-y-4">
            {campoTitulo}
            <div>
              <Label htmlFor="entidade" className="flex items-center gap-1">
                Entidade <span className="text-destructive">*</span>
              </Label>
              <Input
                id="entidade"
                value={formData.entidade || ""}
                onChange={(e) => handleInputChange("entidade", e.target.value)}
                placeholder="Nome da entidade"
                className={`mt-2 ${errors.entidade ? 'border-destructive' : ''}`}
                maxLength={200}
              />
              {errors.entidade && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.entidade}
                </div>
              )}
            </div>
            {campoData}
          </div>
        );

      case "imagem":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="legenda" className="flex items-center gap-1">
                Legenda <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="legenda"
                value={formData.legenda || ""}
                onChange={(e) => handleInputChange("legenda", e.target.value)}
                placeholder="Descreva a imagem"
                className={`mt-2 ${errors.legenda ? 'border-destructive' : ''}`}
                maxLength={300}
              />
              {errors.legenda && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.legenda}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="fonte" className="flex items-center gap-1">
                Fonte <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fonte"
                value={formData.fonte || ""}
                onChange={(e) => handleInputChange("fonte", e.target.value)}
                placeholder="Ex: Fotografia oficial do produto"
                className={`mt-2 ${errors.fonte ? 'border-destructive' : ''}`}
                maxLength={200}
              />
              {errors.fonte && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.fonte}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="direitosUso" className="flex items-center gap-1">
                Direitos de Uso <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.direitosUso || ""}
                onValueChange={(value) => handleInputChange("direitosUso", value)}
              >
                <SelectTrigger id="direitosUso" className={`mt-2 ${errors.direitosUso ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proprietario">Proprietário</SelectItem>
                  <SelectItem value="licenciado">Licenciado</SelectItem>
                  <SelectItem value="uso_livre">Uso Livre</SelectItem>
                  <SelectItem value="creative_commons">Creative Commons</SelectItem>
                </SelectContent>
              </Select>
              {errors.direitosUso && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.direitosUso}
                </div>
              )}
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            {campoTitulo}
            <div>
              <Label htmlFor="duracao" className="flex items-center gap-1">
                Duração <span className="text-destructive">*</span>
              </Label>
              <Input
                id="duracao"
                value={formData.duracao || ""}
                onChange={(e) => handleInputChange("duracao", e.target.value)}
                placeholder="Ex: 00:05:30"
                className={`mt-2 ${errors.duracao ? 'border-destructive' : ''}`}
                maxLength={20}
              />
              {errors.duracao && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.duracao}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="fonte" className="flex items-center gap-1">
                Fonte <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fonte"
                value={formData.fonte || ""}
                onChange={(e) => handleInputChange("fonte", e.target.value)}
                placeholder="Ex: Vídeo oficial do fabricante"
                className={`mt-2 ${errors.fonte ? 'border-destructive' : ''}`}
                maxLength={200}
              />
              {errors.fonte && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.fonte}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="direitosUso" className="flex items-center gap-1">
                Direitos de Uso <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.direitosUso || ""}
                onValueChange={(value) => handleInputChange("direitosUso", value)}
              >
                <SelectTrigger id="direitosUso" className={`mt-2 ${errors.direitosUso ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proprietario">Proprietário</SelectItem>
                  <SelectItem value="licenciado">Licenciado</SelectItem>
                  <SelectItem value="uso_livre">Uso Livre</SelectItem>
                  <SelectItem value="creative_commons">Creative Commons</SelectItem>
                </SelectContent>
              </Select>
              {errors.direitosUso && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.direitosUso}
                </div>
              )}
            </div>
          </div>
        );

      case "artigo":
        return (
          <div className="space-y-4">
            {campoTitulo}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ano" className="flex items-center gap-1">
                  Ano <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ano"
                  value={formData.ano || ""}
                  onChange={(e) => handleInputChange("ano", e.target.value)}
                  placeholder="2024"
                  className={`mt-2 ${errors.ano ? 'border-destructive' : ''}`}
                  maxLength={4}
                />
                {errors.ano && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.ano}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="periodico" className="flex items-center gap-1">
                  Periódico <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="periodico"
                  value={formData.periodico || ""}
                  onChange={(e) => handleInputChange("periodico", e.target.value)}
                  placeholder="Nome do periódico"
                  className={`mt-2 ${errors.periodico ? 'border-destructive' : ''}`}
                  maxLength={200}
                />
                {errors.periodico && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.periodico}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="autor" className="flex items-center gap-1">
                Autor <span className="text-destructive">*</span>
              </Label>
              <Input
                id="autor"
                value={formData.autor || ""}
                onChange={(e) => handleInputChange("autor", e.target.value)}
                placeholder="Nome do autor"
                className={`mt-2 ${errors.autor ? 'border-destructive' : ''}`}
                maxLength={200}
              />
              {errors.autor && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.autor}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload de Documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Tipo de Documento */}
          <div>
            <Label htmlFor="tipo" className="flex items-center gap-1">
              Tipo de Documento <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => {
                handleInputChange("tipo", value);
                // Limpar campos ao mudar tipo
                setFormData(prev => ({
                  tipo: value,
                  produto: produtoNome,
                  data: new Date().toISOString().split('T')[0],
                }));
                setErrors({});
              }}
            >
              <SelectTrigger id="tipo" className="mt-2">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="catalogo">Catálogo</SelectItem>
                <SelectItem value="ficha_tecnica">Ficha Técnica</SelectItem>
                <SelectItem value="ifu_pop_manual">IFU/POP/Manual</SelectItem>
                <SelectItem value="comparativo_tecnico">Comparativo Técnico</SelectItem>
                <SelectItem value="justificativa_tecnica">Justificativa Técnica</SelectItem>
                <SelectItem value="termo_referencia">Termo de Referência</SelectItem>
                <SelectItem value="catmat">CATMAT</SelectItem>
                <SelectItem value="certificado_treinamento">Certificado de Treinamento</SelectItem>
                <SelectItem value="imagem">Imagem</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="artigo">Artigo Científico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload de Arquivo */}
          {formData.tipo && formData.tipo !== "imagem" && formData.tipo !== "video" && (
            <div>
              <Label>Arquivo *</Label>
              {!arquivo ? (
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                      <p className="mb-1 text-sm text-muted-foreground">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste o arquivo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX, XLS, XLSX (máx. 20MB)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{arquivo.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(arquivo.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Campos condicionais por tipo */}
          {renderCamposCondicionais()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Upload className="h-4 w-4 mr-2" />
            Fazer Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
