import {
  mockCompany,
  mockCurrentUser,
  mockGroups,
  mockMessages,
  mockTasks,
} from "@/lib/mock-data";
import type { Group, Message, Task, User } from "@/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export async function getUser(): Promise<User> {
  await delay(rand(150, 300));
  return mockCurrentUser;
}

export async function getGroups(): Promise<Group[]> {
  await delay(rand(150, 300));
  return mockGroups;
}

export async function getMessages(groupId: string): Promise<Message[]> {
  await delay(rand(150, 300));
  return mockMessages[groupId] ?? [];
}

export async function getTasks(groupId: string): Promise<Task[]> {
  await delay(rand(150, 300));
  return mockTasks[groupId] ?? [];
}

export async function sendMessage(
  groupId: string,
  content: string,
  senderId: string,
  senderName: string,
): Promise<Message> {
  await delay(rand(150, 300));
  const msg: Message = {
    id: `m-${Date.now()}`,
    groupId,
    senderId,
    senderName,
    content,
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
  if (!mockMessages[groupId]) mockMessages[groupId] = [];
  mockMessages[groupId].push(msg);
  return msg;
}

export async function createTask(
  groupId: string,
  title: string,
  assignedTo: string,
  assignedToName: string,
  dueDate: string,
  createdBy: string,
): Promise<Task> {
  await delay(rand(150, 300));
  const task: Task = {
    id: `task-${Date.now()}`,
    groupId,
    title,
    assignedTo,
    assignedToName,
    status: "pending",
    dueDate,
    createdBy,
  };
  if (!mockTasks[groupId]) mockTasks[groupId] = [];
  mockTasks[groupId].push(task);
  return task;
}

export async function updateTaskStatus(
  groupId: string,
  taskId: string,
  status: Task["status"],
): Promise<Task> {
  await delay(rand(150, 300));
  const tasks = mockTasks[groupId] ?? [];
  const task = tasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found");
  task.status = status;
  return task;
}

export async function getCompany() {
  await delay(rand(150, 300));
  return mockCompany;
}
