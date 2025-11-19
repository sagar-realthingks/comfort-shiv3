import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AppMaster
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#apps" className="text-foreground hover:text-primary transition-colors">
            My Apps
          </a>
          <a href="#analytics" className="text-foreground hover:text-primary transition-colors">
            Analytics
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            New App
          </Button>
        </div>
      </div>
    </header>
  );
};
