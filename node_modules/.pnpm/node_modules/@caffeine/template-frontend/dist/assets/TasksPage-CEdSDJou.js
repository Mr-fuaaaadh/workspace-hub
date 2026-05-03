import { f as createLucideIcon, r as reactExports, h as mockGroups, j as jsxRuntimeExports, S as SquareCheckBig, P as Plus, A as AnimatePresence, m as motion, X, g as cn, l as mockTasks } from "./index-CojF2jFo.js";
import { A as AddTaskModal, T as TaskDetailModal, U as User } from "./TaskDetailModal-DYYZBihw.js";
import { E as Eye } from "./eye-D_x1Z9FB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5"];
const allTasksRaw = Object.entries(
  mockTasks
).flatMap(([groupId, tasks]) => {
  const group = mockGroups.find((g) => g.id === groupId);
  const groupName = (group == null ? void 0 : group.name) ?? groupId;
  return tasks.map((t) => ({ ...t, groupName }));
});
const STATUS_LABEL = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed"
};
const FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" }
];
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-none whitespace-nowrap",
        status === "pending" ? "border border-border text-muted-foreground" : status === "in_progress" ? "bg-foreground text-background" : "border border-border text-muted-foreground line-through"
      ),
      children: STATUS_LABEL[status]
    }
  );
}
function SkeletonRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "animate-pulse border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-48" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded-full w-20" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-28" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-16" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted rounded-lg w-12" }) })
  ] });
}
function EmptyTableState({
  query,
  filter
}) {
  const message = query || filter !== "all" ? "No tasks match your filters" : "No tasks yet";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      "data-ocid": "tasks.empty_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-muted-foreground opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: message })
      ] }) })
    }
  );
}
function TaskRow({ task, index, onView }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.18, delay: index * 0.03 },
      "data-ocid": `tasks.item.${index + 1}`,
      onClick: () => onView(task),
      className: cn(
        "border-b border-border cursor-pointer group transition-colors duration-150",
        index % 2 === 0 ? "bg-background" : "bg-muted/20",
        "hover:bg-muted/40"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground font-mono w-10", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-[200px] sm:max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-sm font-medium leading-snug block truncate",
              task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
            ),
            children: task.title
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono truncate block max-w-[120px]", children: [
          "#",
          task.groupName
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[100px]", children: task.assignedToName })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: task.dueDate })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onView(task);
            },
            "data-ocid": `tasks.view_button.${index + 1}`,
            className: "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-smooth opacity-0 group-hover:opacity-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "View" })
            ]
          }
        ) })
      ]
    }
  );
}
function MobileTaskCard({
  task,
  index,
  onView
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.18, delay: index * 0.03 },
      "data-ocid": `tasks.item.${index + 1}`,
      onClick: () => onView(task),
      className: "flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card active:bg-muted transition-smooth cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm font-medium leading-snug truncate",
                task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
              ),
              children: task.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "#",
              task.groupName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: task.dueDate })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status })
      ]
    }
  );
}
function TasksPage() {
  var _a;
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [tasks, setTasks] = reactExports.useState(allTasksRaw);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [selectedTask, setSelectedTask] = reactExports.useState(null);
  const searchRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 220);
    return () => clearTimeout(timer);
  }, []);
  const filteredTasks = reactExports.useMemo(() => {
    const q = search.toLowerCase().trim();
    return tasks.filter((t) => {
      const matchesSearch = !q || t.title.toLowerCase().includes(q) || t.assignedToName.toLowerCase().includes(q) || t.groupName.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || t.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);
  const handleCreate = (task) => {
    const group = mockGroups.find((g) => g.id === task.groupId);
    const groupName = (group == null ? void 0 : group.name) ?? task.groupId;
    setTasks((prev) => [{ ...task, groupName }, ...prev]);
  };
  const handleUpdate = (updated) => {
    setTasks(
      (prev) => prev.map((t) => t.id === updated.id ? { ...t, ...updated } : t)
    );
    setSelectedTask(null);
  };
  const defaultGroupId = ((_a = mockGroups[0]) == null ? void 0 : _a.id) ?? "group-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col min-h-0 bg-background",
      "data-ocid": "tasks.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-3 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-5 h-5 text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-base text-foreground", children: "Tasks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-medium bg-muted text-muted-foreground rounded-full px-2 py-0.5 leading-none",
                "data-ocid": "tasks.count_badge",
                children: filteredTasks.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAddModal(true),
              "data-ocid": "tasks.create_button",
              className: "ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 active:scale-95 transition-smooth shadow-material",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create Task" })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-2.5 flex flex-col sm:flex-row gap-2.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search tasks by title, assignee, or group...",
                "data-ocid": "tasks.search_input",
                className: "w-full text-sm text-foreground bg-muted/40 rounded-xl pl-9 pr-8 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                initial: { opacity: 0, scale: 0.7 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.7 },
                type: "button",
                onClick: () => {
                  var _a2;
                  setSearch("");
                  (_a2 = searchRef.current) == null ? void 0 : _a2.focus();
                },
                "data-ocid": "tasks.search_clear_button",
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-foreground transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-shrink-0 flex-wrap", children: FILTER_CHIPS.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(chip.id),
              "data-ocid": `tasks.filter.${chip.id}`,
              className: cn(
                "text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth",
                filter === chip.id ? "bg-foreground text-background border-foreground" : "text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              ),
              children: chip.label
            },
            chip.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-10", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell", children: "Group" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell", children: "Assignee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}, k)) : filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTableState, { query: search, filter }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: filteredTasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TaskRow,
            {
              task,
              index: i,
              onView: setSelectedTask
            },
            task.id
          )) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto sm:hidden p-3 space-y-2", children: loading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-3.5 space-y-2 animate-pulse",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-12" })
              ] })
            ]
          },
          k
        )) : filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            "data-ocid": "tasks.empty_state",
            className: "flex flex-col items-center justify-center py-16 gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-muted-foreground opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: search || filter !== "all" ? "No tasks match your filters" : "No tasks yet" })
            ]
          }
        ) : filteredTasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileTaskCard,
          {
            task,
            index: i,
            onView: setSelectedTask
          },
          task.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AddTaskModal,
          {
            groupId: defaultGroupId,
            onClose: () => setShowAddModal(false),
            onCreate: handleCreate
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedTask && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TaskDetailModal,
          {
            task: selectedTask,
            groupId: selectedTask.groupId,
            canManage: true,
            onClose: () => setSelectedTask(null),
            onUpdate: handleUpdate
          }
        ) })
      ]
    }
  );
}
export {
  TasksPage
};
