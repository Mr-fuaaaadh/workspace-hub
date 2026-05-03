import { mockGroups } from "@/lib/mock-data";
import { useUIStore } from "@/stores/ui.store";
import type { Group } from "@/types";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { useNavigate } from "@tanstack/react-router";
import { Hash, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

const LAST_ACTIVITY: Record<string, string> = {
  "group-1": "5 min ago",
  "group-2": "3 min ago",
  "group-2a": "1 hr ago",
  "group-2b": "20 min ago",
  "group-3": "10 min ago",
  "group-4": "2 hrs ago",
  "group-5": "15 min ago",
  "group-5a": "45 min ago",
};

// Flatten groups including children
function flattenGroups(groups: Group[]): Group[] {
  const result: Group[] = [];
  for (const g of groups) {
    result.push(g);
    if (g.children?.length) {
      result.push(...g.children);
    }
  }
  return result;
}

function GroupCard({ group, index }: { group: Group; index: number }) {
  const navigate = useNavigate();
  const { setActiveGroupId } = useUIStore();

  const handleClick = () => {
    setActiveGroupId(group.id);
    navigate({ to: "/chat/$groupId", params: { groupId: group.id } });
  };

  const isChild = !!group.parentId;
  const initials = group.name
    .split(/[-_\s]/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -2, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      data-ocid={`group_list.group_card.${index + 1}`}
      className="group/card bg-card border border-border rounded-2xl p-5 cursor-pointer shadow-material hover:shadow-material-elevated transition-smooth"
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-3">
        <RadixAvatar.Root className="w-12 h-12 rounded-full ring-1 ring-border flex-shrink-0 overflow-hidden">
          <RadixAvatar.Image
            src={group.avatar}
            alt={group.name}
            className="w-full h-full object-cover"
          />
          <RadixAvatar.Fallback className="w-full h-full flex items-center justify-center bg-muted text-foreground text-sm font-semibold">
            {initials}
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate leading-tight">
            {group.name}
          </p>
          {group.description && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
              {group.description}
            </p>
          )}
        </div>

        {isChild && (
          <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-medium flex-shrink-0">
            sub
          </span>
        )}
      </div>

      {/* Footer meta */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{group.memberCount} members</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {LAST_ACTIVITY[group.id] ?? "—"}
        </span>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ id }: { id: string }) {
  return (
    <div
      key={id}
      className="bg-card border border-border rounded-2xl p-5 animate-pulse"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-muted rounded w-2/3" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-4/5" />
        </div>
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-border">
        <div className="h-3 bg-muted rounded w-24" />
        <div className="h-3 bg-muted rounded w-16" />
      </div>
    </div>
  );
}

export function GroupListPage() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setGroups(flattenGroups(mockGroups));
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const allGroups = flattenGroups(mockGroups);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Page header */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">
              Groups
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {allGroups.length} channels in your workspace
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {SKELETON_KEYS.map((id) => (
                <SkeletonCard key={id} id={id} />
              ))}
            </motion.div>
          ) : groups.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="group_list.empty_state"
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Hash className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-base">
                No groups yet
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Groups will appear here once they are created in your workspace.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {groups.map((group, i) => (
                <GroupCard key={group.id} group={group} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
