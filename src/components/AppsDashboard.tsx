import { AppCard } from "./AppCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

const apps = [
  {
    name: "ShopHub",
    description: "E-commerce platform with real-time inventory management and analytics",
    status: "active" as const,
    users: 1523,
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    name: "TaskFlow",
    description: "Project management tool with team collaboration features",
    status: "active" as const,
    users: 892,
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    name: "DataViz",
    description: "Advanced data visualization and reporting dashboard",
    status: "building" as const,
    users: 234,
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    name: "ChatBox",
    description: "Real-time messaging application with file sharing",
    status: "active" as const,
    users: 2104,
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    name: "DocSpace",
    description: "Document management system with version control",
    status: "inactive" as const,
    users: 456,
    color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    name: "FinTrack",
    description: "Financial tracking and budget management platform",
    status: "active" as const,
    users: 1678,
    color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
  }
];

export const AppsDashboard = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Applications</h2>
            <p className="text-muted-foreground">Manage and monitor all your apps</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <AppCard key={index} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
};
