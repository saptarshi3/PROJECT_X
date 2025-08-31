import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Compass, Home, MessageCircle, Brain, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-border/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="text-2xl text-primary" />
          <h1 className="text-xl font-bold text-primary">CareerGuide</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={`hover:text-primary transition-colors ${isActive("/") ? "text-primary" : ""}`}
              data-testid="nav-home"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/quiz">
            <Button 
              variant="ghost" 
              className={`hover:text-primary transition-colors ${isActive("/quiz") ? "text-primary" : ""}`}
              data-testid="nav-quiz"
            >
              <Brain className="mr-2 h-4 w-4" />
              Quiz
            </Button>
          </Link>
          <Link href="/chat">
            <Button 
              variant="ghost" 
              className={`hover:text-primary transition-colors ${isActive("/chat") ? "text-primary" : ""}`}
              data-testid="nav-chat"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="glassmorphism hover:bg-white/20 transition-all"
            data-testid="theme-toggle"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism border-t border-border/20">
          <div className="px-6 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start hover:text-primary transition-colors ${isActive("/") ? "text-primary" : ""}`}
                data-testid="mobile-nav-home"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start hover:text-primary transition-colors ${isActive("/quiz") ? "text-primary" : ""}`}
                data-testid="mobile-nav-quiz"
              >
                <Brain className="mr-2 h-4 w-4" />
                Quiz
              </Button>
            </Link>
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start hover:text-primary transition-colors ${isActive("/chat") ? "text-primary" : ""}`}
                data-testid="mobile-nav-chat"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
