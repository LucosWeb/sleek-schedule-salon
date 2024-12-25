import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const ClientsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Lista de Clientes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-barber-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Cliente {i}</p>
                <p className="text-sm text-gray-500">cliente{i}@email.com</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">4 visitas</p>
              <p className="text-sm text-gray-500">Último: 15/04/2024</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);