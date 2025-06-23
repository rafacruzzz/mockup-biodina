
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportTableProps {
  data: any[];
  filename: string;
}

export const ExportTable = ({ data, filename }: ExportTableProps) => {
  const handleExport = () => {
    if (data.length === 0) return;

    // Converter dados para CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escapar aspas duplas e envolver em aspas se contiver vírgula
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Criar e fazer download do arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  );
};
