import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, ExternalLink, Settings } from "lucide-react";

interface AppCardProps {
  name: string;
  description: string;
  status: "active" | "inactive" | "building";
  users: number;
  color: string;
}

export const AppCard = ({ name, description, status, users, color }: AppCardProps) => {
  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    inactive: "bg-muted text-muted-foreground border-border",
    building: "bg-primary/10 text-primary border-primary/20"
  };

  return (
    <Card className="p-6 hover:shadow-card transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
          style={{ background: color }}
        >
          {name.charAt(0)}
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {users.toLocaleString()} users
        </span>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <ExternalLink className="w-4 h-4" />
          Open
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </Card>
  );
};
