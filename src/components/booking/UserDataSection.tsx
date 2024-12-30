import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserDataSectionProps {
  clientName: string;
  clientEmail: string;
}

export const UserDataSection = ({ clientName, clientEmail }: UserDataSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Seus Dados
        </CardTitle>
        <CardDescription>Seus dados de cadastro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Seu nome completo"
            value={clientName}
            onChange={() => {}}
            disabled
          />
          <Input
            type="email"
            placeholder="Seu email"
            value={clientEmail}
            disabled
          />
        </div>
      </CardContent>
    </Card>
  );
};