
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCredentials, UserData } from "@/types/user";
import { Shield, User, Key, Settings } from "lucide-react";
import AccessProfileSelector from "./AccessProfileSelector";
import ModuleAccessTree from "./ModuleAccessTree";

interface UserCredentialsTabProps {
  formData: UserCredentials;
  onInputChange: (field: keyof UserCredentials, value: any) => void;
  userData: UserData;
}

const UserCredentialsTab = ({ formData, onInputChange, userData }: UserCredentialsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-biodina-gold/10 rounded-lg">
          <Shield className="h-5 w-5 text-biodina-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-biodina-blue">Credenciais e Sistema</h3>
          <p className="text-sm text-gray-600">Configure acesso ao sistema (opcional)</p>
        </div>
      </div>

      {/* Informações básicas preenchidas automaticamente */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input
              value={userData.dadosPessoais?.nome || ''}
              readOnly
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={userData.dadosPessoais?.email || ''}
              readOnly
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label>CPF</Label>
            <Input
              value={userData.dadosPessoais?.cpf || ''}
              readOnly
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Cargo</Label>
            <Input
              value={userData.dadosProfissionais?.cargo || ''}
              readOnly
              className="bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Credenciais de Acesso - Opcionais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Key className="h-4 w-4" />
            Credenciais de Acesso (Opcional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                value={formData.username || ''}
                onChange={(e) => onInputChange('username', e.target.value)}
                placeholder="Digite o nome de usuário (opcional)"
              />
              <p className="text-xs text-gray-500">
                Deixe em branco se o usuário não precisar acessar o sistema
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Select value={formData.userType || ''} onValueChange={(value) => onInputChange('userType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                  <SelectItem value="visitante">Visitante</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => onInputChange('password', e.target.value)}
                placeholder="Digite a senha (opcional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword || ''}
                onChange={(e) => onInputChange('confirmPassword', e.target.value)}
                placeholder="Confirme a senha"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onInputChange('isActive', checked)}
            />
            <Label htmlFor="isActive">Usuário ativo no sistema</Label>
            <Badge variant={formData.isActive ? "default" : "secondary"}>
              {formData.isActive ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Permissões - Só aparece se tem username */}
      {formData.username && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Permissões de Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seletor de Perfil */}
            <AccessProfileSelector onProfileSelect={(modules) => onInputChange('moduleAccess', modules)} />
            
            {/* Árvore de Permissões */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Permissões Detalhadas</h4>
              <ModuleAccessTree 
                modules={formData.moduleAccess}
                onModuleChange={(modules) => onInputChange('moduleAccess', modules)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserCredentialsTab;
