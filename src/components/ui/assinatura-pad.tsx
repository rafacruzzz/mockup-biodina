import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AssinaturaPadProps {
  onSave: (assinaturaBase64: string) => void;
  onClear?: () => void;
}

export function AssinaturaPad({ onSave, onClear }: AssinaturaPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setIsEmpty(false);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onClear?.();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;

    const assinaturaBase64 = canvas.toDataURL('image/png');
    onSave(assinaturaBase64);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white">
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
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={clearCanvas}>
            🗑️ Limpar
          </Button>
          <Button type="button" onClick={saveSignature} disabled={isEmpty}>
            ✅ Confirmar Assinatura
          </Button>
        </div>
      </div>
    </Card>
  );
}
