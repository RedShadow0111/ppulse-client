// components/layout/AppHeader.tsx
'use client';

import { Bell, Moon, Search, Sun, User } from "lucide-react"
import { useEffect, useState } from "react"
import { MyTasksDropdown } from "./MyTasksDropdown"

export function AppHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Проверяем тему в localStorage или системную тему
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button className="hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors">
            <div className="w-5 h-5" />
          </button>
          
          {/* Global search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search projects, resources, reports... (⌘K)"
              className="w-full pl-9 pr-12 py-2 bg-muted/50 border border-border rounded-md focus:bg-background transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-1.5 py-0.5 bg-muted text-xs rounded border">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* My Tasks */}
          <MyTasksDropdown />
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 p-0 hover:bg-accent rounded-lg flex items-center justify-center"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="w-9 h-9 p-0 hover:bg-accent rounded-lg flex items-center justify-center relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                3
              </div>
            </button>
          </div>

          {/* User menu */}
          <div className="relative">
            <button className="h-9 px-3 hover:bg-accent rounded-lg gap-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}