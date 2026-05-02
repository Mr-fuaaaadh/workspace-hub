import { mockGroups } from "@/lib/mock-data";
import type { Group } from "@/types";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (group: Group) => void;
}

export function CreateGroupModal({
  open,
  onClose,
  onCreated,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: name.trim().toLowerCase().replace(/\s+/g, "-"),
      companyId: "comp-1",
      memberCount: 1,
      description: description.trim() || undefined,
      parentId: parentId || undefined,
    };
    setIsSubmitting(false);
    toast.success(`Group #${newGroup.name} created`);
    onCreated?.(newGroup);
    setName("");
    setDescription("");
    setParentId("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            aria-modal="true"
            aria-labelledby="create-group-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
            onKeyDown={handleKeyDown}
          >
            <div
              className="bg-card rounded-2xl border border-border shadow-material-elevated w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              data-ocid="create_group.dialog"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2
                  id="create-group-title"
                  className="font-display font-bold text-base text-foreground"
                >
                  Create a Group
                </h2>
                <button
                  type="button"
                  aria-label="Close dialog"
                  data-ocid="create_group.close_button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-5 space-y-4">
                  {/* Group Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="group-name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Group Name
                      <span className="text-destructive ml-0.5">*</span>
                    </label>
                    <div className="flex items-center border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-smooth">
                      <span className="pl-3 text-muted-foreground font-medium select-none">
                        #
                      </span>
                      <input
                        ref={nameRef}
                        id="group-name"
                        type="text"
                        placeholder="e.g. design-team"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-\s]/g, ""),
                          )
                        }
                        data-ocid="create_group.input"
                        className="flex-1 px-2 py-2.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                        required
                        maxLength={50}
                      />
                    </div>
                    {name && (
                      <p className="text-xs text-muted-foreground">
                        Channel will be{" "}
                        <span className="font-medium text-foreground">
                          #{name.replace(/\s+/g, "-")}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="group-description"
                      className="block text-sm font-medium text-foreground"
                    >
                      Description
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="group-description"
                      placeholder="What's this group about?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      data-ocid="create_group.textarea"
                      rows={2}
                      maxLength={200}
                      className="w-full px-3 py-2.5 bg-transparent border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                    />
                  </div>

                  {/* Parent Group */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="group-parent"
                      className="block text-sm font-medium text-foreground"
                    >
                      Parent Group
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        (optional)
                      </span>
                    </label>
                    <select
                      id="group-parent"
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                      data-ocid="create_group.select"
                      className="w-full px-3 py-2.5 bg-card border border-input rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth appearance-none cursor-pointer"
                    >
                      <option value="">None (top-level group)</option>
                      {mockGroups.map((g) => (
                        <option key={g.id} value={g.id}>
                          #{g.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    data-ocid="create_group.cancel_button"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={!name.trim() || isSubmitting}
                    data-ocid="create_group.submit_button"
                    className="flex items-center gap-2 px-5 py-2 bg-foreground text-background text-sm font-medium rounded-xl hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Group"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
