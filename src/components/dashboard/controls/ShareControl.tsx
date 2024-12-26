import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareControlProps {
  bookingPageUrl: string;
}

export const ShareControl = ({ bookingPageUrl }: ShareControlProps) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingPageUrl);
    toast({
      title: "Link copiado!",
      description: "O link da sua página de agendamento foi copiado para a área de transferência.",
    });
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <LinkIcon className="w-5 h-5" />
          Link da Página de Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            value={bookingPageUrl}
            readOnly
            className="bg-white"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyLink}
            className="shrink-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};