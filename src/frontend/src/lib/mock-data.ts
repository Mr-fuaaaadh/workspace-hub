import type { Company, Group, Message, Task, User } from "@/types";

export const mockCompany: Company = {
  id: "comp-1",
  name: "Acme Corp",
  joinCode: "ACME-2026",
  ownerId: "user-1",
  memberCount: 24,
};

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Fuhad",
    email: "fuhad@acme.com",
    role: "owner",
    companyId: "comp-1",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Fuhad",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "admin",
    companyId: "comp-1",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "user-3",
    name: "David Lee",
    email: "david@acme.com",
    role: "manager",
    companyId: "comp-1",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David",
  },
  {
    id: "user-4",
    name: "Emily Wong",
    email: "emily@acme.com",
    role: "employee",
    companyId: "comp-1",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily",
  },
];

export const mockCurrentUser: User = mockUsers[0];

export const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "general",
    companyId: "comp-1",
    memberCount: 24,
    description: "Company-wide announcements and general chat",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=general&backgroundColor=ffffff",
  },
  {
    id: "group-2",
    name: "marketing-team",
    companyId: "comp-1",
    memberCount: 8,
    managerId: "user-3",
    description: "Marketing campaigns and strategy",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=marketing-team&backgroundColor=ffffff",
    children: [
      {
        id: "group-2a",
        name: "content-creators",
        companyId: "comp-1",
        parentId: "group-2",
        memberCount: 4,
        description: "Content writing and production",
        avatar:
          "https://api.dicebear.com/7.x/shapes/svg?seed=content-creators&backgroundColor=ffffff",
      },
      {
        id: "group-2b",
        name: "social-media",
        companyId: "comp-1",
        parentId: "group-2",
        memberCount: 3,
        description: "Social media management",
        avatar:
          "https://api.dicebear.com/7.x/shapes/svg?seed=social-media&backgroundColor=ffffff",
      },
    ],
  },
  {
    id: "group-3",
    name: "product-updates",
    companyId: "comp-1",
    memberCount: 12,
    managerId: "user-2",
    description: "Product roadmap and feature releases",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=product-updates&backgroundColor=ffffff",
  },
  {
    id: "group-4",
    name: "announcements",
    companyId: "comp-1",
    memberCount: 24,
    description: "Official company announcements",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=announcements&backgroundColor=ffffff",
  },
  {
    id: "group-5",
    name: "engineering",
    companyId: "comp-1",
    memberCount: 10,
    managerId: "user-3",
    description: "Engineering and development discussions",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=engineering&backgroundColor=ffffff",
    children: [
      {
        id: "group-5a",
        name: "frontend",
        companyId: "comp-1",
        parentId: "group-5",
        memberCount: 5,
        description: "Frontend development",
        avatar:
          "https://api.dicebear.com/7.x/shapes/svg?seed=frontend&backgroundColor=ffffff",
      },
    ],
  },
];

const now = new Date();
const fmt = (offsetMin: number) => {
  const d = new Date(now.getTime() - offsetMin * 60000);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

export const mockMessages: Record<string, Message[]> = {
  "group-1": [
    {
      id: "m1",
      groupId: "group-1",
      senderId: "user-1",
      senderName: "Fuhad",
      content: "Good morning everyone! Hope you all had a great weekend.",
      timestamp: fmt(90),
    },
    {
      id: "m2",
      groupId: "group-1",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content: "Morning Alex! Ready to tackle the week ahead.",
      timestamp: fmt(85),
    },
    {
      id: "m3",
      groupId: "group-1",
      senderId: "user-3",
      senderName: "David Lee",
      content:
        "Q2 planning session is scheduled for Thursday at 2pm. Please come prepared with your team updates.",
      timestamp: fmt(80),
    },
    {
      id: "m4",
      groupId: "group-1",
      senderId: "user-4",
      senderName: "Emily Wong",
      content:
        "Thanks for the heads up David! I'll have the analytics report ready by then.",
      timestamp: fmt(75),
    },
    {
      id: "m5",
      groupId: "group-1",
      senderId: "user-1",
      senderName: "Fuhad",
      content:
        "Reminder: All expense reports for last month are due by EOD Friday.",
      timestamp: fmt(60),
    },
    {
      id: "m6",
      groupId: "group-1",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content:
        "The new onboarding docs are live! Check the company wiki for the updated guidelines.",
      timestamp: fmt(45),
    },
    {
      id: "m7",
      groupId: "group-1",
      senderId: "user-3",
      senderName: "David Lee",
      content:
        "@team - sprint retrospective summary has been sent to your emails.",
      timestamp: fmt(30),
    },
    {
      id: "m8",
      groupId: "group-1",
      senderId: "user-4",
      senderName: "Emily Wong",
      content: "Quick question - is the office open on the upcoming holiday?",
      timestamp: fmt(20),
    },
    {
      id: "m9",
      groupId: "group-1",
      senderId: "user-1",
      senderName: "Fuhad",
      content:
        "Yes, we'll be open but attendance is optional. Let your managers know your plans.",
      timestamp: fmt(15),
    },
    {
      id: "m10",
      groupId: "group-1",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content: "Thanks for clarifying! Have a great rest of the day everyone.",
      timestamp: fmt(5),
    },
  ],
  "group-2": [
    {
      id: "m11",
      groupId: "group-2",
      senderId: "user-1",
      senderName: "Alex Rivera",
      content:
        "Hey team, just shared the updated Q3 deck. Let me know your thoughts!",
      timestamp: fmt(88),
    },
    {
      id: "m12",
      groupId: "group-2",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content:
        "Looks great Alex! The campaign metrics section is really clear.",
      timestamp: fmt(82),
    },
    {
      id: "m13",
      groupId: "group-2",
      senderId: "user-1",
      senderName: "Alex Rivera",
      content:
        "Thanks Sarah! Don't forget to submit your content calendar by end of week.",
      timestamp: fmt(77),
    },
    {
      id: "m14",
      groupId: "group-2",
      senderId: "user-4",
      senderName: "Emily Wong",
      content:
        "The new brand guidelines are looking sharp. Can we schedule a walkthrough?",
      timestamp: fmt(66),
    },
    {
      id: "m15",
      groupId: "group-2",
      senderId: "user-3",
      senderName: "David Lee",
      content: "I'll set up a call for next Tuesday. Who's available?",
      timestamp: fmt(55),
    },
    {
      id: "m16",
      groupId: "group-2",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content: "Tuesday works for me!",
      timestamp: fmt(50),
    },
    {
      id: "m17",
      groupId: "group-2",
      senderId: "user-4",
      senderName: "Emily Wong",
      content:
        "Same here. I'll prepare a short demo of the social media templates.",
      timestamp: fmt(40),
    },
    {
      id: "m18",
      groupId: "group-2",
      senderId: "user-1",
      senderName: "Alex Rivera",
      content: "Perfect. I'll send out the invite shortly.",
      timestamp: fmt(30),
    },
    {
      id: "m19",
      groupId: "group-2",
      senderId: "user-3",
      senderName: "David Lee",
      content: "Also - reminder that blog posts are due by Thursday noon.",
      timestamp: fmt(15),
    },
    {
      id: "m20",
      groupId: "group-2",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content: "On it! Will have mine submitted by Wednesday evening.",
      timestamp: fmt(3),
    },
  ],
  "group-3": [
    {
      id: "m21",
      groupId: "group-3",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content:
        "v2.4 release notes are published. Check the changelog for details.",
      timestamp: fmt(120),
    },
    {
      id: "m22",
      groupId: "group-3",
      senderId: "user-3",
      senderName: "David Lee",
      content:
        "The new dashboard feature is getting great feedback from beta users!",
      timestamp: fmt(100),
    },
    {
      id: "m23",
      groupId: "group-3",
      senderId: "user-4",
      senderName: "Emily Wong",
      content: "We fixed the notification bug that was reported last week.",
      timestamp: fmt(80),
    },
    {
      id: "m24",
      groupId: "group-3",
      senderId: "user-1",
      senderName: "Alex Rivera",
      content: "Great work everyone. Next milestone is v2.5 by end of month.",
      timestamp: fmt(60),
    },
    {
      id: "m25",
      groupId: "group-3",
      senderId: "user-2",
      senderName: "Sarah Chen",
      content: "Mobile app update is also live on both stores.",
      timestamp: fmt(10),
    },
  ],
};

export const mockTasks: Record<string, Task[]> = {
  "group-1": [
    {
      id: "t1",
      groupId: "group-1",
      title: "Prepare Q2 company report",
      assignedTo: "user-1",
      assignedToName: "Fuhad",
      status: "pending",
      dueDate: "Today",
      createdBy: "user-1",
    },
    {
      id: "t2",
      groupId: "group-1",
      title: "Review and approve expense reports",
      assignedTo: "user-2",
      assignedToName: "Sarah Chen",
      status: "pending",
      dueDate: "Tomorrow",
      createdBy: "user-1",
    },
    {
      id: "t3",
      groupId: "group-1",
      title: "Update employee handbook",
      assignedTo: "user-3",
      assignedToName: "David Lee",
      status: "in_progress",
      dueDate: "May 10",
      createdBy: "user-2",
    },
    {
      id: "t4",
      groupId: "group-1",
      title: "Schedule all-hands meeting",
      assignedTo: "user-4",
      assignedToName: "Emily Wong",
      status: "completed",
      dueDate: "May 1",
      createdBy: "user-1",
    },
    {
      id: "t5",
      groupId: "group-1",
      title: "Set up new hire onboarding sessions",
      assignedTo: "user-2",
      assignedToName: "Sarah Chen",
      status: "completed",
      dueDate: "Apr 28",
      createdBy: "user-1",
    },
  ],
  "group-2": [
    {
      id: "t6",
      groupId: "group-2",
      title: "Finalize social media schedule for launch",
      assignedTo: "user-2",
      assignedToName: "Sarah Chen",
      status: "pending",
      dueDate: "Today",
      createdBy: "user-3",
    },
    {
      id: "t7",
      groupId: "group-2",
      title: "Draft blog post on new feature",
      assignedTo: "user-3",
      assignedToName: "David Lee",
      status: "pending",
      dueDate: "Tomorrow",
      createdBy: "user-2",
    },
    {
      id: "t8",
      groupId: "group-2",
      title: "Finalize brand media report",
      assignedTo: "user-1",
      assignedToName: "Fuhad",
      status: "in_progress",
      dueDate: "May 8",
      createdBy: "user-1",
    },
    {
      id: "t9",
      groupId: "group-2",
      title: "Draft mobile post for product launch",
      assignedTo: "user-2",
      assignedToName: "Sarah Chen",
      status: "pending",
      dueDate: "May 9",
      createdBy: "user-3",
    },
    {
      id: "t10",
      groupId: "group-2",
      title: "Create Q3 campaign brief",
      assignedTo: "user-4",
      assignedToName: "Emily Wong",
      status: "completed",
      dueDate: "May 2",
      createdBy: "user-2",
    },
    {
      id: "t11",
      groupId: "group-2",
      title: "Update brand guidelines deck",
      assignedTo: "user-3",
      assignedToName: "David Lee",
      status: "completed",
      dueDate: "Apr 30",
      createdBy: "user-1",
    },
  ],
  "group-3": [
    {
      id: "t12",
      groupId: "group-3",
      title: "Write v2.5 release notes",
      assignedTo: "user-2",
      assignedToName: "Sarah Chen",
      status: "pending",
      dueDate: "May 15",
      createdBy: "user-2",
    },
    {
      id: "t13",
      groupId: "group-3",
      title: "Fix critical login bug",
      assignedTo: "user-3",
      assignedToName: "David Lee",
      status: "completed",
      dueDate: "May 2",
      createdBy: "user-3",
    },
    {
      id: "t14",
      groupId: "group-3",
      title: "Conduct user testing for dashboard",
      assignedTo: "user-4",
      assignedToName: "Emily Wong",
      status: "in_progress",
      dueDate: "May 12",
      createdBy: "user-1",
    },
  ],
};
