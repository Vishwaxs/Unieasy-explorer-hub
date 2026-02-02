import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Moon, Sun, Menu, X, Home, Mail, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/contact", label: "Contact", icon: Mail },
    { to: "/terms", label: "Terms", icon: FileText },
    { to: "/privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism navbar - lighter and compact */}
      <div className="bg-background/80 backdrop-blur-lg border-b border-border/30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 w-10 h-10 transition-all duration-300"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </Button>
            
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 w-10 h-10"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 w-10 h-10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2 bg-background/80 backdrop-blur-xl border-t border-white/10">
            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Profile</span>
            </Link>
            
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
