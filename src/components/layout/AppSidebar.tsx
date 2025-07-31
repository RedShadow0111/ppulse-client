// components/layout/AppSidebar.tsx
'use client';

import { cn } from "@/lib/utils"
import {
  BarChart3,
  Briefcase,
  FileStack,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Portfolio overview & KPIs"
  },
  {
    title: "Portfolio",
    url: "/portfolio",
    icon: FolderOpen,
    description: "Project matrix & optimization"
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FileStack,
    description: "Project management & scheduling"
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: FileStack,
    description: "Task management & tracking"
  },
  {
    title: "Resources",
    url: "/resources",
    icon: Users,
    description: "Team capacity & skills"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Predictive insights & trends"
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    description: "Custom reports & exports"
  },
  {
    title: "Job Board",
    url: "/job-board",
    icon: Briefcase,
    description: "Внешние исполнители"
  },
];

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r border-border transition-all duration-300 bg-background",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">PPM Suite</h2>
              <p className="text-xs text-muted-foreground">Project Portfolio</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-2 overflow-y-auto">
        {/* Navigation Group */}
        <div className="mb-6">
          <div className={cn(!collapsed && "px-2 py-1 text-xs font-medium text-muted-foreground")}>
            {!collapsed && "Main Navigation"}
          </div>
          <div className="mt-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group w-full",
                      "text-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive(item.url) && 
                        "bg-primary text-primary-foreground font-medium"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-200", 
                      "group-hover:scale-110"
                    )} />
                    {!collapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}