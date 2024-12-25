import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, Palette, Link as LinkIcon, Copy, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const [showPreview, setShowPreview] = useState(false);
  const bookingPageUrl = `${window.location.origin}/booking/${123}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingPageUrl);
    toast({
      title: "Link copiado!",
      description: "O link da sua página de agendamento foi copiado para a área de transferência.",
    });
  };

  const handleCustomizationChange = (field: string, value: string) => {
    setCustomization((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const elements = [
    { id: "title", label: "Título" },
    { id: "logo", label: "Logo" },
    { id: "banner", label: "Banner" },
    { id: "services", label: "Serviços" },
    { id: "calendar", label: "Calendário" }
  ];

  const [elementOrder, setElementOrder] = useState(elements);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(elementOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElementOrder(items);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Personalização da Página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Página</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="title"
                    value={customization.title}
                    onChange={(e) => handleCustomizationChange('title', e.target.value)}
                    placeholder="Minha Barbearia"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">Logo da Barbearia</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCustomizationChange('logo', e.target.value)}
                    className="cursor-pointer"
                  />
                  <Image className="w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <Label htmlFor="banner">Banner da Página</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="banner"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCustomizationChange('banner', e.target.value)}
                    className="cursor-pointer"
                  />
                  <Image className="w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <Label htmlFor="primaryColor">Cor Principal</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={customization.primaryColor}
                    onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                    className="w-full h-10 cursor-pointer"
                  />
                  <Palette className="w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <Label htmlFor="buttonColor">Cor dos Botões</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="buttonColor"
                    type="color"
                    value={customization.buttonColor}
                    onChange={(e) => handleCustomizationChange('buttonColor', e.target.value)}
                    className="w-full h-10 cursor-pointer"
                  />
                  <Palette className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">Ordem dos Elementos</CardTitle>
                </CardHeader>
                <CardContent>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="elements">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {elementOrder.map((element, index) => (
                            <Draggable
                              key={element.id}
                              draggableId={element.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                                >
                                  <span>{element.label}</span>
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <ArrowUp className="w-4 h-4" />
                                    <ArrowDown className="w-4 h-4" />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </CardContent>
              </Card>

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

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Fechar Preview" : "Ver Preview"}
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPreview && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Preview da Página</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border" style={{
              '--primary-color': customization.primaryColor,
              '--button-color': customization.buttonColor
            } as React.CSSProperties}>
              <div className="space-y-4">
                {elementOrder.map((element) => (
                  <div key={element.id} className="p-4 border rounded-lg">
                    {element.label}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};