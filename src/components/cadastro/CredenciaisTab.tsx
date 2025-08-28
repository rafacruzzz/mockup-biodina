
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Key } from "lucide-react";
import { UserData } from "@/types/user";
import { ModuleAccess } from "@/types/permissions";
import AccessProfileSelector from "./AccessProfileSelector";
import ModuleAccessTree from "./ModuleAccessTree";

interface CredenciaisTabProps {
  formData: UserData;
  onInputChange: (section: keyof UserData | string, field: string, value: any) => void;
  onModuleAccessChange: (modules: ModuleAccess[]) => void;
}

const CredenciaisTab = ({ formData, onInputChange, onModuleAccessChange }: CredenciaisTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-biodina-gold/10 rounded-lg">
          <Shield className="h-5 w-5 text-biodina-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-biodina-blue">Credenciais e Sistema</h3>
          <p className="text-sm text-gray-600">Configure as credenciais de acesso e permissões do sistema</p>
        </div>
      </div>

      {/* Credenciais de Acesso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Key className="h-4 w-4" />
            Credenciais de Acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                value={formData.username || ''}
                onChange={(e) => onInputChange('username', '', e.target.value)}
                placeholder="Digite o nome de usuário"
              />
              <p className="text-xs text-gray-500">
                Deixe vazio se o usuário não terá acesso ao sistema
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Select value={formData.userType} onValueChange={(value) => onInputChange('userType', '', value)}>
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
                onChange={(e) => onInputChange('password', '', e.target.value)}
                placeholder="Digite a senha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword || ''}
                onChange={(e) => onInputChange('confirmPassword', '', e.target.value)}
                placeholder="Confirme a senha"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Status do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onInputChange('isActive', '', checked)}
            />
            <Label htmlFor="isActive">Usuário ativo</Label>
            <Badge variant={formData.isActive ? "default" : "secondary"}>
              {formData.isActive ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Permissões do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Permissões e Controles de Sistema</CardTitle>
          <p className="text-sm text-gray-600">
            Configure as permissões de acesso aos módulos do sistema. Você pode aplicar um perfil pré-definido ou configurar as permissões individualmente.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seletor de Perfil */}
          <AccessProfileSelector onProfileSelect={onModuleAccessChange} />

          {/* Árvore de Permissões */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Permissões Detalhadas</h4>
            <p className="text-sm text-gray-600 mb-4">
              Configure permissões específicas para cada módulo e funcionalidade
            </p>
            <ModuleAccessTree 
              modules={formData.moduleAccess}
              onModuleChange={onModuleAccessChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredenciaisTab;
