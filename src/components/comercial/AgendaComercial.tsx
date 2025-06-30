
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User, Target, Users, Building, Wrench } from "lucide-react";

const AgendaComercial = () => {
  // Dados mockados da agenda baseados na imagem
  const agendaData = {
    licitacao: [
      {
        dia: "22",
        mes: "JAN",
        hora: "09:00",
        descricao: "Pregão Eletrônico 001/2025",
        objeto: "Equipamentos Laboratoriais - Hospital Regional",
        colaborador: "Carlos Oliveira",
        status: "Em Operação",
        statusColor: "bg-blue-500"
      },
      {
        dia: "23",
        mes: "JAN",
        hora: "14:30",
        descricao: "Pregão Eletrônico 002/2025",
        objeto: "Sistema de Gestão WEBMED - Prefeitura SP",
        colaborador: "Ana Costa",
        status: "Etapa de Lances",
        statusColor: "bg-orange-500"
      },
      {
        dia: "24",
        mes: "JAN",
        hora: "10:15",
        descricao: "Pregão Eletrônico 003/2025",
        objeto: "Gasômetros - Rede Municipal de Saúde",
        colaborador: "João Silva",
        status: "Aceitação",
        statusColor: "bg-green-500"
      }
    ],
    comercialInterno: [
      {
        dia: "22",
        mes: "JAN",
        hora: "11:00",
        descricao: "Reunião Comercial Semanal",
        objeto: "Revisão de Pipeline Q1",
        colaborador: "Equipe Comercial",
        status: "Agendado",
        statusColor: "bg-gray-500"
      },
      {
        dia: "23",
        mes: "JAN",
        hora: "16:00",
        descricao: "Apresentação Proposta",
        objeto: "Hospital Albert Einstein - ABL800",
        colaborador: "Maria Santos",
        status: "Confirmado",
        statusColor: "bg-blue-500"
      }
    ],
    assessoriaCientifica: [
      {
        dia: "22",
        mes: "JAN",
        hora: "08:30",
        descricao: "Consultoria Técnica",
        objeto: "Implementação Sistema HUOL",
        colaborador: "Dr. Roberto Silva",
        status: "Em Andamento",
        statusColor: "bg-purple-500"
      },
      {
        dia: "24",
        mes: "JAN",
        hora: "13:45",
        descricao: "Treinamento Técnico",
        objeto: "Capacitação Radiometer ABL",
        colaborador: "Dra. Fernanda Costa",
        status: "Agendado",
        statusColor: "bg-gray-500"
      }
    ],
    departamentoTecnico: [
      {
        dia: "22",
        mes: "JAN",
        hora: "15:30",
        descricao: "Manutenção Preventiva",
        objeto: "Equipamentos Hospital São Paulo",
        colaborador: "Técnico José Lima",
        status: "Em Execução",
        statusColor: "bg-red-500"
      },
      {
        dia: "25",
        mes: "JAN",
        hora: "09:00",
        descricao: "Instalação Equipamento",
        objeto: "ABL800 Basic - Hospital Einstein",
        colaborador: "Técnico Paulo Santos",
        status: "Programado",
        statusColor: "bg-yellow-500"
      }
    ]
  };

  const formatarData = (item: any) => (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="text-lg font-bold text-biodina-blue">{item.dia}</div>
      <div className="text-xs text-gray-500 uppercase">{item.mes}</div>
    </div>
  );

  const renderSecao = (titulo: string, icon: React.ReactNode, dados: any[], bgColor: string) => (
    <div className="space-y-4">
      <div className={`${bgColor} text-white p-3 rounded-lg`}>
        <h3 className="font-bold text-lg flex items-center gap-2">
          {icon}
          {titulo}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[80px]">Data</TableHead>
              <TableHead className="min-w-[80px]">Hora</TableHead>
              <TableHead className="min-w-[200px]">Descrição</TableHead>
              <TableHead className="min-w-[250px]">Projeto/Objeto</TableHead>
              <TableHead className="min-w-[150px]">Colaborador</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dados.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{formatarData(item)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-gray-400" />
                    {item.hora}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.descricao}</TableCell>
                <TableCell className="text-sm text-gray-600">{item.objeto}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-3 w-3 text-gray-400" />
                    {item.colaborador}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${item.statusColor} text-white`}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <Card className="shadow-lg h-[600px] flex flex-col">
      <CardHeader className="text-center pb-3 flex-shrink-0">
        <CardTitle className="flex items-center justify-center gap-3 text-xl font-bold text-biodina-blue mb-1">
          <Calendar className="h-6 w-6 text-biodina-blue" />
          Agenda Comercial
        </CardTitle>
        <p className="text-gray-600 text-sm">Cronograma de Atividades Comerciais</p>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 flex-1 overflow-y-auto space-y-6">
        {renderSecao(
          "LICITAÇÃO",
          <Target className="h-5 w-5" />,
          agendaData.licitacao,
          "bg-gradient-to-r from-blue-600 to-blue-700"
        )}
        
        {renderSecao(
          "COMERCIAL INTERNO",
          <Users className="h-5 w-5" />,
          agendaData.comercialInterno,
          "bg-gradient-to-r from-green-600 to-green-700"
        )}
        
        {renderSecao(
          "ASSESSORIA CIENTÍFICA",
          <Building className="h-5 w-5" />,
          agendaData.assessoriaCientifica,
          "bg-gradient-to-r from-purple-600 to-purple-700"
        )}
        
        {renderSecao(
          "DEPARTAMENTO TÉCNICO",
          <Wrench className="h-5 w-5" />,
          agendaData.departamentoTecnico,
          "bg-gradient-to-r from-red-600 to-red-700"
        )}
      </CardContent>
    </Card>
  );
};

export default AgendaComercial;
