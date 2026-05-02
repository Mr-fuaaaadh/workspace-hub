import { AppLayout } from "@/components/layout/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const OtpPage = lazy(() =>
  import("@/pages/OtpPage").then((m) => ({ default: m.OtpPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("@/pages/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ForgotOtpPage = lazy(() =>
  import("@/pages/ForgotOtpPage").then((m) => ({ default: m.ForgotOtpPage })),
);
const ResetPasswordPage = lazy(() =>
  import("@/pages/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ChatPage = lazy(() =>
  import("@/pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const GroupListPage = lazy(() =>
  import("@/pages/GroupListPage").then((m) => ({ default: m.GroupListPage })),
);
const TasksPage = lazy(() =>
  import("@/pages/TasksPage").then((m) => ({ default: m.TasksPage })),
);

const PageLoader = () => (
  <div className="flex-1 p-6 space-y-4">
    <Skeleton className="h-10 w-48" />
    <Skeleton className="h-64 w-full" />
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: Outlet,
});

// Auth routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginPage />
    </Suspense>
  ),
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) throw redirect({ to: "/dashboard" });
  },
});

const otpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/otp",
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <OtpPage />
    </Suspense>
  ),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ForgotPasswordPage />
    </Suspense>
  ),
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) throw redirect({ to: "/dashboard" });
  },
});

const forgotOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-otp",
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ForgotOtpPage />
    </Suspense>
  ),
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) throw redirect({ to: "/dashboard" });
  },
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ResetPasswordPage />
    </Suspense>
  ),
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) throw redirect({ to: "/dashboard" });
  },
});

// Protected layout route
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppLayout,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/" });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const chatRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/chat/$groupId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChatPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const groupsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/groups",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GroupListPage />
    </Suspense>
  ),
});
const tasksRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/tasks",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TasksPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  otpRoute,
  forgotPasswordRoute,
  forgotOtpRoute,
  resetPasswordRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    chatRoute,
    profileRoute,
    groupsRoute,
    tasksRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
