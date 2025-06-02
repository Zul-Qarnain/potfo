
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Code2, ChevronDown } from "lucide-react"; // Added ChevronDown
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Imported DropdownMenu components

const navItems = [
  { href: "/", label: "Home" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Me" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile View: Menu Dropdown and Theme Toggle */}
          <div className="flex w-full items-center justify-between md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-headline text-foreground">
                  Menu
                  <ChevronDown className="ml-1.5 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} aria-label={`Navigate to ${item.label}`}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>

          {/* Desktop View: Logo */}
          <Link href="/" className="hidden md:flex items-center gap-2" aria-label="Persona Homepage">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline text-foreground">
              Persona
            </span>
          </Link>

          {/* Desktop View: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop View: Theme Toggle */}
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
