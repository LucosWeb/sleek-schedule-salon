import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import { PreviewPanel } from "./preview/PreviewPanel";
import { ElementOrderControl } from "./controls/ElementOrderControl";
import { StyleControls } from "./controls/StyleControls";
import { ShareControl } from "./controls/ShareControl";
import { ElementOrder } from "./types/customization";
import { useToast } from "@/components/ui/use-toast";

interface CustomizationTabProps {
  customization: {
    logo: string;
    banner: string;
    primaryColor: string;
    buttonColor: string;
    title: string;
  };
  setCustomization: (value: any) => void;
}

export const CustomizationTab = ({ customization, setCustomization }: CustomizationTabProps) => {
  const { toast } = useToast();
  const userId = localStorage.getItem('userId') || '123';
  const [bookingPageUrl, setBookingPageUrl] = useState(`${window.location.origin}/booking/${userId}`);
  
  const [elementOrder, setElementOrder] = useState<ElementOrder[]>([
    { id: "title", label: "Título" },
    { id: "logo", label: "Logo" },
    { id: "banner", label: "Banner" },
    { id: "services", label: "Serviços" },
    { id: "calendar", label: "Calendário" }
  ]);

  useEffect(() => {
    // Load saved customizations when component mounts
    const savedCustomization = localStorage.getItem(`bookingPageCustomization_${userId}`);
    if (savedCustomization) {
      const { elementOrder: savedElementOrder } = JSON.parse(savedCustomization);
      setElementOrder(savedElementOrder);
    }
  }, [userId]);

  const handleCustomizationChange = (field: string, value: string) => {
    setCustomization((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(elementOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElementOrder(items);
  };

  const handleSave = () => {
    const customizationData = {
      customization,
      elementOrder
    };
    
    localStorage.setItem(`bookingPageCustomization_${userId}`, JSON.stringify(customizationData));
    
    // Force update the booking page URL to trigger a re-render
    setBookingPageUrl(`${window.location.origin}/booking/${userId}?update=${Date.now()}`);
    
    toast({
      title: "Alterações salvas com sucesso!",
      description: "Suas personalizações foram aplicadas à página de agendamento.",
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
      <div className="col-span-4 bg-white rounded-lg shadow-lg overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Personalização
          </h2>
        </div>
        
        <div className="p-4 space-y-6">
          <StyleControls 
            customization={customization}
            onCustomizationChange={handleCustomizationChange}
          />
          
          <ElementOrderControl 
            elementOrder={elementOrder}
            onDragEnd={onDragEnd}
          />
          
          <ShareControl bookingPageUrl={bookingPageUrl} />
          
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
          >
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="col-span-8">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Visualização da Página</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <PreviewPanel 
              customization={customization}
              elementOrder={elementOrder}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};