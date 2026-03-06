"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { useUIStore } from "@/store";
import { cn } from "@/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useUIStore();
  
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isLanding = pathname === "/";
  const isEditor = pathname.startsWith("/editor");

  if (isAuthPage || isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-0",
          isSidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
