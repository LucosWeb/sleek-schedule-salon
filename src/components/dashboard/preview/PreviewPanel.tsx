import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElementOrder } from "../types/customization";

interface PreviewPanelProps {
  customization: {
    logo: string;
    banner: string;
    primaryColor: string;
    buttonColor: string;
    title: string;
  };
  elementOrder: ElementOrder[];
}

export const PreviewPanel = ({ customization, elementOrder }: PreviewPanelProps) => {
  return (
    <div className="w-full h-[calc(100vh-12rem)] overflow-auto bg-gray-100 rounded-lg shadow-inner">
      <div className="bg-white p-6 min-h-full" style={{
        '--primary-color': customization.primaryColor,
        '--button-color': customization.buttonColor
      } as React.CSSProperties}>
        {elementOrder.map((element) => (
          <div key={element.id} className="mb-4">
            {element.id === 'title' && (
              <h1 className="text-3xl font-bold text-center mb-6">{customization.title}</h1>
            )}
            {element.id === 'logo' && customization.logo && (
              <div className="flex justify-center mb-6">
                <img src={customization.logo} alt="Logo" className="max-h-24" />
              </div>
            )}
            {element.id === 'banner' && customization.banner && (
              <div className="w-full mb-6">
                <img src={customization.banner} alt="Banner" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
            {element.id === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold">Corte de Cabelo</h3>
                  <p className="text-gray-600">30 min - R$ 50</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold">Barba</h3>
                  <p className="text-gray-600">20 min - R$ 35</p>
                </div>
              </div>
            )}
            {element.id === 'calendar' && (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-4">Calendário de Agendamento</h3>
                <div className="bg-gray-50 p-4 rounded">
                  [Visualização do Calendário]
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};