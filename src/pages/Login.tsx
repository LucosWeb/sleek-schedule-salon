import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-barber-light to-white">
      <Card className="w-[400px] shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-barber-primary rounded-full flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">
            Entre para gerenciar sua barbearia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                placeholder="seu@email.com" 
                className="border-gray-200 focus:border-barber-primary focus:ring-barber-primary"
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input 
                type="password" 
                className="border-gray-200 focus:border-barber-primary focus:ring-barber-primary"
                required 
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
            >
              Entrar
            </Button>
            <div className="text-center text-sm text-gray-500">
              <a href="#" className="hover:text-barber-primary">Esqueceu sua senha?</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;