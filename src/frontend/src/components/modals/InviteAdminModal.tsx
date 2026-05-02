import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth.store";
import { Copy, Link } from "lucide-react";
import { toast } from "sonner";

interface InviteAdminModalProps {
  open: boolean;
  onClose: () => void;
}

export function InviteAdminModal({ open, onClose }: InviteAdminModalProps) {
  const { company } = useAuthStore();

  const inviteLink = `${window.location.origin}/join?code=${company?.joinCode ?? "ACME-2026"}&role=admin`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied!");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="rounded-2xl max-w-md p-6 gap-0"
        data-ocid="profile.invite_admin_modal"
      >
        <DialogHeader className="mb-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
              <Link className="w-4 h-4 text-background" />
            </div>
            <DialogTitle className="text-lg font-bold font-display">
              Invite Admin
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Share this link with someone you want to grant admin access. They
            must already have an account.
          </DialogDescription>
        </DialogHeader>

        {/* Invite link display */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Invite Link
          </p>
          <div className="flex items-center gap-2">
            <code
              className="flex-1 min-w-0 rounded-xl border border-border bg-muted px-3 py-2.5 font-mono text-xs text-foreground truncate"
              data-ocid="profile.invite_link_display"
              title={inviteLink}
            >
              {inviteLink}
            </code>
            <Button
              type="button"
              size="sm"
              className="shrink-0 rounded-xl gap-1.5"
              onClick={handleCopy}
              data-ocid="profile.copy_invite_button"
              aria-label="Copy invite link"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            This link grants <strong className="text-foreground">Admin</strong>{" "}
            role. Use with caution.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={onClose}
            data-ocid="profile.invite_admin_close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
