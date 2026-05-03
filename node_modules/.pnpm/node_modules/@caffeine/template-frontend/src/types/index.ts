export type UserRole = "owner" | "admin" | "manager" | "employee";

export type TaskStatus = "pending" | "in_progress" | "completed";

export type ActiveTab = "all" | "pending" | "completed";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  joinCode: string;
  ownerId: string;
  memberCount: number;
}

export interface Group {
  id: string;
  name: string;
  companyId: string;
  parentId?: string;
  children?: Group[];
  memberCount: number;
  managerId?: string;
  description?: string;
  avatar?: string;
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

export interface Task {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  assignedTo: string;
  assignedToName: string;
  status: TaskStatus;
  dueDate: string;
  createdBy: string;
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface UIState {
  activeGroupId: string | null;
  activeTab: ActiveTab;
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
}
