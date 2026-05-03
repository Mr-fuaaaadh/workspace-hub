import { TopBar } from "@/components/layout/TopBar";
import { AddTaskModal } from "@/components/modals/AddTaskModal";
import { TaskDetailModal } from "@/components/modals/TaskDetailModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getMessages, getTasks, sendMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import type { Task, TaskStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  BarChart2,
  CheckCheck,
  CheckSquare2,
  Clock,
  Loader2,
  MessageSquare,
  Plus,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

type MainTab = "chat" | "tasks" | "reports";
type TaskFilter = "all" | "pending" | "in_progress" | "completed";

// ─── Skeletons ──────────────────────────────────────────────────────────────
const MSG_SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5"];
const TASK_SKELETON_KEYS = ["t1", "t2", "t3"];

function MessageSkeleton() {
  return (
    <div className="flex items-start gap-3 px-4 py-2">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

function TaskSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-2.5">
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<TaskStatus, { label: string; cls: string }> = {
    pending: {
      label: "Pending",
      cls: "border-border text-muted-foreground",
    },
    in_progress: {
      label: "In Progress",
      cls: "border-foreground/50 text-foreground bg-muted/40",
    },
    completed: {
      label: "Completed",
      cls: "border-foreground/20 text-muted-foreground bg-muted/30",
    },
  };
  const { label, cls } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs border rounded-full px-2 py-0.5 font-medium",
        cls,
      )}
    >
      {status === "pending" && <Clock className="w-2.5 h-2.5" />}
      {status === "in_progress" && <Loader2 className="w-2.5 h-2.5" />}
      {status === "completed" && <CheckCheck className="w-2.5 h-2.5" />}
      {label}
    </span>
  );
}

// ─── Tab indicator ──────────────────────────────────────────────────────────
function TabBar({
  active,
  onChange,
}: {
  active: MainTab;
  onChange: (t: MainTab) => void;
}) {
  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "chat",
      label: "Chat",
      icon: <MessageSquare className="w-3.5 h-3.5" />,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: <CheckSquare2 className="w-3.5 h-3.5" />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart2 className="w-3.5 h-3.5" />,
    },
  ];
  return (
    <div
      className="flex border-b border-border bg-card flex-shrink-0"
      data-ocid="chat.tab_bar"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          data-ocid={`chat.tab.${tab.id}`}
          className={cn(
            "relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors duration-200",
            active === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.icon}
          {tab.label}
          {active === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-t-full"
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Chat tab ────────────────────────────────────────────────────────────────
function ChatTab({ groupId }: { groupId: string }) {
  const { user } = useAuthStore();
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", groupId],
    queryFn: () => getMessages(groupId),
    enabled: !!groupId,
    refetchInterval: 5000,
  });

  const sendMut = useMutation({
    mutationFn: (content: string) =>
      sendMessage(groupId, content, user?.id ?? "", user?.name ?? ""),
    onMutate: (content: string) => {
      // optimistic
      const optimistic = {
        id: `opt-${Date.now()}`,
        groupId,
        senderId: user?.id ?? "",
        senderName: user?.name ?? "",
        content,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      queryClient.setQueryData(
        ["messages", groupId],
        (old: typeof messages) => [...(old ?? []), optimistic],
      );
      return { optimistic };
    },
    onSuccess: (newMsg, _vars, ctx) => {
      queryClient.setQueryData(["messages", groupId], (old: typeof messages) =>
        (old ?? []).map((m) => (m.id === ctx?.optimistic.id ? newMsg : m)),
      );
      toast.success("Message sent");
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["messages", groupId], (old: typeof messages) =>
        (old ?? []).filter((m) => m.id !== ctx?.optimistic.id),
      );
      toast.error("Failed to send message");
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    const text = messageText.trim();
    if (!text) return;
    setMessageText("");
    sendMut.mutate(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1">
        <div className="p-4 pb-2 space-y-0.5">
          {isLoading ? (
            MSG_SKELETON_KEYS.map((k) => <MessageSkeleton key={k} />)
          ) : messages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="chat.messages_empty_state"
            >
              <MessageSquare className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">
                No messages yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Be the first to say something!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.senderId === user?.id;
              const showHeader =
                i === 0 || messages[i - 1].senderId !== msg.senderId;
              const initials = msg.senderName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");

              if (isMe) {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(i * 0.02, 0.25),
                    }}
                    className={cn(
                      "flex flex-col items-end",
                      showHeader ? "mt-4" : "mt-1",
                    )}
                    data-ocid={`chat.message.${i + 1}`}
                  >
                    {showHeader && (
                      <div className="flex items-baseline gap-2 mb-1 mr-1">
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          You
                        </span>
                      </div>
                    )}
                    <div className="max-w-[75%] bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-sm leading-relaxed break-words">
                        {msg.content}
                      </p>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(i * 0.02, 0.25),
                  }}
                  className={cn(
                    "flex items-start gap-3",
                    showHeader ? "mt-4" : "mt-1 pl-12",
                  )}
                  data-ocid={`chat.message.${i + 1}`}
                >
                  {showHeader && (
                    <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold text-background">
                      {initials}
                    </div>
                  )}
                  <div className={cn("flex-1 min-w-0", !showHeader && "ml-0")}>
                    {showHeader && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {msg.senderName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}
                    <div className="inline-block max-w-[75%] bg-muted/60 text-foreground rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-sm leading-relaxed break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2 bg-background rounded-2xl border border-border px-4 py-2.5 focus-within:border-foreground/40 transition-smooth shadow-sm">
          <button
            type="button"
            data-ocid="chat.attach_button"
            className="text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="Message the channel..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            data-ocid="chat.message_input"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={handleSend}
            disabled={!messageText.trim() || sendMut.isPending}
            data-ocid="chat.send_button"
            className="p-1.5 rounded-xl bg-foreground text-background disabled:opacity-30 transition-smooth flex-shrink-0 hover:opacity-80"
          >
            {sendMut.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Tasks tab ───────────────────────────────────────────────────────────────
function TasksTab({
  groupId,
  canManage,
}: {
  groupId: string;
  canManage: boolean;
}) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", groupId],
    queryFn: () => getTasks(groupId),
    enabled: !!groupId,
  });

  const filterTabs: { id: TaskFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  const filtered = tasks.filter((t) =>
    filter === "all" ? true : t.status === filter,
  );

  const handleTaskUpdate = (updated: Task) => {
    queryClient.setQueryData(["tasks", groupId], (old: Task[]) =>
      (old ?? []).map((t) => (t.id === updated.id ? updated : t)),
    );
    setSelectedTask(updated);
  };

  const handleTaskCreate = (task: Task) => {
    queryClient.setQueryData(["tasks", groupId], (old: Task[]) => [
      ...(old ?? []),
      task,
    ]);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Sub-filter row */}
      <div
        className="flex gap-1 px-4 py-2.5 border-b border-border bg-card flex-shrink-0 overflow-x-auto scrollbar-hide"
        data-ocid="chat.task_filter_row"
      >
        {filterTabs.map((ft) => (
          <button
            key={ft.id}
            type="button"
            onClick={() => setFilter(ft.id)}
            data-ocid={`chat.task_filter.${ft.id}`}
            className={cn(
              "flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth",
              filter === ft.id
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {ft.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading ? (
            TASK_SKELETON_KEYS.map((k) => <TaskSkeleton key={k} />)
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="chat.tasks_empty_state"
            >
              <CheckSquare2 className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">No tasks</p>
              <p className="text-xs text-muted-foreground mt-1">
                {filter === "all"
                  ? "Create a task to get started"
                  : `No ${filter.replace("_", " ")} tasks`}
              </p>
            </div>
          ) : (
            filtered.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                onClick={() => setSelectedTask(task)}
                data-ocid={`chat.task_card.${i + 1}`}
                className="bg-card rounded-2xl border border-border p-4 space-y-2.5 cursor-pointer transition-smooth"
              >
                <p
                  className={cn(
                    "text-sm font-semibold text-foreground leading-snug",
                    task.status === "completed" &&
                      "line-through text-muted-foreground",
                  )}
                >
                  {task.title}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-xs text-muted-foreground">
                    {task.assignedToName}
                  </p>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Due: {task.dueDate}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>

      {canManage && (
        <div className="p-4 border-t border-border bg-card flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-2xl text-sm gap-2"
            onClick={() => setShowAddModal(true)}
            data-ocid="chat.add_task_button"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      )}

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            groupId={groupId}
            canManage={canManage}
            onClose={() => setSelectedTask(null)}
            onUpdate={handleTaskUpdate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            groupId={groupId}
            onClose={() => setShowAddModal(false)}
            onCreate={handleTaskCreate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reports tab ─────────────────────────────────────────────────────────────
function ReportsTab({ groupId }: { groupId: string }) {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", groupId],
    queryFn: () => getTasks(groupId),
    enabled: !!groupId,
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const chartData = [
    { name: "Pending", count: pending },
    { name: "In Progress", count: inProgress },
    { name: "Completed", count: completed },
  ];

  // User breakdown
  const userMap: Record<string, { name: string; count: number }> = {};
  for (const task of tasks) {
    if (!userMap[task.assignedTo]) {
      userMap[task.assignedTo] = { name: task.assignedToName, count: 0 };
    }
    userMap[task.assignedTo].count++;
  }
  const userBreakdown = Object.values(userMap).sort(
    (a, b) => b.count - a.count,
  );

  if (isLoading) {
    return (
      <div
        className="flex-1 p-6 space-y-4"
        data-ocid="chat.reports.loading_state"
      >
        <div className="grid grid-cols-2 gap-3">
          {["r1", "r2", "r3", "r4"].map((k) => (
            <Skeleton key={k} className="h-20 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-5" data-ocid="chat.reports_panel">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { label: "Total", value: total, ocid: "chat.reports.total" },
              {
                label: "Completed",
                value: completed,
                ocid: "chat.reports.completed",
              },
              {
                label: "Pending",
                value: pending,
                ocid: "chat.reports.pending",
              },
              {
                label: "In Progress",
                value: inProgress,
                ocid: "chat.reports.in_progress",
              },
            ] as { label: string; value: number; ocid: string }[]
          ).map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid={stat.ocid}
              className="bg-card rounded-2xl border border-border p-4 text-center"
            >
              <p className="text-3xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="bg-card rounded-2xl border border-border p-5 space-y-3"
          data-ocid="chat.reports.progress_bar"
        >
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-foreground">Completion</p>
            <p className="text-2xl font-display font-bold text-foreground">
              {completionPct}%
            </p>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-foreground rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {completed} of {total} tasks completed
          </p>
        </div>

        {/* Bar chart */}
        <div
          className="bg-card rounded-2xl border border-border p-5"
          data-ocid="chat.reports.chart"
        >
          <p className="text-sm font-semibold text-foreground mb-4">
            Tasks by Status
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 4, left: -20, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  fontSize: 12,
                }}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar
                dataKey="count"
                fill="currentColor"
                className="text-foreground"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User breakdown */}
        {userBreakdown.length > 0 && (
          <div
            className="bg-card rounded-2xl border border-border p-5 space-y-3"
            data-ocid="chat.reports.user_breakdown"
          >
            <p className="text-sm font-semibold text-foreground">By Assignee</p>
            {userBreakdown.map((u, i) => (
              <div key={u.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-xs font-bold text-background flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-foreground truncate">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {u.count} task{u.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: total > 0 ? `${(u.count / total) * 100}%` : "0%",
                      }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="h-full bg-foreground rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

// ─── ChatPage ─────────────────────────────────────────────────────────────────
export function ChatPage() {
  const params = useParams({ strict: false }) as { groupId?: string };
  const groupId = params.groupId ?? "group-1";
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<MainTab>("chat");

  const canManage =
    user?.role === "owner" ||
    user?.role === "admin" ||
    user?.role === "manager";

  return (
    <div className="flex flex-col h-full bg-background" data-ocid="chat.page">
      <TopBar />

      <TabBar active={activeTab} onChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col flex-1 min-h-0"
        >
          {activeTab === "chat" && <ChatTab groupId={groupId} />}
          {activeTab === "tasks" && (
            <TasksTab groupId={groupId} canManage={canManage} />
          )}
          {activeTab === "reports" && <ReportsTab groupId={groupId} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
