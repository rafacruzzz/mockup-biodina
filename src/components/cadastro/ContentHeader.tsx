import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, Upload, FileSpreadsheet } from "lucide-react";

interface ContentHeaderProps {
  title: string;
  description: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewRecord: () => void;
  buttonText?: string;
  showExcelButton?: boolean;
  onExcelClick?: () => void;
  showNewButton?: boolean;
}

const ContentHeader = ({ 
  title, 
  description, 
  searchTerm, 
  onSearchChange, 
  onNewRecord,
  buttonText = "Novo Registro",
  showExcelButton = false,
  onExcelClick,
  showNewButton = true
}: ContentHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200/80 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-imuv-blue mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex gap-3">
          {showExcelButton && (
            <Button 
              onClick={onExcelClick}
              variant="outline"
              className="border-imuv-cyan text-imuv-cyan hover:bg-imuv-cyan hover:text-white"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Mov. por Excel
            </Button>
          )}
          {showNewButton && (
            <Button 
              onClick={onNewRecord}
              className="bg-gradient-to-r from-imuv-cyan to-imuv-cyan/90 hover:from-imuv-cyan/90 hover:to-imuv-cyan text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              {buttonText}
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar registros..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-gray-200 focus:border-imuv-cyan rounded-xl"
          />
        </div>
        <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
          <Upload className="h-4 w-4 mr-2" />
          Importar
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
