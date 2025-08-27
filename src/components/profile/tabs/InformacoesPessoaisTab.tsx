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
    nome: user?.nome || '',
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
      nome: formData.nome,
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
          <AvatarImage src={user?.fotoPerfil} alt={user?.nome} />
          <AvatarFallback className="bg-biodina-blue text-white text-lg">
            {user ? getInitials(user.nome) : 'U'}
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
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
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
          value={user?.nomeUsuario || ''}
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

      {/* Aviso sobre outras solicitações */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">
              Precisa alterar outros dados?
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Para solicitações de alteração de dados profissionais, benefícios ou outras informações, 
              acesse o módulo de <strong>Solicitações</strong> no menu principal.
            </p>
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
