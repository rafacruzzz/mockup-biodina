import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eraser, Check, Pen } from 'lucide-react';

interface AssinaturaRepresentanteProps {
  repNome: string;
  repCargo: string;
  razaoSocial: string;
  localAssinatura: string;
  dataAssinatura: string;
  onLocalChange: (value: string) => void;
  onDataChange: (value: string) => void;
  onRepNomeChange: (value: string) => void;
  onRepCargoChange: (value: string) => void;
  onAssinaturaChange: (base64: string) => void;
  assinaturaBase64?: string;
}

export function AssinaturaRepresentante({
  repNome,
  repCargo,
  razaoSocial,
  localAssinatura,
  dataAssinatura,
  onLocalChange,
  onDataChange,
  onRepNomeChange,
  onRepCargoChange,
  onAssinaturaChange,
  assinaturaBase64,
}: AssinaturaRepresentanteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [assinado, setAssinado] = useState(!!assinaturaBase64);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (assinado) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || assinado) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setAssinado(false);
    onAssinaturaChange('');
  };

  const confirmarAssinatura = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const base64 = canvas.toDataURL('image/png');
    onAssinaturaChange(base64);
    setAssinado(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Local</Label>
          <Input value={localAssinatura} onChange={e => onLocalChange(e.target.value)} placeholder="Cidade - UF" />
        </div>
        <div className="space-y-1">
          <Label>Data</Label>
          <Input type="date" value={dataAssinatura} onChange={e => onDataChange(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Nome do Representante Legal</Label>
          <Input value={repNome} onChange={e => onRepNomeChange(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label>Cargo</Label>
          <Input value={repCargo} onChange={e => onRepCargoChange(e.target.value)} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{razaoSocial}</p>

      {assinado && assinaturaBase64 ? (
        <div className="space-y-2">
          <div className="border-2 border-primary/30 rounded-lg bg-primary/5 p-4 text-center">
            <img src={assinaturaBase64} alt="Assinatura" className="max-h-[120px] mx-auto" />
            <div className="flex items-center justify-center gap-1 mt-2 text-primary">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Assinado eletronicamente</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" onClick={clearCanvas}>
              <Pen className="h-4 w-4 mr-1" /> Assinar novamente
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Assinatura Eletrônica do Representante Legal</Label>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg bg-background">
            <canvas
              ref={canvasRef}
              width={600}
              height={180}
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
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={clearCanvas} disabled={!hasDrawn}>
              <Eraser className="h-4 w-4 mr-1" /> Limpar
            </Button>
            <Button type="button" size="sm" onClick={confirmarAssinatura} disabled={!hasDrawn}>
              <Check className="h-4 w-4 mr-1" /> Confirmar Assinatura
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
