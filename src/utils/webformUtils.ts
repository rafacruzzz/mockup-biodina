export const gerarLinkWebform = (webformId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/register/${webformId}`;
};

export const copiarLinkWebform = async (link: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error('Erro ao copiar link:', error);
    return false;
  }
};

export const validarCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.length === 14;
};

export const validarCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.length === 11;
};

export const formatarCNPJCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 11) {
    // CPF: 000.000.000-00
    return cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ: 00.000.000/0000-00
    return cleaned
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
};

export const validarSenhaForte = (senha: string): { valida: boolean; mensagem: string } => {
  if (senha.length < 8) {
    return { valida: false, mensagem: 'A senha deve ter no mínimo 8 caracteres' };
  }
  if (!/[A-Z]/.test(senha)) {
    return { valida: false, mensagem: 'A senha deve conter pelo menos uma letra maiúscula' };
  }
  if (!/[0-9]/.test(senha)) {
    return { valida: false, mensagem: 'A senha deve conter pelo menos um número' };
  }
  return { valida: true, mensagem: '' };
};
