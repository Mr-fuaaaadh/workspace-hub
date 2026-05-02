import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface JoinCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const VALID_CODES = ["ACME-2026", "SYNC-2026", "TEAM-01"];

export function JoinCompanyModal({ open, onClose }: JoinCompanyModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 10);
    setCode(val);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please enter an invite code.");
      return;
    }
    if (trimmed.length < 4) {
      setError("Code must be at least 4 characters.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    if (!VALID_CODES.includes(trimmed)) {
      setError("Invalid invite code. Please check and try again.");
      setIsSubmitting(false);
      return;
    }
    setSuccess(true);
    setIsSubmitting(false);
    toast.success("Successfully joined the company!");
    setTimeout(() => {
      setSuccess(false);
      setCode("");
      onClose();
    }, 1200);
  };

  const handleClose = () => {
    setCode("");
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
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
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            aria-modal="true"
            aria-labelledby="join-company-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
            onKeyDown={handleKeyDown}
          >
            <div
              className="bg-card rounded-2xl border border-border shadow-material-elevated w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              data-ocid="join_company.dialog"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2
                  id="join-company-title"
                  className="font-display font-bold text-base text-foreground"
                >
                  Join a Company
                </h2>
                <button
                  type="button"
                  aria-label="Close dialog"
                  data-ocid="join_company.close_button"
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-5 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter the invite code shared by your company administrator
                    to join the workspace.
                  </p>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="invite-code"
                      className="block text-sm font-medium text-foreground"
                    >
                      Invite Code
                    </label>
                    <input
                      ref={inputRef}
                      id="invite-code"
                      type="text"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="e.g. ACME-2026"
                      value={code}
                      onChange={handleChange}
                      data-ocid="join_company.input"
                      className={`w-full px-4 py-3 bg-transparent border rounded-xl text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground placeholder:tracking-normal outline-none transition-smooth text-center uppercase ${
                        error
                          ? "border-destructive focus:ring-2 focus:ring-destructive/30"
                          : "border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                      }`}
                    />

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          data-ocid="join_company.error_state"
                          className="text-xs text-destructive mt-1"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Success */}
                    <AnimatePresence>
                      {success && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          data-ocid="join_company.success_state"
                          className="text-xs text-foreground font-medium mt-1 flex items-center gap-1"
                        >
                          <span>✓</span> Joined successfully!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hint */}
                  <p className="text-xs text-muted-foreground">
                    Hint: Try{" "}
                    <button
                      type="button"
                      className="font-mono font-medium text-foreground cursor-pointer underline underline-offset-2 bg-transparent border-none p-0"
                      onClick={() => {
                        setCode("ACME-2026");
                        setError("");
                      }}
                    >
                      ACME-2026
                    </button>
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    data-ocid="join_company.cancel_button"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={!code.trim() || isSubmitting || success}
                    data-ocid="join_company.confirm_button"
                    className="flex items-center gap-2 px-5 py-2 bg-foreground text-background text-sm font-medium rounded-xl hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Joining...
                      </>
                    ) : success ? (
                      "Joined!"
                    ) : (
                      "Join Company"
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
