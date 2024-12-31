import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        return null;
      }
      return session;
    }
  });

  // Redirect if already logged in
  if (session) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) {
        console.error("Login error:", error);
        if (error.message === "Email logins are disabled") {
          toast.error("Email authentication is not enabled in Supabase. Please contact administrator.");
        } else if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message || "Failed to login");
        }
        return;
      }

      if (data?.user) {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your barbershop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                className="border-gray-200 focus:border-barber-primary focus:ring-barber-primary"
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200 focus:border-barber-primary focus:ring-barber-primary"
                required 
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm text-gray-500">
              <a href="#" className="hover:text-barber-primary">Forgot your password?</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;