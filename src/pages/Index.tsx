import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsOverview } from "@/components/StatsOverview";
import { AppsDashboard } from "@/components/AppsDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <Hero />
      <StatsOverview />
      <AppsDashboard />
      
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 AppMaster. Built with passion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
