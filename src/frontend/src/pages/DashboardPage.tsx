import { CreateGroupModal } from "@/components/modals/CreateGroupModal";
import { JoinCompanyModal } from "@/components/modals/JoinCompanyModal";
import { mockGroups, mockTasks, mockUsers } from "@/lib/mock-data";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import type { Task } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckSquare,
  Hash,
  LogIn,
  Plus,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Static skeleton key arrays (no runtime IDs)
const SKELETON_KEYS_KPI = ["kpi-1", "kpi-2", "kpi-3", "kpi-4"] as const;
const SKELETON_KEYS_TASK = ["t-sk-1", "t-sk-2", "t-sk-3"] as const;
const SKELETON_KEYS_ACTIVITY = [
  "act-sk-1",
  "act-sk-2",
  "act-sk-3",
  "act-sk-4",
] as const;

const allTasks = Object.values(mockTasks).flat();
const completedTasks = allTasks.filter((t) => t.status === "completed");

const recentActivity = [
  {
    id: 1,
    text: "Sarah Chen joined marketing-team",
    time: "2m ago",
    icon: Users,
  },
  {
    id: 2,
    text: "New task added to product-updates",
    time: "15m ago",
    icon: CheckSquare,
  },
  {
    id: 3,
    text: "David Lee completed Q2 report task",
    time: "1h ago",
    icon: Zap,
  },
  {
    id: 4,
    text: "Emily Wong sent a message in #general",
    time: "2h ago",
    icon: Hash,
  },
  {
    id: 5,
    text: "Fuhad created engineering group",
    time: "3h ago",
    icon: Plus,
  },
];

// ── TaskCard ────────────────────────────────────────────────────────────────
interface TaskCardProps {
  task: Task;
  index: number;
  onGroupClick: (id: string) => void;
}

function StatusBadge({ status }: { status: Task["status"] }) {
  if (status === "completed") {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/30 text-foreground font-medium">
        Done
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full border border-muted-foreground text-muted-foreground font-medium">
        In Progress
      </span>
    );
  }
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground text-background font-medium">
      Pending
    </span>
  );
}

function TaskCard({ task, index, onGroupClick }: TaskCardProps) {
  const groupName =
    mockGroups.find((g) => g.id === task.groupId)?.name ?? task.groupId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      className="px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-smooth cursor-pointer"
      onClick={() => onGroupClick(task.groupId)}
      data-ocid={`dashboard.task.${index + 1}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0 mt-1.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-muted-foreground">
            Due: {task.dueDate}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            #{groupName}
          </button>
        </div>
      </div>
      <StatusBadge status={task.status} />
    </motion.div>
  );
}

// ── Role badge styles ───────────────────────────────────────────────────────
const ROLE_BADGE: Record<string, string> = {
  owner:
    "bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  admin:
    "bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  manager:
    "border border-foreground text-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  employee:
    "border border-muted-foreground text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
};

// ── DashboardPage ───────────────────────────────────────────────────────────
export function DashboardPage() {
  const { user, company } = useAuthStore();
  const { setActiveGroupId } = useUIStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [joinCompanyOpen, setJoinCompanyOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  const isAdmin = user?.role === "owner" || user?.role === "admin";

  const adminStats = [
    {
      label: "Total Members",
      value: mockUsers.length,
      icon: Users,
      sub: "in workspace",
    },
    {
      label: "Active Channels",
      value: mockGroups.length,
      icon: Hash,
      sub: "groups",
    },
    {
      label: "Total Tasks",
      value: allTasks.length,
      icon: CheckSquare,
      sub: "across all groups",
    },
    {
      label: "Completion Rate",
      value: `${Math.round((completedTasks.length / allTasks.length) * 100)}%`,
      icon: TrendingUp,
      sub: `${completedTasks.length} completed`,
    },
  ];

  const myTasks = allTasks.filter((t) => t.assignedTo === user?.id);
  const myPending = myTasks.filter(
    (t) => t.status === "pending" || t.status === "in_progress",
  );

  const handleGroupClick = (groupId: string) => {
    setActiveGroupId(groupId);
    navigate({ to: "/chat/$groupId", params: { groupId } });
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="h-full overflow-y-auto pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start justify-between gap-4"
          data-ocid="dashboard.welcome_section"
        >
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
              {getGreeting()}, {user?.name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {company?.name} ·{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {user?.role && (
            <span className={ROLE_BADGE[user.role]}>{user.role}</span>
          )}
        </motion.div>

        {/* KPI Cards — admin/owner only */}
        {isAdmin && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {isLoading
              ? SKELETON_KEYS_KPI.map((k) => (
                  <div
                    key={k}
                    className="bg-card rounded-xl border border-border p-4 space-y-3 animate-pulse"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1 mr-3">
                        <div className="h-2.5 bg-muted rounded w-2/3" />
                        <div className="h-7 bg-muted rounded w-1/2" />
                        <div className="h-2 bg-muted rounded w-3/4" />
                      </div>
                      <div className="w-8 h-8 bg-muted rounded-lg flex-shrink-0" />
                    </div>
                  </div>
                ))
              : adminStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.28 }}
                      className="bg-card rounded-xl border border-border p-4 shadow-xs hover:shadow-material transition-smooth"
                      data-ocid={`dashboard.kpi_card.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground truncate">
                            {stat.label}
                          </p>
                          <p className="font-display font-bold text-3xl text-foreground mt-1 leading-none">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {stat.sub}
                          </p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                          <Icon className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        )}

        {/* Employee: My Tasks */}
        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-card rounded-xl border border-border shadow-xs"
            data-ocid="dashboard.my_tasks_panel"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-foreground">
                My Tasks
              </h3>
              <span className="text-xs text-muted-foreground">
                {myPending.length} pending
              </span>
            </div>

            {isLoading ? (
              <div className="divide-y divide-border">
                {SKELETON_KEYS_TASK.map((k) => (
                  <div
                    key={k}
                    className="px-4 py-3 flex items-center gap-3 animate-pulse"
                  >
                    <div className="w-2 h-2 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-2 bg-muted rounded w-1/3" />
                    </div>
                    <div className="h-5 bg-muted rounded-full w-16" />
                  </div>
                ))}
              </div>
            ) : myPending.length === 0 ? (
              <div
                className="p-8 text-center"
                data-ocid="dashboard.empty_state"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <CheckSquare className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  All caught up!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No pending tasks assigned to you.
                </p>
                <button
                  type="button"
                  onClick={() => handleGroupClick("group-1")}
                  data-ocid="dashboard.empty_state_cta"
                  className="mt-4 text-xs font-medium text-foreground underline underline-offset-2 hover:opacity-70 transition-smooth"
                >
                  Browse channels →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {myPending.slice(0, 5).map((task, i) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={i}
                    onGroupClick={handleGroupClick}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Recent Activity + Quick Actions */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="bg-card rounded-xl border border-border shadow-xs"
            data-ocid="dashboard.activity_panel"
          >
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-sm text-foreground">
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-border">
              {isLoading
                ? SKELETON_KEYS_ACTIVITY.map((k) => (
                    <div
                      key={k}
                      className="px-4 py-3 flex items-start gap-3 animate-pulse"
                    >
                      <div className="w-7 h-7 bg-muted rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="h-3 bg-muted rounded w-4/5" />
                        <div className="h-2 bg-muted rounded w-1/4" />
                      </div>
                    </div>
                  ))
                : recentActivity.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.25 }}
                        className="px-4 py-3 flex items-start gap-3"
                        data-ocid={`dashboard.activity.${i + 1}`}
                      >
                        <div className="p-1.5 rounded-lg bg-muted flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground leading-snug">
                            {item.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-3"
          >
            <div className="bg-card rounded-xl border border-border shadow-xs">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-foreground">
                  Quick Actions
                </h3>
              </div>
              <div className="p-3 space-y-2">
                {isAdmin && (
                  <motion.button
                    type="button"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCreateGroupOpen(true)}
                    data-ocid="dashboard.create_group_button"
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-foreground text-background hover:opacity-90 transition-smooth text-left"
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        Create Group
                      </p>
                      <p className="text-xs opacity-70">Start a new channel</p>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-60 flex-shrink-0" />
                  </motion.button>
                )}

                <motion.button
                  type="button"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setJoinCompanyOpen(true)}
                  data-ocid="dashboard.join_company_button"
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-foreground/40 hover:bg-muted transition-smooth text-left"
                >
                  <LogIn className="w-4 h-4 text-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      Join via Code
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enter an invite code
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </motion.button>
              </div>
            </div>

            {/* Channel shortcuts */}
            <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Jump to Channel
                </p>
              </div>
              {mockGroups.slice(0, 4).map((g, i) => (
                <motion.button
                  key={g.id}
                  type="button"
                  whileHover={{ x: 2 }}
                  onClick={() => handleGroupClick(g.id)}
                  data-ocid={`dashboard.group_link.${i + 1}`}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted transition-smooth text-left last:rounded-b-xl"
                >
                  <Hash className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground truncate flex-1">
                    {g.name}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {g.memberCount}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal
        open={createGroupOpen}
        onClose={() => setCreateGroupOpen(false)}
      />
      <JoinCompanyModal
        open={joinCompanyOpen}
        onClose={() => setJoinCompanyOpen(false)}
      />
    </div>
  );
}
