import { mockGroups } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui.store";
import { Hash, Menu, MoreVertical, PanelRight, Users } from "lucide-react";
import { motion } from "motion/react";

function findGroup(
  id: string,
  groups: typeof mockGroups,
): (typeof mockGroups)[0] | null {
  for (const g of groups) {
    if (g.id === id) return g;
    if (g.children) {
      const found = findGroup(id, g.children as typeof mockGroups);
      if (found) return found;
    }
  }
  return null;
}

export function TopBar() {
  const { activeGroupId, rightPanelOpen, toggleRightPanel, toggleSidebar } =
    useUIStore();
  const group = activeGroupId ? findGroup(activeGroupId, mockGroups) : null;

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-border bg-card shadow-xs flex-shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleSidebar}
          data-ocid="topbar.menu_button"
          className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        >
          <Menu className="w-5 h-5" />
        </button>

        {group ? (
          <div className="flex items-center gap-2 min-w-0">
            <Hash className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="font-display font-semibold text-sm text-foreground truncate">
                {group.name}
              </h2>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {group.memberCount} members
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="font-display font-semibold text-sm text-foreground">
            Select a channel
          </h2>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRightPanel}
          data-ocid="topbar.toggle_right_panel"
          className={cn(
            "p-1.5 rounded-lg transition-smooth",
            rightPanelOpen
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
          title="Toggle tasks panel"
        >
          <PanelRight className="w-4 h-4" />
        </motion.button>

        <button
          type="button"
          data-ocid="topbar.more_actions"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
