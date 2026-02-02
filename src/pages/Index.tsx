import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Megaphone, User, ChevronDown } from "lucide-react";

const Index = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section - Full Screen */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Fixed Glassmorphism Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5">
          <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2 md:gap-3">
              <ThemeToggle />
              <Link to="/profile">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 w-10 h-10 transition-all duration-300"
                >
                  <User className="w-5 h-5 text-foreground" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6 pt-20">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up drop-shadow-lg">
              Welcome to{" "}
              <span className="text-primary">UniEasy</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 animate-fade-up stagger-1 drop-shadow-md">
              Your one-stop platform for discovering food, accommodation, and amazing places around your university campus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-2">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Get Started
                </Button>
              </Link>
              <Link to="/home">
                <Button variant="outline" size="xl" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  Explore as Guest
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/80 animate-fade-up stagger-3">
              Already have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </main>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300 hover:translate-y-1 z-20"
        >
          <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
            Scroll down
          </span>
          <div className="w-10 h-14 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-white/70 transition-colors">
            <ChevronDown className="w-6 h-6 text-white/70 animate-bounce group-hover:text-white" />
          </div>
        </button>
      </div>

      {/* Run Your Advertisement - Bottom Right above Footer */}
      <div className="relative z-10 flex justify-end px-4 md:px-6 py-8 bg-background">
        <Link to="/merchant">
          <Button variant="default" size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Megaphone className="w-5 h-5" />
            Run Your Advertisement
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
