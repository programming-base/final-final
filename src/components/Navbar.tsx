import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = location === "/";

  const navLinks = [
    { href: "#tracks", label: "Eligibility" },
    { href: "#about-ideathon", label: "About" },
    { href: "#steps", label: "Tracks" },
    { href: "#prizes", label: "Prizes" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-gradient-to-r from-black/95 via-[#0a0a1a]/95 to-black/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-cyan-400 to-blue-500 flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <span className="text-black font-bold font-display text-xl">I</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
              INNOV<span className="text-primary">GENIUS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-primary transition-all tracking-wider uppercase text-[11px] cursor-pointer group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg transition-all duration-300"></span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/5">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={() => logout()} 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => window.open('https://unstop.com/hackathons/innovgenius-2026-hackathon-acm-tcet-1631419', '_blank')} 
                className="ml-4 bg-gradient-to-r from-primary via-cyan-400 to-blue-500 text-black font-bold hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 border-0 transition-all duration-300 rounded-full px-8 py-2.5"
              >
                Register Now
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-black/98 to-[#0a0a1a]/98 border-b border-primary/20 overflow-hidden backdrop-blur-xl"
          >
            <div className="px-4 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setIsOpen(false);
                  }}
                  className="relative px-4 py-3 text-base font-display text-white/80 hover:text-primary cursor-pointer bg-white/5 hover:bg-primary/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-primary/30"
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <span className="text-lg font-display text-white/80 hover:text-primary block">Dashboard</span>
                  </Link>
                  <Button onClick={() => logout()} className="w-full bg-primary text-black">Logout</Button>
                </>
              ) : (
                <Button 
                  onClick={() => window.open('https://unstop.com/hackathons/innovgenius-2026-hackathon-acm-tcet-1631419', '_blank')}
                  className="w-full bg-primary text-black"
                >
                  Register Now
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
