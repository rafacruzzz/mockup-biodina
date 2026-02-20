
import { useState, useEffect } from "react";
import { MessageCircle, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ChatWindow from "./ChatWindow";
import { useChat } from "@/hooks/useChat";

const MOCK_USERS = [
  { id: '1', name: 'João Silva', department: 'Comercial', avatar: 'JS', online: true },
  { id: '2', name: 'Maria Santos', department: 'RH', avatar: 'MS', online: true },
  { id: '3', name: 'Carlos Oliveira', department: 'Financeiro', avatar: 'CO', online: false },
  { id: '4', name: 'Ana Costa', department: 'Estoque', avatar: 'AC', online: true },
];

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { getUnreadCount } = useChat();
  const [unreadTotal, setUnreadTotal] = useState(0);

  useEffect(() => {
    const total = MOCK_USERS.reduce((acc, user) => acc + getUnreadCount(user.id), 0);
    setUnreadTotal(total);
  }, [getUnreadCount]);

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Comercial': return 'bg-blue-100 text-blue-700';
      case 'RH': return 'bg-purple-100 text-purple-700';
      case 'Financeiro': return 'bg-green-100 text-green-700';
      case 'Estoque': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedUser) {
    const user = MOCK_USERS.find(u => u.id === selectedUser);
    if (user) {
      return (
        <ChatWindow 
          user={user}
          onBack={() => setSelectedUser(null)}
          onClose={() => {
            setSelectedUser(null);
            setIsOpen(false);
          }}
        />
      );
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg border-0 bg-white">
          <CardHeader className="bg-imuv-blue text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chat Interno
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {MOCK_USERS.map((user) => {
                const unreadCount = getUnreadCount(user.id);
                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-imuv-blue text-white flex items-center justify-center text-sm font-medium">
                        {user.avatar}
                      </div>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        {unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white ml-2">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                      <Badge 
                        className={cn(getDepartmentColor(user.department), "mt-1")} 
                        variant="outline"
                      >
                        {user.department}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-imuv-blue hover:bg-imuv-blue/90 shadow-lg relative"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {unreadTotal > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs">
            {unreadTotal > 99 ? '99+' : unreadTotal}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default FloatingChat;
