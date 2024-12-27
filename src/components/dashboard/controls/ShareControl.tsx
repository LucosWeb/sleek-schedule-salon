import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareControlProps {
  bookingPageUrl: string;
}

export const ShareControl = ({ bookingPageUrl }: ShareControlProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingPageUrl);
    toast({
      title: "Link copiado!",
      description: "O link da sua página foi copiado para a área de transferência.",
    });
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-lg">Compartilhar Página</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={bookingPageUrl} readOnly />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Link2 className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(bookingPageUrl, '_blank')}
        >
          Visualizar Página
        </Button>
      </CardContent>
    </Card>
  );
};