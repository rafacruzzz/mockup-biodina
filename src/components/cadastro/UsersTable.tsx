
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Shield, User } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';

interface UsersTableProps {
  onEditUser: (userId: string) => void;
}

const UsersTable = ({ onEditUser }: UsersTableProps) => {
  const { users } = useUsers();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Novo':
        return 'bg-blue-100 text-blue-800';
      case 'Inativo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Desligado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const hasSystemAccess = (user: any) => {
    return user.credentials?.username ? true : false;
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acesso Sistema</TableHead>
            <TableHead>Data Admissão</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.nome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.cargo}</TableCell>
              <TableCell>{user.departamento}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {hasSystemAccess(user) ? (
                    <>
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Com acesso</span>
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Sem acesso</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>{new Date(user.dataAdmissao).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditUser(user.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Nenhum usuário encontrado</p>
          <p className="text-sm">Os usuários são criados automaticamente através do processo seletivo</p>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
