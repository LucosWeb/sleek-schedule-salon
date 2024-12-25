import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

export const StatsCard = ({ title, value, icon, trend, trendUp }: StatsCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-barber-accent/20 rounded-lg">
          {icon}
        </div>
        <span className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {trend}
        </span>
      </div>
      <h3 className="font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);