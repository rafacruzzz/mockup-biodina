
import React, { useState } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

interface InformacoesPessoaisTabProps {
  onSave: () => void;
  onCancel: () => void;
}

const InformacoesPessoaisTab = ({ onSave, onCancel }: InformacoesPessoaisTabProps) => {
  const { user, updateUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações básicas
    if (formData.novaSenha && formData.novaSenha !== formData.confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    // Atualizar dados do usuário
    updateUser({
      name: formData.name,
      email: formData.email
    });

    onSave();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Foto de Perfil */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.profilePicture} alt={user?.name} />
          <AvatarFallback className="bg-imuv-blue text-white text-lg">
            {user ? getInitials(user.name) : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Label>Foto de Perfil</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Alterar Foto
            </Button>
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Remover
            </Button>
          </div>
        </div>
      </div>

      {/* Dados Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input
            id="nome"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nome de Usuário</Label>
        <Input
          value={user?.username || ''}
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-500">
          O nome de usuário não pode ser alterado
        </p>
      </div>

      {/* Alterar Senha */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-gray-900">Alterar Senha</h3>
        
        <div className="space-y-2">
          <Label htmlFor="senhaAtual">Senha Atual</Label>
          <Input
            id="senhaAtual"
            type="password"
            value={formData.senhaAtual}
            onChange={(e) => handleInputChange('senhaAtual', e.target.value)}
            placeholder="Digite sua senha atual"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="novaSenha">Nova Senha</Label>
            <Input
              id="novaSenha"
              type="password"
              value={formData.novaSenha}
              onChange={(e) => handleInputChange('novaSenha', e.target.value)}
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
            <Input
              id="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
              placeholder="Confirme a nova senha"
            />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default InformacoesPessoaisTab;
