import { useState } from "react";
import { DollarSign, ShoppingCart, Headphones, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/Shell";
import { useNavigate } from "react-router-dom";
import EmprestimosDashboard from "@/components/comercial/EmprestimosDashboard";

interface Module {
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  color: string;
}

const Comercial = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modules = [
    {
      title: "Vendas",
      description: "Gerenciar pedidos, orçamentos e clientes",
      icon: <ShoppingCart className="h-8 w-8 text-biodina-blue" />,
      component: (
        <Button onClick={() => navigate("/vendas")}>Ir para Vendas</Button>
      ),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Pós-Venda",
      description: "Acompanhar satisfação do cliente e suporte técnico",
      icon: <Headphones className="h-8 w-8 text-biodina-blue" />,
      component: (
        <Button onClick={() => navigate("/pos-venda")}>Ir para Pós-Venda</Button>
      ),
      color: "from-green-500 to-green-600"
    },
    {
      title: "Promoções",
      description: "Criar e gerenciar campanhas promocionais",
      icon: <Percent className="h-8 w-8 text-biodina-blue" />,
      component: (
        <Button onClick={() => navigate("/promocoes")}>Ir para Promoções</Button>
      ),
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Empréstimos",
      description: "Gestão de empréstimos de produtos e devoluções",
      icon: <DollarSign className="h-8 w-8 text-biodina-blue" />,
      component: <EmprestimosDashboard />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <Shell>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className={`p-4 bg-gradient-to-r ${module.color} text-white`}>
              <div className="flex items-center space-x-4">
                {module.icon}
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600">{module.description}</p>
              <div className="mt-4">{module.component}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Shell>
  );
};

export default Comercial;
