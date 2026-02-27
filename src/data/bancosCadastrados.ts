export interface BancoCadastrado {
  id: string;
  nome: string;
  codigo: string;
  agencia: string;
  conta: string;
}

export const bancosCadastrados: BancoCadastrado[] = [
  { id: '1', nome: 'Banco do Brasil', codigo: '001', agencia: '1234-5', conta: '56789-0' },
  { id: '2', nome: 'Itaú Unibanco', codigo: '341', agencia: '0987-6', conta: '12345-7' },
  { id: '3', nome: 'Bradesco', codigo: '237', agencia: '3456-7', conta: '78901-2' },
  { id: '4', nome: 'Santander', codigo: '033', agencia: '4567-8', conta: '23456-3' },
  { id: '5', nome: 'Caixa Econômica Federal', codigo: '104', agencia: '5678-9', conta: '34567-4' },
  { id: '6', nome: 'Nubank', codigo: '260', agencia: '0001', conta: '98765-1' },
  { id: '7', nome: 'Banco Inter', codigo: '077', agencia: '0001', conta: '45678-5' },
  { id: '8', nome: 'C6 Bank', codigo: '336', agencia: '0001', conta: '67890-6' },
];
