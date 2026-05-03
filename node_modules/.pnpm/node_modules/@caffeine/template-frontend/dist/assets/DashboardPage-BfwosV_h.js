import { f as createLucideIcon, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, X, h as mockGroups, b as ue, u as useAuthStore, i as useUIStore, a as useNavigate, U as Users, k as mockUsers, S as SquareCheckBig, P as Plus, l as mockTasks } from "./index-CojF2jFo.js";
import { H as Hash } from "./hash--rUsAWO2.js";
import { A as ArrowRight } from "./arrow-right-C-fjScci.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function CreateGroupModal({
  open,
  onClose,
  onCreated
}) {
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [parentId, setParentId] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const nameRef = reactExports.useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const newGroup = {
      id: `group-${Date.now()}`,
      name: name.trim().toLowerCase().replace(/\s+/g, "-"),
      companyId: "comp-1",
      memberCount: 1,
      description: description.trim() || void 0,
      parentId: parentId || void 0
    };
    setIsSubmitting(false);
    ue.success(`Group #${newGroup.name} created`);
    onCreated == null ? void 0 : onCreated(newGroup);
    setName("");
    setDescription("");
    setParentId("");
    onClose();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        "aria-modal": "true",
        "aria-labelledby": "create-group-title",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { type: "spring", duration: 0.3, bounce: 0.15 },
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border shadow-material-elevated w-full max-w-md",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            "data-ocid": "create_group.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "create-group-title",
                    className: "font-display font-bold text-base text-foreground",
                    children: "Create a Group"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Close dialog",
                    "data-ocid": "create_group.close_button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "group-name",
                        className: "block text-sm font-medium text-foreground",
                        children: [
                          "Group Name",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-smooth", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pl-3 text-muted-foreground font-medium select-none", children: "#" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: nameRef,
                          id: "group-name",
                          type: "text",
                          placeholder: "e.g. design-team",
                          value: name,
                          onChange: (e) => setName(
                            e.target.value.toLowerCase().replace(/[^a-z0-9-\s]/g, "")
                          ),
                          "data-ocid": "create_group.input",
                          className: "flex-1 px-2 py-2.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
                          required: true,
                          maxLength: 50
                        }
                      )
                    ] }),
                    name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Channel will be",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                        "#",
                        name.replace(/\s+/g, "-")
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "group-description",
                        className: "block text-sm font-medium text-foreground",
                        children: [
                          "Description",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: "(optional)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "group-description",
                        placeholder: "What's this group about?",
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        "data-ocid": "create_group.textarea",
                        rows: 2,
                        maxLength: 200,
                        className: "w-full px-3 py-2.5 bg-transparent border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "group-parent",
                        className: "block text-sm font-medium text-foreground",
                        children: [
                          "Parent Group",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: "(optional)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "group-parent",
                        value: parentId,
                        onChange: (e) => setParentId(e.target.value),
                        "data-ocid": "create_group.select",
                        className: "w-full px-3 py-2.5 bg-card border border-input rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth appearance-none cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None (top-level group)" }),
                          mockGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: g.id, children: [
                            "#",
                            g.name
                          ] }, g.id))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border flex items-center justify-end gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "data-ocid": "create_group.cancel_button",
                      className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      whileTap: { scale: 0.97 },
                      disabled: !name.trim() || isSubmitting,
                      "data-ocid": "create_group.submit_button",
                      className: "flex items-center gap-2 px-5 py-2 bg-foreground text-background text-sm font-medium rounded-xl hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" }),
                        "Creating..."
                      ] }) : "Create Group"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] }) });
}
const VALID_CODES = ["ACME-2026", "SYNC-2026", "TEAM-01"];
function JoinCompanyModal({ open, onClose }) {
  const [code, setCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleChange = (e) => {
    const val = e.target.value.toUpperCase().slice(0, 10);
    setCode(val);
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
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
    ue.success("Successfully joined the company!");
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
  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: handleClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        "aria-modal": "true",
        "aria-labelledby": "join-company-title",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { type: "spring", duration: 0.3, bounce: 0.15 },
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border shadow-material-elevated w-full max-w-sm",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            "data-ocid": "join_company.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "join-company-title",
                    className: "font-display font-bold text-base text-foreground",
                    children: "Join a Company"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Close dialog",
                    "data-ocid": "join_company.close_button",
                    onClick: handleClose,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the invite code shared by your company administrator to join the workspace." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "invite-code",
                        className: "block text-sm font-medium text-foreground",
                        children: "Invite Code"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: inputRef,
                        id: "invite-code",
                        type: "text",
                        autoComplete: "off",
                        spellCheck: false,
                        placeholder: "e.g. ACME-2026",
                        value: code,
                        onChange: handleChange,
                        "data-ocid": "join_company.input",
                        className: `w-full px-4 py-3 bg-transparent border rounded-xl text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground placeholder:tracking-normal outline-none transition-smooth text-center uppercase ${error ? "border-destructive focus:ring-2 focus:ring-destructive/30" : "border-input focus:ring-2 focus:ring-ring focus:border-transparent"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -4 },
                        "data-ocid": "join_company.error_state",
                        className: "text-xs text-destructive mt-1",
                        children: error
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0 },
                        "data-ocid": "join_company.success_state",
                        className: "text-xs text-foreground font-medium mt-1 flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✓" }),
                          " Joined successfully!"
                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Hint: Try",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "font-mono font-medium text-foreground cursor-pointer underline underline-offset-2 bg-transparent border-none p-0",
                        onClick: () => {
                          setCode("ACME-2026");
                          setError("");
                        },
                        children: "ACME-2026"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border flex items-center justify-end gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClose,
                      "data-ocid": "join_company.cancel_button",
                      className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      whileTap: { scale: 0.97 },
                      disabled: !code.trim() || isSubmitting || success,
                      "data-ocid": "join_company.confirm_button",
                      className: "flex items-center gap-2 px-5 py-2 bg-foreground text-background text-sm font-medium rounded-xl hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" }),
                        "Joining..."
                      ] }) : success ? "Joined!" : "Join Company"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] }) });
}
const SKELETON_KEYS_KPI = ["kpi-1", "kpi-2", "kpi-3", "kpi-4"];
const SKELETON_KEYS_TASK = ["t-sk-1", "t-sk-2", "t-sk-3"];
const SKELETON_KEYS_ACTIVITY = [
  "act-sk-1",
  "act-sk-2",
  "act-sk-3",
  "act-sk-4"
];
const allTasks = Object.values(mockTasks).flat();
const completedTasks = allTasks.filter((t) => t.status === "completed");
const recentActivity = [
  {
    id: 1,
    text: "Sarah Chen joined marketing-team",
    time: "2m ago",
    icon: Users
  },
  {
    id: 2,
    text: "New task added to product-updates",
    time: "15m ago",
    icon: SquareCheckBig
  },
  {
    id: 3,
    text: "David Lee completed Q2 report task",
    time: "1h ago",
    icon: Zap
  },
  {
    id: 4,
    text: "Emily Wong sent a message in #general",
    time: "2h ago",
    icon: Hash
  },
  {
    id: 5,
    text: "Alex Rivera created engineering group",
    time: "3h ago",
    icon: Plus
  }
];
function StatusBadge({ status }) {
  if (status === "completed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full border border-foreground/30 text-foreground font-medium", children: "Done" });
  }
  if (status === "in_progress") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full border border-muted-foreground text-muted-foreground font-medium", children: "In Progress" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-foreground text-background font-medium", children: "Pending" });
}
function TaskCard({ task, index, onGroupClick }) {
  var _a;
  const groupName = ((_a = mockGroups.find((g) => g.id === task.groupId)) == null ? void 0 : _a.name) ?? task.groupId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -6 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06, duration: 0.25 },
      className: "px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-smooth cursor-pointer",
      onClick: () => onGroupClick(task.groupId),
      "data-ocid": `dashboard.task.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0 mt-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: task.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Due: ",
              task.dueDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "text-xs text-muted-foreground hover:text-foreground transition-smooth",
                children: [
                  "#",
                  groupName
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status })
      ]
    }
  );
}
const ROLE_BADGE = {
  owner: "bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  admin: "bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  manager: "border border-foreground text-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
  employee: "border border-muted-foreground text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
};
function DashboardPage() {
  const { user, company } = useAuthStore();
  const { setActiveGroupId } = useUIStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [createGroupOpen, setCreateGroupOpen] = reactExports.useState(false);
  const [joinCompanyOpen, setJoinCompanyOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(t);
  }, []);
  const isAdmin = (user == null ? void 0 : user.role) === "owner" || (user == null ? void 0 : user.role) === "admin";
  const adminStats = [
    {
      label: "Total Members",
      value: mockUsers.length,
      icon: Users,
      sub: "in workspace"
    },
    {
      label: "Active Channels",
      value: mockGroups.length,
      icon: Hash,
      sub: "groups"
    },
    {
      label: "Total Tasks",
      value: allTasks.length,
      icon: SquareCheckBig,
      sub: "across all groups"
    },
    {
      label: "Completion Rate",
      value: `${Math.round(completedTasks.length / allTasks.length * 100)}%`,
      icon: TrendingUp,
      sub: `${completedTasks.length} completed`
    }
  ];
  const myTasks = allTasks.filter((t) => t.assignedTo === (user == null ? void 0 : user.id));
  const myPending = myTasks.filter(
    (t) => t.status === "pending" || t.status === "in_progress"
  );
  const handleGroupClick = (groupId) => {
    setActiveGroupId(groupId);
    navigate({ to: "/chat/$groupId", params: { groupId } });
  };
  const getGreeting = () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full overflow-y-auto pb-20 md:pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-4 md:p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "flex items-start justify-between gap-4",
          "data-ocid": "dashboard.welcome_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: [
                getGreeting(),
                ", ",
                user == null ? void 0 : user.name.split(" ")[0],
                " 👋"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
                company == null ? void 0 : company.name,
                " ·",
                " ",
                (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })
              ] })
            ] }),
            (user == null ? void 0 : user.role) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ROLE_BADGE[user.role], children: user.role })
          ]
        }
      ),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: isLoading ? SKELETON_KEYS_KPI.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-4 space-y-3 animate-pulse",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 mr-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-muted rounded w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 bg-muted rounded w-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded w-3/4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-muted rounded-lg flex-shrink-0" })
          ] })
        },
        k
      )) : adminStats.map((stat, i) => {
        const Icon = stat.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07, duration: 0.28 },
            className: "bg-card rounded-xl border border-border p-4 shadow-xs hover:shadow-material transition-smooth",
            "data-ocid": `dashboard.kpi_card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: stat.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground mt-1 leading-none", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.sub })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-foreground" }) })
            ] })
          },
          stat.label
        );
      }) }),
      !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1, duration: 0.3 },
          className: "bg-card rounded-xl border border-border shadow-xs",
          "data-ocid": "dashboard.my_tasks_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "My Tasks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                myPending.length,
                " pending"
              ] })
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: SKELETON_KEYS_TASK.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 py-3 flex items-center gap-3 animate-pulse",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-muted flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded w-1/3" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded-full w-16" })
                ]
              },
              k
            )) }) : myPending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-8 text-center",
                "data-ocid": "dashboard.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-5 h-5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "All caught up!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "No pending tasks assigned to you." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleGroupClick("group-1"),
                      "data-ocid": "dashboard.empty_state_cta",
                      className: "mt-4 text-xs font-medium text-foreground underline underline-offset-2 hover:opacity-70 transition-smooth",
                      children: "Browse channels →"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: myPending.slice(0, 5).map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TaskCard,
              {
                task,
                index: i,
                onGroupClick: handleGroupClick
              },
              task.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15, duration: 0.3 },
            className: "bg-card rounded-xl border border-border shadow-xs",
            "data-ocid": "dashboard.activity_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Recent Activity" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: isLoading ? SKELETON_KEYS_ACTIVITY.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-4 py-3 flex items-start gap-3 animate-pulse",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-muted rounded-lg flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4/5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded w-1/4" })
                    ] })
                  ]
                },
                k
              )) : recentActivity.map((item, i) => {
                const Icon = item.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -6 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.15 + i * 0.06, duration: 0.25 },
                    className: "px-4 py-3 flex items-start gap-3",
                    "data-ocid": `dashboard.activity.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-muted flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-snug", children: item.text }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.time })
                      ] })
                    ]
                  },
                  item.id
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.3 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Quick Actions" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { x: 2 },
                      whileTap: { scale: 0.98 },
                      onClick: () => setCreateGroupOpen(true),
                      "data-ocid": "dashboard.create_group_button",
                      className: "w-full flex items-center gap-3 p-3 rounded-xl bg-foreground text-background hover:opacity-90 transition-smooth text-left",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-tight", children: "Create Group" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70", children: "Start a new channel" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 opacity-60 flex-shrink-0" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { x: 2 },
                      whileTap: { scale: 0.98 },
                      onClick: () => setJoinCompanyOpen(true),
                      "data-ocid": "dashboard.join_company_button",
                      className: "w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-foreground/40 hover:bg-muted transition-smooth text-left",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-foreground flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-tight", children: "Join via Code" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter an invite code" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Jump to Channel" }) }),
                mockGroups.slice(0, 4).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { x: 2 },
                    onClick: () => handleGroupClick(g.id),
                    "data-ocid": `dashboard.group_link.${i + 1}`,
                    className: "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted transition-smooth text-left last:rounded-b-xl",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate flex-1", children: g.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: g.memberCount })
                    ]
                  },
                  g.id
                ))
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateGroupModal,
      {
        open: createGroupOpen,
        onClose: () => setCreateGroupOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      JoinCompanyModal,
      {
        open: joinCompanyOpen,
        onClose: () => setJoinCompanyOpen(false)
      }
    )
  ] });
}
export {
  DashboardPage
};
