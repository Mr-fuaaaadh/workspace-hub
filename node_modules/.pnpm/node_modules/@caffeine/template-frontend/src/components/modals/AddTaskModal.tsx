import { createTask } from "@/lib/api";
import { mockUsers } from "@/lib/mock-data";
import { useAuthStore } from "@/stores/auth.store";
import type { Task } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface AddTaskModalProps {
  groupId: string;
  onClose: () => void;
  onCreate: (task: Task) => void;
}

export function AddTaskModal({
  groupId,
  onClose,
  onCreate,
}: AddTaskModalProps) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(mockUsers[0].id);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"pending" | "in_progress">("pending");

  const createMut = useMutation({
    mutationFn: () => {
      const assignee = mockUsers.find((u) => u.id === assignedTo);
      return createTask(
        groupId,
        title,
        assignedTo,
        assignee?.name ?? "",
        dueDate || "TBD",
        user?.id ?? "",
      );
    },
    onSuccess: (task) => {
      onCreate({ ...task, status, description });
      toast.success("Task created");
      onClose();
    },
    onError: () => toast.error("Failed to create task"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createMut.mutate();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
        data-ocid="add_task.backdrop"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        data-ocid="add_task.dialog"
      >
        <div
          className="w-full max-w-md bg-card rounded-3xl border border-border shadow-material-elevated overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              New Task
            </h2>
            <button
              type="button"
              onClick={onClose}
              data-ocid="add_task.close_button"
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label
                  htmlFor="task-title"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Task Title *
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  required
                  data-ocid="add_task.title_input"
                  className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label
                  htmlFor="task-desc"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Description
                </label>
                <textarea
                  id="task-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description..."
                  rows={2}
                  data-ocid="add_task.description_textarea"
                  className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 resize-none transition-smooth placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Assignee */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="task-assignee"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Assign To
                  </label>
                  <select
                    id="task-assignee"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    data-ocid="add_task.assignee_select"
                    className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth"
                  >
                    {mockUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Due date */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="task-due"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Due Date
                  </label>
                  <input
                    id="task-due"
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. May 15"
                    data-ocid="add_task.due_date_input"
                    className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Initial Status
                </span>
                <div className="flex gap-2">
                  {(["pending", "in_progress"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      data-ocid={`add_task.status.${s}`}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth ${
                        status === s
                          ? "bg-foreground text-background border-foreground"
                          : "text-muted-foreground border-border hover:border-foreground/40"
                      }`}
                    >
                      {s === "pending" ? "Pending" : "In Progress"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                data-ocid="add_task.cancel_button"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMut.isPending || !title.trim()}
                data-ocid="add_task.submit_button"
                className="px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 disabled:opacity-40 transition-smooth"
              >
                {createMut.isPending ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
