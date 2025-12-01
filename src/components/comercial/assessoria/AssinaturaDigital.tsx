import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { format } from "date-fns";

interface AssinaturaDigitalProps {
  onSave: (assinatura: {
    nomeCliente: string;
    assinaturaCliente: string;
    nomeAssessor: string;
    assinaturaAssessor: string;
    data: string;
  }) => void;
  onCancel: () => void;
}

export function AssinaturaDigital({ onSave, onCancel }: AssinaturaDigitalProps) {
  const canvasClienteRef = useRef<HTMLCanvasElement>(null);
  const canvasAssessorRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingCliente, setIsDrawingCliente] = useState(false);
  const [isDrawingAssessor, setIsDrawingAssessor] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [nomeAssessor, setNomeAssessor] = useState("");
  const [dataAssinatura, setDataAssinatura] = useState(format(new Date(), "yyyy-MM-dd"));

  const startDrawingCliente = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawingCliente(true);
    const canvas = canvasClienteRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawCliente = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingCliente) return;

    const canvas = canvasClienteRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawingCliente = () => {
    setIsDrawingCliente(false);
  };

  const startDrawingAssessor = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawingAssessor(true);
    const canvas = canvasAssessorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawAssessor = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingAssessor) return;

    const canvas = canvasAssessorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawingAssessor = () => {
    setIsDrawingAssessor(false);
  };

  const clearCanvasCliente = () => {
    const canvas = canvasClienteRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvasAssessor = () => {
    const canvas = canvasAssessorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    if (!nomeCliente.trim()) {
      alert("Por favor, insira o nome do cliente");
      return;
    }

    if (!nomeAssessor.trim()) {
      alert("Por favor, insira o nome do assessor científico");
      return;
    }

    if (!dataAssinatura) {
      alert("Por favor, insira a data da assinatura");
      return;
    }

    const canvasCliente = canvasClienteRef.current;
    const canvasAssessor = canvasAssessorRef.current;
    if (!canvasCliente || !canvasAssessor) return;

    const assinaturaClienteBase64 = canvasCliente.toDataURL("image/png");
    const assinaturaAssessorBase64 = canvasAssessor.toDataURL("image/png");

    onSave({
      nomeCliente: nomeCliente.trim(),
      assinaturaCliente: assinaturaClienteBase64,
      nomeAssessor: nomeAssessor.trim(),
      assinaturaAssessor: assinaturaAssessorBase64,
      data: dataAssinatura,
    });
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-muted/30">
      {/* Data da Assinatura */}
      <div className="space-y-2">
        <Label htmlFor="dataAssinatura">Data *</Label>
        <Input
          id="dataAssinatura"
          type="date"
          value={dataAssinatura}
          onChange={(e) => setDataAssinatura(e.target.value)}
        />
      </div>

      {/* Assinatura do Cliente */}
      <div className="space-y-2">
        <Label htmlFor="nomeCliente">Nome do Cliente *</Label>
        <Input
          id="nomeCliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          placeholder="Digite o nome completo do cliente"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Assinatura do Cliente *</Label>
          <Button variant="ghost" size="sm" onClick={clearCanvasCliente}>
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
        <div className="border-2 border-border rounded-lg bg-background">
          <canvas
            ref={canvasClienteRef}
            width={600}
            height={200}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawingCliente}
            onMouseMove={drawCliente}
            onMouseUp={stopDrawingCliente}
            onMouseLeave={stopDrawingCliente}
            onTouchStart={startDrawingCliente}
            onTouchMove={drawCliente}
            onTouchEnd={stopDrawingCliente}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Desenhe a assinatura do cliente no espaço acima
        </p>
      </div>

      {/* Assinatura do Assessor Científico */}
      <div className="space-y-2">
        <Label htmlFor="nomeAssessor">Nome do Assessor Científico *</Label>
        <Input
          id="nomeAssessor"
          value={nomeAssessor}
          onChange={(e) => setNomeAssessor(e.target.value)}
          placeholder="Digite o nome completo do assessor"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Assinatura do Assessor Científico *</Label>
          <Button variant="ghost" size="sm" onClick={clearCanvasAssessor}>
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
        <div className="border-2 border-border rounded-lg bg-background">
          <canvas
            ref={canvasAssessorRef}
            width={600}
            height={200}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawingAssessor}
            onMouseMove={drawAssessor}
            onMouseUp={stopDrawingAssessor}
            onMouseLeave={stopDrawingAssessor}
            onTouchStart={startDrawingAssessor}
            onTouchMove={drawAssessor}
            onTouchEnd={stopDrawingAssessor}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Desenhe a assinatura do assessor no espaço acima
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Salvar Assinaturas
        </Button>
      </div>
    </div>
  );
}
