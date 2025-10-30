import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface AssinaturaDigitalProps {
  onSave: (assinatura: {
    nomeCliente: string;
    assinaturaCliente: string;
    data: Date;
  }) => void;
  onCancel: () => void;
}

export function AssinaturaDigital({ onSave, onCancel }: AssinaturaDigitalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
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

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
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

    const canvas = canvasRef.current;
    if (!canvas) return;

    const assinaturaBase64 = canvas.toDataURL("image/png");

    onSave({
      nomeCliente: nomeCliente.trim(),
      assinaturaCliente: assinaturaBase64,
      data: new Date(),
    });
  };

  return (
    <div className="space-y-4 border rounded-lg p-6 bg-muted/30">
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
          <Button variant="ghost" size="sm" onClick={clearCanvas}>
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
        <div className="border-2 border-border rounded-lg bg-background">
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Desenhe a assinatura do cliente no espaço acima
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Salvar Assinatura
        </Button>
      </div>
    </div>
  );
}
