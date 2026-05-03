import { useUIStore } from "@/stores/ui.store";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";

export function MobileDrawer() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // Close drawer on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [sidebarOpen, setSidebarOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            data-ocid="mobile_drawer.backdrop"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="md:hidden fixed inset-y-0 left-0 z-50"
            data-ocid="mobile_drawer.panel"
          >
            <div className="relative h-full shadow-material-elevated">
              <Sidebar onClose={() => setSidebarOpen(false)} />
              {/* Close button — positioned outside the sidebar edge */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                data-ocid="mobile_drawer.close_button"
                aria-label="Close navigation"
                className="absolute top-4 -right-10 z-10 p-2 rounded-lg bg-card border border-border text-foreground shadow-material hover:bg-muted transition-smooth"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
