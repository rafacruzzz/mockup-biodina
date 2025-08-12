
import * as XLSX from 'xlsx';

export const downloadImportacaoDiretaTemplate = () => {
  // Define the template structure with headers and example data
  const templateData = [
    // Header row
    [
      'Código', 'Cliente', 'Contato', 'Responsável', 'Família Comercial', 
      'Valor (R$)', 'Data Abertura', 'Data Contato', 'Termômetro (%)', 
      'Segmento', 'Descrição', 'Produtos', 'Serviços'
    ],
    // Example row 1
    [
      'IMP-2024-004', 'Hospital das Clínicas', 'compras@hc.fm.usp.br', 
      'Ana Costa', 'Radiometer ABL', 120000, '15/01/2024', '16/01/2024', 
      75, 'Público', 'Importação de analisadores de gases sanguíneos', 
      'ABL800 FLEX; Sensor CO2', 'Instalação; Treinamento'
    ],
    // Example row 2
    [
      'IMP-2024-005', 'Santa Casa de Misericórdia', 'suprimentos@santacasa.org.br', 
      'Pedro Alves', 'Nova Biomedical', 85000, '20/01/2024', '22/01/2024', 
      60, 'Privado', 'Modernização do laboratório de análises clínicas', 
      'Nova StatProfile; Eletrodo pH', 'Manutenção; Suporte Técnico'
    ]
  ];

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(templateData);

  // Set column widths for better readability
  const colWidths = [
    { wch: 15 }, // Código
    { wch: 25 }, // Cliente
    { wch: 30 }, // Contato
    { wch: 20 }, // Responsável
    { wch: 20 }, // Família Comercial
    { wch: 15 }, // Valor
    { wch: 15 }, // Data Abertura
    { wch: 15 }, // Data Contato
    { wch: 15 }, // Termômetro
    { wch: 15 }, // Segmento
    { wch: 40 }, // Descrição
    { wch: 30 }, // Produtos
    { wch: 25 }  // Serviços
  ];
  ws['!cols'] = colWidths;

  // Add instructions sheet
  const instructionsData = [
    ['INSTRUÇÕES PARA PREENCHIMENTO'],
    [''],
    ['1. Preencha todos os campos obrigatórios'],
    ['2. Use o formato DD/MM/AAAA para datas'],
    ['3. O valor deve ser numérico (apenas números)'],
    ['4. Termômetro deve ser um valor entre 0 e 100'],
    ['5. Segmento: "Público" ou "Privado"'],
    ['6. Para múltiplos produtos/serviços, separe com ponto e vírgula (;)'],
    ['7. Após preencher, salve o arquivo e importe no sistema'],
    [''],
    ['CAMPOS OBRIGATÓRIOS:'],
    ['- Código'],
    ['- Cliente'],
    ['- Responsável'],
    ['- Valor'],
    ['- Data Abertura'],
    [''],
    ['OBSERVAÇÕES:'],
    ['- O código deve ser único para cada importação'],
    ['- Mantenha a formatação das colunas'],
    ['- Não altere os cabeçalhos da primeira linha']
  ];

  const instructionsWs = XLSX.utils.aoa_to_sheet(instructionsData);
  instructionsWs['!cols'] = [{ wch: 50 }];

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo Importação');
  XLSX.utils.book_append_sheet(wb, instructionsWs, 'Instruções');

  // Generate and download the file
  const fileName = `modelo_importacao_direta_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
