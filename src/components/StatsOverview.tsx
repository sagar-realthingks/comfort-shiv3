import { Card } from "@/components/ui/card";
import { TrendingUp, Boxes, Users, Activity } from "lucide-react";

const stats = [
  {
    label: "Total Apps",
    value: "24",
    change: "+12%",
    icon: Boxes,
    color: "text-primary"
  },
  {
    label: "Active Users",
    value: "1,234",
    change: "+23%",
    icon: Users,
    color: "text-accent"
  },
  {
    label: "Uptime",
    value: "99.9%",
    change: "+0.1%",
    icon: Activity,
    color: "text-green-500"
  },
  {
    label: "Growth",
    value: "+45%",
    change: "This month",
    icon: TrendingUp,
    color: "text-primary"
  }
];

export const StatsOverview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
