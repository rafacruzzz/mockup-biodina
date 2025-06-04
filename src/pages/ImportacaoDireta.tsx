
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '@/components/SidebarLayout';
import ImportacaoDiretaContent from '@/components/comercial/ImportacaoDiretaContent';

const ImportacaoDireta = () => {
  const navigate = useNavigate();
  
  const handleSave = (data: any) => {
    console.log('Salvando importação direta:', data);
    navigate('/comercial');
  };

  const handleClose = () => {
    navigate('/comercial');
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Nova Importação Direta</h1>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Voltar
          </button>
        </div>
        
        <ImportacaoDiretaContent 
          onClose={handleClose}
          onSave={handleSave}
          oportunidade={undefined}
        />
        
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => handleSave({})}
            className="px-4 py-2 bg-biodina-gold hover:bg-biodina-gold/90 text-white rounded-md transition-colors"
          >
            Salvar Importação Direta
          </button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ImportacaoDireta;
