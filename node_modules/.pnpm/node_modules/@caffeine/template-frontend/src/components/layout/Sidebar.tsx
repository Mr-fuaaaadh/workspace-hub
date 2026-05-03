import { mockGroups } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import type { Group, UserRole } from "@/types";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Mock unread counts per group
const UNREAD: Record<string, number> = {
  "group-1": 3,
  "group-2b": 1,
  "group-5": 7,
};

const ROLE_LABEL: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  employee: "Employee",
};

function UnreadBadge({ count }: { count: number }) {
  return (
    <span className="ml-auto flex-shrink-0 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-foreground text-background text-[10px] font-semibold px-1 leading-none">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function GroupItem({
  group,
  depth = 0,
  onClose,
}: { group: Group; depth?: number; onClose?: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const { setActiveGroupId, activeGroupId } = useUIStore();
  const hasChildren = group.children && group.children.length > 0;
  const isActive = activeGroupId === group.id;
  const unread = UNREAD[group.id] ?? 0;
  const isSubChannel = depth > 0;

  const handleClick = () => {
    setActiveGroupId(group.id);
    navigate({ to: "/chat/$groupId", params: { groupId: group.id } });
    onClose?.();
  };

  const indentPx = depth * 12;

  const initials = group.name
    .split(/[-_\s]/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return (
    <div>
      <div className="relative">
        {isActive && (
          <motion.div
            layoutId="active-channel-indicator"
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-foreground"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}

        <motion.button
          type="button"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.15 }}
          onClick={handleClick}
          data-ocid={`sidebar.group.${group.id}`}
          style={{ paddingLeft: `${20 + indentPx}px` }}
          className={cn(
            "w-full flex items-center gap-2 pr-3 py-1 rounded-md text-sm transition-smooth group/item",
            isActive
              ? "bg-sidebar-accent/30 text-sidebar-foreground font-medium"
              : unread > 0
                ? "text-sidebar-foreground font-medium hover:bg-sidebar-accent/20"
                : "text-muted-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground",
          )}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="flex-shrink-0 text-muted-foreground"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : isSubChannel ? (
            <span className="w-3 h-3 flex-shrink-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
            </span>
          ) : null}

          {/* Circular group avatar */}
          <RadixAvatar.Root className="w-6 h-6 rounded-full ring-1 ring-border flex-shrink-0 overflow-hidden">
            <RadixAvatar.Image
              src={group.avatar}
              alt={group.name}
              className="w-full h-full object-cover"
            />
            <RadixAvatar.Fallback className="w-full h-full flex items-center justify-center bg-muted text-foreground text-[9px] font-semibold">
              {initials}
            </RadixAvatar.Fallback>
          </RadixAvatar.Root>

          <span className="truncate flex-1 text-left">{group.name}</span>

          {unread > 0 && !isActive && <UnreadBadge count={unread} />}
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {group.children!.map((child) => (
              <GroupItem
                key={child.id}
                group={child}
                depth={depth + 1}
                onClose={onClose}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user, company, logout } = useAuthStore();
  const navigate = useNavigate();

  const [footerHovered, setFooterHovered] = useState(false);
  const [groupsExpanded, setGroupsExpanded] = useState(false);

  const pathname = window.location.pathname;

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
    onClose?.();
  };

  const canCreateGroup = user?.role === "owner" || user?.role === "admin";
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
    { id: "groups", label: "Groups", icon: UsersRound, path: "/groups" },
  ] as const;

  const getActiveId = () => {
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/tasks") return "tasks";
    if (pathname.startsWith("/groups") || pathname.startsWith("/chat"))
      return "groups";
    return "dashboard";
  };

  const activeNavId = getActiveId();

  const handleNavClick = (id: "dashboard" | "tasks" | "groups") => {
    if (id === "groups") {
      setGroupsExpanded((v) => !v);
    } else if (id === "tasks") {
      navigate({ to: "/tasks" });
      onClose?.();
    } else {
      navigate({ to: "/dashboard" });
      onClose?.();
    }
  };

  return (
    <div className="flex flex-col w-64 h-full bg-sidebar border-r border-sidebar-border overflow-hidden">
      {/* ── Company Header ── */}
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-foreground text-background flex-shrink-0 shadow-material">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-sm text-sidebar-foreground truncate leading-tight">
            {company?.name ?? "Acme Corp"}
          </p>
          <p className="text-[11px] text-muted-foreground truncate capitalize leading-tight mt-0.5">
            {user?.role ? ROLE_LABEL[user.role] : "Member"} ·{" "}
            <span className="font-mono text-[10px]">{company?.joinCode}</span>
          </p>
        </div>
        <button
          type="button"
          data-ocid="sidebar.company_settings_button"
          aria-label="Company settings"
          className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-smooth"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Separator */}
      <div className="mx-3 border-t border-sidebar-border" />

      {/* ── Main Nav ── */}
      <div className="flex-1 overflow-y-auto pb-2">
        <div className="px-1 pt-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavId === item.id;
            const isGroupsExpanded = item.id === "groups" && groupsExpanded;

            return (
              <div key={item.id}>
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-foreground"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.button
                    type="button"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleNavClick(item.id)}
                    data-ocid={`sidebar.nav.${item.id}`}
                    className={cn(
                      "w-full flex items-center gap-3 pl-3 pr-3 py-2 rounded-md text-sm transition-smooth",
                      isActive
                        ? "bg-sidebar-accent/30 text-sidebar-foreground font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.id === "groups" && (
                      <motion.span
                        animate={{ rotate: isGroupsExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      </motion.span>
                    )}
                  </motion.button>
                </div>

                {/* Inline group list for Groups nav item */}
                {item.id === "groups" && (
                  <AnimatePresence initial={false}>
                    {groupsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-0.5 space-y-0.5">
                          {mockGroups
                            .filter((g) => !g.parentId)
                            .map((group) => (
                              <GroupItem
                                key={group.id}
                                group={group}
                                onClose={onClose}
                              />
                            ))}
                          {canCreateGroup && (
                            <motion.button
                              type="button"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.15 }}
                              data-ocid="sidebar.create_group_button"
                              className="w-full flex items-center gap-2 pl-8 pr-3 py-1 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground transition-smooth"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add a channel</span>
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── User Footer ── */}
      <div className="border-t border-sidebar-border">
        <motion.div
          onHoverStart={() => setFooterHovered(true)}
          onHoverEnd={() => setFooterHovered(false)}
          className="flex items-center gap-2.5 px-3 py-3 group/footer"
          data-ocid="sidebar.user_footer"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0 text-xs font-semibold text-sidebar-foreground shadow-sm">
            {initials}
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground truncate leading-tight">
              {user?.name ?? "You"}
            </p>
            <span className="inline-flex items-center mt-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wide bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 leading-none">
                {user?.role ? ROLE_LABEL[user.role] : "Member"}
              </span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-0.5">
            <AnimatePresence>
              {footerHovered && (
                <motion.button
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  onClick={handleLogout}
                  data-ocid="sidebar.logout_button"
                  aria-label="Log out"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-smooth overflow-hidden"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
