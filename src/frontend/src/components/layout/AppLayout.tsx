import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { MobileDrawer } from "./MobileDrawer";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        {/* Mobile Bottom Nav */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
