import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TurtleLogo } from "./TurtleLogo";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const navLinks = [
  { label: "Shop All", href: "#shop" },
  { label: "Postcards", href: "#shop" },
  { label: "Letters", href: "#shop" },
  { label: "Stickers", href: "#shop" },
  { label: "Kits", href: "#featured" },
  { label: "Our Story", href: "#about" },
];

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper shadow-header" : "bg-paper/90 backdrop-blur-sm"
      }`}
    >
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
            aria-label="Turtle Mail Club home"
            data-ocid="nav.home.link"
          >
            <TurtleLogo
              size={28}
              className="text-ink-deep transition-transform duration-500 group-hover:rotate-12"
            />
            <span className="font-sans text-xs font-medium tracking-[0.18em] uppercase text-foreground select-none">
              Turtle Mail Club
            </span>
          </button>

          {/* Desktop nav — ink-stroke underline on hover */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                className="nav-ink font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Utility icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-parchment-light"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={onCartOpen}
              data-ocid="cart.open_modal_button"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-parchment-light"
              aria-label={`Open cart, ${cartCount} items`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-ink-deep text-paper text-[10px] font-medium rounded-full flex items-center justify-center px-1"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-paper border-t border-border overflow-hidden"
          >
            <nav
              className="container-tight py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-3 px-2 font-sans text-sm text-foreground hover:text-ink-deep transition-colors duration-200 border-b border-border last:border-0"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
