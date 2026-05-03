import { updateTaskStatus } from "@/lib/api";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Calendar, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface TaskDetailModalProps {
  task: Task;
  groupId: string;
  canManage: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export function TaskDetailModal({
  task,
  groupId,
  canManage,
  onClose,
  onUpdate,
}: TaskDetailModalProps) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [description, setDescription] = useState(task.description ?? "");

  const saveMut = useMutation({
    mutationFn: () => updateTaskStatus(groupId, task.id, status),
    onSuccess: (updated) => {
      const assignee = mockUsers.find((u) => u.id === assignedTo);
      onUpdate({
        ...updated,
        title,
        assignedTo,
        assignedToName: assignee?.name ?? updated.assignedToName,
        dueDate,
        description,
      });
      toast.success("Task updated");
      onClose();
    },
    onError: () => toast.error("Failed to update task"),
  });

  const isDirty =
    title !== task.title ||
    status !== task.status ||
    assignedTo !== task.assignedTo ||
    dueDate !== task.dueDate ||
    description !== (task.description ?? "");

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
        data-ocid="task_detail.backdrop"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        data-ocid="task_detail.dialog"
      >
        <div
          className="w-full max-w-md bg-card rounded-3xl border border-border shadow-material-elevated overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-border">
            <div className="flex-1 min-w-0">
              {canManage ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  data-ocid="task_detail.title_input"
                  className="w-full text-base font-semibold text-foreground bg-transparent outline-none border-b border-transparent focus:border-border pb-0.5 transition-smooth"
                />
              ) : (
                <p className="text-base font-semibold text-foreground">
                  {title}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Created by{" "}
                {mockUsers.find((u) => u.id === task.createdBy)?.name ??
                  "Unknown"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-ocid="task_detail.close_button"
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="task-detail-description"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Description
              </label>
              {canManage ? (
                <textarea
                  id="task-detail-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                  data-ocid="task_detail.description_textarea"
                  className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 resize-none transition-smooth placeholder:text-muted-foreground"
                />
              ) : (
                <p className="text-sm text-foreground">
                  {description || (
                    <span className="text-muted-foreground">
                      No description
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </p>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => canManage && setStatus(opt.value)}
                    data-ocid={`task_detail.status.${opt.value}`}
                    className={cn(
                      "text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth",
                      status === opt.value
                        ? "bg-foreground text-background border-foreground"
                        : "text-muted-foreground border-border hover:border-foreground/40",
                      !canManage && "cursor-default",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Assignee + Due date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="task-detail-assignee"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1"
                >
                  <User className="w-3 h-3" /> Assignee
                </label>
                {canManage ? (
                  <select
                    id="task-detail-assignee"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    data-ocid="task_detail.assignee_select"
                    className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth"
                  >
                    {mockUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-foreground">
                    {task.assignedToName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="task-detail-due-date"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" /> Due Date
                </label>
                {canManage ? (
                  <input
                    id="task-detail-due-date"
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. May 15"
                    data-ocid="task_detail.due_date_input"
                    className="w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                  />
                ) : (
                  <p className="text-sm text-foreground">{task.dueDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              data-ocid="task_detail.cancel_button"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
            {canManage && isDirty && (
              <button
                type="button"
                onClick={() => saveMut.mutate()}
                disabled={saveMut.isPending || !title.trim()}
                data-ocid="task_detail.save_button"
                className="px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 disabled:opacity-40 transition-smooth"
              >
                {saveMut.isPending ? "Saving..." : "Save changes"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
