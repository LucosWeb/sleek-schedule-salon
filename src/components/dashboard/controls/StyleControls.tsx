import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Palette } from "lucide-react";

interface StyleControlsProps {
  customization: {
    logo: string;
    banner: string;
    primaryColor: string;
    buttonColor: string;
    title: string;
  };
  onCustomizationChange: (field: string, value: string) => void;
}

export const StyleControls = ({ customization, onCustomizationChange }: StyleControlsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título da Página</Label>
        <div className="flex items-center gap-2">
          <Input
            id="title"
            value={customization.title}
            onChange={(e) => onCustomizationChange('title', e.target.value)}
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
            onChange={(e) => onCustomizationChange('logo', e.target.value)}
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
            onChange={(e) => onCustomizationChange('banner', e.target.value)}
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
            onChange={(e) => onCustomizationChange('primaryColor', e.target.value)}
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
            onChange={(e) => onCustomizationChange('buttonColor', e.target.value)}
            className="w-full h-10 cursor-pointer"
          />
          <Palette className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};