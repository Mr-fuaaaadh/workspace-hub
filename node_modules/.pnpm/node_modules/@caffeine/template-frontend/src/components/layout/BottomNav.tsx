import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { CheckSquare, Home, UserCircle, Users } from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, path: "/dashboard" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, path: "/tasks" },
  { id: "groups", label: "Groups", icon: Users, path: "/groups" },
  { id: "profile", label: "Profile", icon: UserCircle, path: "/profile" },
] as const;

export function BottomNav() {
  const navigate = useNavigate();

  const isActive = (id: string) => {
    const pathname = window.location.pathname;
    if (id === "home") return pathname === "/dashboard";
    if (id === "tasks") return pathname === "/tasks";
    if (id === "groups")
      return pathname.startsWith("/groups") || pathname.startsWith("/chat");
    if (id === "profile") return pathname === "/profile";
    return false;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-material-elevated"
      aria-label="Mobile navigation"
    >
      <div className="flex">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.id);
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                navigate({
                  to: item.path as
                    | "/dashboard"
                    | "/tasks"
                    | "/groups"
                    | "/profile",
                })
              }
              data-ocid={`bottom_nav.${item.id}_tab`}
              className={cn(
                "w-1/4 flex flex-col items-center justify-center py-2.5 gap-1 transition-smooth",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-smooth",
                  active ? "bg-muted" : "",
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn("text-xs", active ? "font-medium" : "")}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
