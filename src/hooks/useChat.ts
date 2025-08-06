
import { useState, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
  read: boolean;
}

interface ChatData {
  [userId: string]: Message[];
}

const STORAGE_KEY = 'biodina-chat-data';
const CURRENT_USER = 'current-user';

// Simulador de mensagens automáticas dos usuários fictícios
const AUTO_RESPONSES = {
  '1': [
    "Olá! Como posso ajudar?",
    "Estou analisando a proposta comercial.",
    "Vou verificar com o cliente e te retorno.",
    "Perfeito, vamos seguir com essa estratégia.",
  ],
  '2': [
    "Oi! Tudo bem?",
    "Vou verificar os dados do colaborador.",
    "Já enviei o contrato para análise.",
    "Pode contar comigo para esse processo!",
  ],
  '3': [
    "Bom dia! Em que posso auxiliar?",
    "Os valores estão corretos, pode prosseguir.",
    "Vou fazer a análise financeira hoje.",
    "Aprovado! Pode seguir com o pagamento.",
  ],
  '4': [
    "Oi! Como vai?",
    "Temos o produto em estoque, sim.",
    "Vou separar os itens ainda hoje.",
    "Estoque atualizado! Confere aí.",
  ],
};

export const useChat = (activeUserId?: string) => {
  const [chatData, setChatData] = useState<ChatData>({});
  const [messages, setMessages] = useState<Message[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setChatData(parsed);
      } catch (error) {
        console.error('Erro ao carregar dados do chat:', error);
      }
    }
  }, []);

  // Atualizar mensagens quando o usuário ativo mudar
  useEffect(() => {
    if (activeUserId && chatData[activeUserId]) {
      setMessages(chatData[activeUserId]);
    } else {
      setMessages([]);
    }
  }, [activeUserId, chatData]);

  // Salvar no localStorage sempre que os dados mudarem
  const saveChatData = useCallback((newData: ChatData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setChatData(newData);
  }, []);

  // Enviar mensagem
  const sendMessage = useCallback((userId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isFromMe: true,
      read: true,
    };

    const updatedData = {
      ...chatData,
      [userId]: [...(chatData[userId] || []), newMessage],
    };

    saveChatData(updatedData);

    // Simular resposta automática após 2-5 segundos
    setTimeout(() => {
      const responses = AUTO_RESPONSES[userId as keyof typeof AUTO_RESPONSES];
      if (responses) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const autoMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          isFromMe: false,
          read: false,
        };

        const finalData = {
          ...updatedData,
          [userId]: [...updatedData[userId], autoMessage],
        };

        saveChatData(finalData);
      }
    }, Math.random() * 3000 + 2000); // 2-5 segundos

  }, [chatData, saveChatData]);

  // Marcar mensagens como lidas
  const markAsRead = useCallback((userId: string) => {
    if (!chatData[userId]) return;

    const updatedMessages = chatData[userId].map(msg => 
      msg.isFromMe ? msg : { ...msg, read: true }
    );

    const updatedData = {
      ...chatData,
      [userId]: updatedMessages,
    };

    saveChatData(updatedData);
  }, [chatData, saveChatData]);

  // Contar mensagens não lidas
  const getUnreadCount = useCallback((userId: string) => {
    if (!chatData[userId]) return 0;
    return chatData[userId].filter(msg => !msg.isFromMe && !msg.read).length;
  }, [chatData]);

  return {
    messages,
    sendMessage,
    markAsRead,
    getUnreadCount,
  };
};
