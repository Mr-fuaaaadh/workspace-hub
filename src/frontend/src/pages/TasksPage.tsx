import { AddTaskModal } from "@/components/modals/AddTaskModal";
import { TaskDetailModal } from "@/components/modals/TaskDetailModal";
import { mockGroups, mockTasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";
import {
  CalendarDays,
  CheckSquare,
  ClipboardList,
  Eye,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5"];

// Flatten all tasks and enrich with group name
const allTasksRaw: (Task & { groupName: string })[] = Object.entries(
  mockTasks,
).flatMap(([groupId, tasks]) => {
  const group = mockGroups.find((g) => g.id === groupId);
  const groupName = group?.name ?? groupId;
  return tasks.map((t) => ({ ...t, groupName }));
});

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

type FilterStatus = "all" | TaskStatus;

const FILTER_CHIPS: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-none whitespace-nowrap",
        status === "pending"
          ? "border border-border text-muted-foreground"
          : status === "in_progress"
            ? "bg-foreground text-background"
            : "border border-border text-muted-foreground line-through",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-border">
      <td className="px-4 py-3">
        <div className="h-3 bg-muted rounded w-4" />
      </td>
      <td className="px-4 py-3">
        <div className="h-3 bg-muted rounded w-48" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 bg-muted rounded-full w-20" />
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <div className="h-3 bg-muted rounded w-28" />
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <div className="h-3 bg-muted rounded w-24" />
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="h-3 bg-muted rounded w-16" />
      </td>
      <td className="px-4 py-3">
        <div className="h-6 bg-muted rounded-lg w-12" />
      </td>
    </tr>
  );
}

function EmptyTableState({
  query,
  filter,
}: { query: string; filter: FilterStatus }) {
  const message =
    query || filter !== "all" ? "No tasks match your filters" : "No tasks yet";
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-ocid="tasks.empty_state"
    >
      <td colSpan={7}>
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <ClipboardList className="w-10 h-10 text-muted-foreground opacity-30" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </td>
    </motion.tr>
  );
}

interface TaskRowProps {
  task: Task & { groupName: string };
  index: number;
  onView: (task: Task & { groupName: string }) => void;
}

function TaskRow({ task, index, onView }: TaskRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.03 }}
      data-ocid={`tasks.item.${index + 1}`}
      onClick={() => onView(task)}
      className={cn(
        "border-b border-border cursor-pointer group transition-colors duration-150",
        index % 2 === 0 ? "bg-background" : "bg-muted/20",
        "hover:bg-muted/40",
      )}
    >
      {/* # */}
      <td className="px-4 py-3 text-xs text-muted-foreground font-mono w-10">
        {index + 1}
      </td>
      {/* Title */}
      <td className="px-4 py-3 max-w-[200px] sm:max-w-xs">
        <span
          className={cn(
            "text-sm font-medium leading-snug block truncate",
            task.status === "completed"
              ? "line-through text-muted-foreground"
              : "text-foreground",
          )}
        >
          {task.title}
        </span>
      </td>
      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        <StatusBadge status={task.status} />
      </td>
      {/* Group */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-xs text-muted-foreground font-mono truncate block max-w-[120px]">
          #{task.groupName}
        </span>
      </td>
      {/* Assignee */}
      <td className="px-4 py-3 hidden md:table-cell">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate max-w-[100px]">
            {task.assignedToName}
          </span>
        </div>
      </td>
      {/* Due Date */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground">{task.dueDate}</span>
        </div>
      </td>
      {/* Actions */}
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onView(task);
          }}
          data-ocid={`tasks.view_button.${index + 1}`}
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-smooth opacity-0 group-hover:opacity-100"
        >
          <Eye className="w-3 h-3" />
          <span className="hidden sm:inline">View</span>
        </button>
      </td>
    </motion.tr>
  );
}

// Mobile card for small screens
function MobileTaskCard({
  task,
  index,
  onView,
}: {
  task: Task & { groupName: string };
  index: number;
  onView: (task: Task & { groupName: string }) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.03 }}
      data-ocid={`tasks.item.${index + 1}`}
      onClick={() => onView(task)}
      className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card active:bg-muted transition-smooth cursor-pointer"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <p
          className={cn(
            "text-sm font-medium leading-snug truncate",
            task.status === "completed"
              ? "line-through text-muted-foreground"
              : "text-foreground",
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">#{task.groupName}</span>
          <span>·</span>
          <CalendarDays className="w-3 h-3" />
          <span>{task.dueDate}</span>
        </div>
      </div>
      <StatusBadge status={task.status} />
    </motion.div>
  );
}

export function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [tasks, setTasks] =
    useState<(Task & { groupName: string })[]>(allTasksRaw);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<
    (Task & { groupName: string }) | null
  >(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 220);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tasks.filter((t) => {
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignedToName.toLowerCase().includes(q) ||
        t.groupName.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || t.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const handleCreate = (task: Task) => {
    const group = mockGroups.find((g) => g.id === task.groupId);
    const groupName = group?.name ?? task.groupId;
    setTasks((prev) => [{ ...task, groupName }, ...prev]);
  };

  const handleUpdate = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)),
    );
    setSelectedTask(null);
  };

  const defaultGroupId = mockGroups[0]?.id ?? "group-1";

  return (
    <div
      className="flex-1 flex flex-col min-h-0 bg-background"
      data-ocid="tasks.page"
    >
      {/* Page Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-foreground" />
            <h1 className="font-display font-bold text-base text-foreground">
              Tasks
            </h1>
            <span
              className="text-[11px] font-medium bg-muted text-muted-foreground rounded-full px-2 py-0.5 leading-none"
              data-ocid="tasks.count_badge"
            >
              {filteredTasks.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            data-ocid="tasks.create_button"
            className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 active:scale-95 transition-smooth shadow-material"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-card border-b border-border px-4 py-2.5 flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by title, assignee, or group..."
            data-ocid="tasks.search_input"
            className="w-full text-sm text-foreground bg-muted/40 rounded-xl pl-9 pr-8 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                type="button"
                onClick={() => {
                  setSearch("");
                  searchRef.current?.focus();
                }}
                data-ocid="tasks.search_clear_button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-foreground transition-smooth"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Status filter chips */}
        <div className="flex gap-1.5 flex-shrink-0 flex-wrap">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              data-ocid={`tasks.filter.${chip.id}`}
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth",
                filter === chip.id
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table — desktop */}
      <div className="flex-1 overflow-y-auto hidden sm:block">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
            <tr>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-10">
                #
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Title
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                Group
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                Assignee
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                Due Date
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              SKELETON_KEYS.map((k) => <SkeletonRow key={k} />)
            ) : filteredTasks.length === 0 ? (
              <EmptyTableState query={search} filter={filter} />
            ) : (
              <AnimatePresence mode="wait">
                {filteredTasks.map((task, i) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    index={i}
                    onView={setSelectedTask}
                  />
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* Card list — mobile */}
      <div className="flex-1 overflow-y-auto sm:hidden p-3 space-y-2">
        {loading ? (
          SKELETON_KEYS.map((k) => (
            <div
              key={k}
              className="rounded-xl border border-border bg-card p-3.5 space-y-2 animate-pulse"
            >
              <div className="h-3.5 bg-muted rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            </div>
          ))
        ) : filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="tasks.empty_state"
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <ClipboardList className="w-10 h-10 text-muted-foreground opacity-30" />
            <p className="text-sm text-muted-foreground">
              {search || filter !== "all"
                ? "No tasks match your filters"
                : "No tasks yet"}
            </p>
          </motion.div>
        ) : (
          filteredTasks.map((task, i) => (
            <MobileTaskCard
              key={task.id}
              task={task}
              index={i}
              onView={setSelectedTask}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            groupId={defaultGroupId}
            onClose={() => setShowAddModal(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            groupId={selectedTask.groupId}
            canManage
            onClose={() => setSelectedTask(null)}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
