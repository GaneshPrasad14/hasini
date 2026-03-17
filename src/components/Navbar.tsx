import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/shop?category=sunglasses", label: "Sunglasses" },
    { to: "/shop?category=computer", label: "Computer Glasses" },
    { to: "/about", label: "About" },
  ];

  const isHome = location.pathname === "/";
  const navTransparent = isHome && !isScrolled && !mobileOpen;

  const getIsActive = (linkTo: string) => {
    const [linkPath, linkSearch] = linkTo.split("?");
    const isPathMatch = location.pathname === linkPath;
    
    if (linkPath === "/shop") {
      const linkUrlParams = new URLSearchParams(linkSearch || "");
      const linkCat = linkUrlParams.get("category") || "all";
      
      const currentParams = new URLSearchParams(location.search);
      const currentCat = currentParams.get("category") || "all";
      
      return isPathMatch && linkCat === currentCat;
    }
    
    return isPathMatch && !location.search;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navTransparent 
          ? "bg-transparent border-transparent py-4" 
          : "bg-background/95 backdrop-blur-md border-b border-border py-0 shadow-sm"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className={`font-display text-2xl font-bold tracking-tight transition-colors ${
            navTransparent ? "text-white" : "text-foreground"
          }`}
        >
          HASINI EYE CLINIC AND OPTICS
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = getIsActive(l.to);
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  navTransparent 
                    ? "text-white/90 hover:text-white" 
                    : isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className={`p-2 rounded-full transition-colors ${
            navTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
          }`}>
            <Search className="w-5 h-5" />
          </button>
          <button className={`hidden sm:flex p-2 rounded-full transition-colors ${
            navTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
          }`}>
            <Heart className="w-5 h-5" />
          </button>
          <Link 
            to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'}
            className={`hidden sm:flex p-2 rounded-full transition-colors ${
              navTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
            }`}
          >
            <User className="w-5 h-5" />
          </Link>
          <Link 
            to="/cart" 
            className={`relative p-2 rounded-full transition-colors ${
              navTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-none rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>
          <button 
            className={`md:hidden p-2 transition-colors ${
              navTransparent ? "text-white" : "text-foreground"
            }`} 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {links.map((l) => {
                const isActive = getIsActive(l.to);
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium py-2 transition-colors flex items-center justify-between ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {l.label}
                    {isActive && <Badge variant="default" className="text-[10px] h-5">Selected</Badge>}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
