import { InviteAdminModal } from "@/components/modals/InviteAdminModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { Building2, Copy, LogOut, Pencil, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  employee: "Employee",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: i * 0.09,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};
export function ProfilePage() {
  const { user, company, logout } = useAuthStore();
  const navigate = useNavigate();
  const [inviteOpen, setInviteOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const isOwnerOrAdmin = user?.role === "owner" || user?.role === "admin";

  const handleCopyCode = async () => {
    if (!company?.joinCode) return;
    await navigator.clipboard.writeText(company.joinCode);
    toast.success("Invite code copied!");
  };

  const handleEditProfile = () => {
    toast.success("Profile updated");
  };

  const handleSignOut = () => {
    toast("Signed out successfully");
    logout();
    void navigate({ to: "/" });
  };

  if (!user || !company) return null;

  return (
    <div
      className="h-full overflow-y-auto bg-background pb-20 md:pb-6"
      data-ocid="profile.page"
    >
      <div className="mx-auto w-full max-w-lg px-4 py-8 space-y-5">
        {/* Section 1 — User Info */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Card className="shadow-material rounded-2xl border border-border overflow-hidden">
            <CardContent className="flex flex-col items-center gap-4 py-8 px-6 text-center">
              {/* Avatar */}
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-background text-2xl font-bold select-none shadow-material"
                data-ocid="profile.avatar"
                aria-label={`Avatar for ${user.name}`}
              >
                {initials}
              </div>

              {/* Name */}
              <div className="space-y-1">
                <h1
                  className="text-2xl font-bold tracking-tight text-foreground font-display"
                  data-ocid="profile.name"
                >
                  {user.name}
                </h1>
                <p
                  className="text-sm text-muted-foreground"
                  data-ocid="profile.email"
                >
                  {user.email}
                </p>
              </div>

              {/* Role badge */}
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1 text-xs font-semibold border-foreground/40 text-foreground uppercase tracking-wider"
                data-ocid="profile.role_badge"
              >
                {ROLE_LABELS[user.role] ?? user.role}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 2 — Company Details */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Card
            className="shadow-material rounded-2xl border border-border"
            data-ocid="profile.company_card"
          >
            <CardContent className="py-6 px-6 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Company
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Name</p>
                  <p
                    className="font-semibold text-foreground"
                    data-ocid="profile.company_name"
                  >
                    {company.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Join Code
                  </p>
                  <div className="flex items-center gap-2">
                    <code
                      className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm tracking-widest text-foreground"
                      data-ocid="profile.join_code"
                    >
                      {company.joinCode}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-xl"
                      onClick={handleCopyCode}
                      data-ocid="profile.copy_code_button"
                      aria-label="Copy join code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {company.memberCount}
                    </span>{" "}
                    members
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 3 — Account Actions */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Card
            className="shadow-material rounded-2xl border border-border"
            data-ocid="profile.actions_card"
          >
            <CardContent className="py-6 px-6 space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl justify-start gap-2 font-medium transition-smooth"
                onClick={handleEditProfile}
                data-ocid="profile.edit_button"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </Button>

              <Separator />

              <Button
                type="button"
                variant="destructive"
                className="w-full rounded-xl justify-start gap-2 font-medium transition-smooth"
                onClick={handleSignOut}
                data-ocid="profile.signout_button"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 4 — Company Management (Owner/Admin only) */}
        {isOwnerOrAdmin && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <Card
              className="shadow-material rounded-2xl border border-border"
              data-ocid="profile.management_card"
            >
              <CardContent className="py-6 px-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Company Management
                  </span>
                </div>

                {/* Manage Members placeholder */}
                <div
                  className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 opacity-70"
                  data-ocid="profile.manage_members_card"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Manage Members
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs rounded-full">
                    Soon
                  </Badge>
                </div>

                {/* Invite Admin button */}
                <Button
                  type="button"
                  variant="default"
                  className="w-full rounded-xl gap-2 font-medium transition-smooth"
                  onClick={() => setInviteOpen(true)}
                  data-ocid="profile.invite_admin_button"
                >
                  Invite Admin
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-xs text-center text-muted-foreground pb-2"
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-smooth"
          >
            caffeine.ai
          </a>
        </motion.p>
      </div>

      <InviteAdminModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </div>
  );
}
