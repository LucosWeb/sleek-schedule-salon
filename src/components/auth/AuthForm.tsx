import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

export const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone,
              role: 'client'
            }
          }
        });

        if (error) throw error;
        
        toast.success("Cadastro realizado com sucesso! Verifique seu email.");
        onSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        
        toast.success("Login realizado com sucesso!");
        onSuccess();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || "Erro ao processar sua solicitação");
    } finally {
      setLoading(false);
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
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processando...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};