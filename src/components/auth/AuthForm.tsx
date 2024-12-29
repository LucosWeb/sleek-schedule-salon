import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

export const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulando autenticação - em produção, isso seria integrado com um backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (mode === 'register') {
      if (users.some((user: any) => user.email === email)) {
        toast.error("Email já cadastrado");
        return;
      }
      
      users.push({
        id: Date.now().toString(),
        email,
        password, // Em produção, isso seria hasheado
        name,
        phone
      });
      localStorage.setItem('users', JSON.stringify(users));
      toast.success("Cadastro realizado com sucesso!");
      onSuccess();
    } else {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success("Login realizado com sucesso!");
        onSuccess();
      } else {
        toast.error("Credenciais inválidas");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Login' : 'Cadastro'}</CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Entre com suas credenciais para agendar' 
            : 'Crie sua conta para começar a agendar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-sm font-medium">Nome completo</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};