import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Compass, Home, MessageCircle, Brain, Sun, Moon, Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./auth-modal";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'navbar-blur backdrop-blur-md border-b border-border/30 shadow-lg' 
          : 'glassmorphism border-b border-border/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Compass className="text-2xl text-primary group-hover:text-accent transition-colors" />
          </motion.div>
          <h1 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">CareerGuide</h1>
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
          {isAuthenticated && (
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                className={`hover:text-primary transition-colors ${isActive("/dashboard") ? "text-primary" : ""}`}
                data-testid="nav-dashboard"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          )}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="glassmorphism hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
              data-testid="theme-toggle"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Hi, {user?.fullName || user?.username}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="glassmorphism hover:bg-destructive/20 transition-all"
                data-testid="logout-button"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="glassmorphism bg-primary text-primary-foreground hover:scale-105 transition-all"
              data-testid="login-button"
            >
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
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
            {isAuthenticated && (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start hover:text-primary transition-colors ${isActive("/dashboard") ? "text-primary" : ""}`}
                  data-testid="mobile-nav-dashboard"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-destructive hover:text-destructive"
                data-testid="mobile-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-primary text-primary-foreground"
                data-testid="mobile-login"
              >
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={(user) => {
          login(user);
          setAuthModalOpen(false);
        }} 
      />
    </motion.nav>
  );
}
