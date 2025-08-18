
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Save, User, Shield } from "lucide-react";
import { useColaboradores } from "@/hooks/useColaboradores";
import ColaboradorSelector from "./ColaboradorSelector";
import UserColaboradorLink from "./UserColaboradorLink";
import ColaboradorModal from "../rh/ColaboradorModal";

interface UserData {
  // Campos específicos do usuário
  username: string;
  password: string;
  confirmPassword: string;
  // Campos que serão auto-preenchidos do colaborador
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  // Vinculação ao colaborador
  colaboradorId: string;
  // Controle de sistema
  isActive: boolean;
  userType: string;
  permissions: string[];
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  editMode?: boolean;
}

const UserModal = ({ isOpen, onClose, userData, editMode = false }: UserModalProps) => {
  const { colaboradores } = useColaboradores();
  const [isColaboradorModalOpen, setIsColaboradorModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    username: userData?.username || '',
    password: userData?.password || '',
    confirmPassword: userData?.confirmPassword || '',
    nome: userData?.nome || '',
    email: userData?.email || '',
    cpf: userData?.cpf || '',
    telefone: userData?.telefone || '',
    colaboradorId: userData?.colaboradorId || '',
    isActive: userData?.isActive ?? true,
    userType: userData?.userType || '',
    permissions: userData?.permissions || []
  });

  const handleColaboradorChange = (colaboradorId: string) => {
    const colaborador = colaboradores.find(c => c.id === colaboradorId);
    if (colaborador) {
      setFormData(prev => ({
        ...prev,
        colaboradorId,
        nome: colaborador.nome,
        email: colaborador.email,
        cpf: colaborador.telefone.replace(/\D/g, '').substring(0, 11), // Fallback para CPF
        telefone: colaborador.telefone
      }));
    }
  };

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Salvando usuário:', formData);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <User className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-biodina-blue">
                  {editMode ? `Editar Usuário - ${formData.nome}` : 'Novo Usuário'}
                </DialogTitle>
                <p className="text-gray-600">
                  {editMode ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema'}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="usuario" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="usuario">
                  <User className="h-4 w-4 mr-2" />
                  Usuário
                </TabsTrigger>
                <TabsTrigger value="controle-sistema">
                  <Shield className="h-4 w-4 mr-2" />
                  Controle de Sistema
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="usuario" className="mt-0 space-y-6">
                  {/* Seleção do Colaborador */}
                  <ColaboradorSelector
                    value={formData.colaboradorId}
                    onChange={handleColaboradorChange}
                    onCreateNew={() => setIsColaboradorModalOpen(true)}
                  />

                  {/* Link para o Colaborador (se selecionado) */}
                  {formData.colaboradorId && (
                    <UserColaboradorLink
                      colaboradorId={formData.colaboradorId}
                      onViewColaborador={() => setIsColaboradorModalOpen(true)}
                    />
                  )}

                  {/* Dados Básicos (Auto-preenchidos) */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">
                      Dados Básicos (auto-preenchidos do colaborador)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => handleInputChange('nome', e.target.value)}
                          placeholder="Nome será preenchido automaticamente"
                          className="bg-gray-50"
                          readOnly={!!formData.colaboradorId}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Email será preenchido automaticamente"
                          className="bg-gray-50"
                          readOnly={!!formData.colaboradorId}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          placeholder="CPF será preenchido automaticamente"
                          className="bg-gray-50"
                          readOnly={!!formData.colaboradorId}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          placeholder="Telefone será preenchido automaticamente"
                          className="bg-gray-50"
                          readOnly={!!formData.colaboradorId}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Credenciais de Acesso */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">
                      Credenciais de Acesso
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Nome de Usuário *</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="Digite o nome de usuário"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="userType">Tipo de Usuário *</Label>
                        <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
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
                        <Label htmlFor="password">Senha *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Digite a senha"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirme a senha"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">
                      Status
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                      />
                      <Label htmlFor="isActive">Usuário ativo</Label>
                      <Badge variant={formData.isActive ? "default" : "secondary"}>
                        {formData.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="controle-sistema" className="mt-0">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">Permissões e Controles de Sistema</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Aqui ficam as permissões específicas do sistema */}
                      <div className="space-y-2">
                        <Label>Módulos Disponíveis</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="rh" />
                            <Label htmlFor="rh">Recursos Humanos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="comercial" />
                            <Label htmlFor="comercial">Comercial</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="estoque" />
                            <Label htmlFor="estoque">Estoque</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="financeiro" />
                            <Label htmlFor="financeiro">Financeiro</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              {editMode ? 'Salvar Alterações' : 'Salvar Usuário'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal do Colaborador */}
      <ColaboradorModal
        isOpen={isColaboradorModalOpen}
        onClose={() => setIsColaboradorModalOpen(false)}
        colaboradorId={formData.colaboradorId}
        editMode={!!formData.colaboradorId}
      />
    </>
  );
};

export default UserModal;
