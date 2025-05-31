
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a static placeholder during SSR and initial client render (before useEffect)
    // This ensures server and client initial HTML match.
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme" // Generic non-theme-dependent label
        className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        // disabled // You could disable it until mounted if preferred
      >
        {/* Static placeholder icon. Using Sun with opacity to distinguish it slightly. */}
        {/* The key is that server and client render this exact same thing initially. */}
        <Sun className="h-5 w-5 opacity-75" /> 
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
