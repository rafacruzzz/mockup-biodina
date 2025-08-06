
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  department: string;
  avatar: string;
  online: boolean;
}

interface ChatWindowProps {
  user: User;
  onBack: () => void;
  onClose: () => void;
}

const ChatWindow = ({ user, onBack, onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, markAsRead } = useChat(user.id);

  useEffect(() => {
    markAsRead(user.id);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, user.id, markAsRead]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(user.id, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Comercial': return 'bg-blue-100 text-blue-700';
      case 'RH': return 'bg-purple-100 text-purple-700';
      case 'Financeiro': return 'bg-green-100 text-green-700';
      case 'Estoque': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-96 shadow-lg border-0 bg-white flex flex-col">
        <CardHeader className="bg-biodina-blue text-white p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-medium">
                    {user.avatar}
                  </div>
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge 
                    className={cn(getDepartmentColor(user.department), "text-xs")} 
                    variant="outline"
                  >
                    {user.department}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isFromMe ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs px-3 py-2 rounded-lg text-sm",
                    msg.isFromMe
                      ? "bg-biodina-blue text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <p>{msg.text}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    msg.isFromMe ? "text-white/70" : "text-gray-500"
                  )}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100 p-4 flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-biodina-blue hover:bg-biodina-blue/90"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWindow;
