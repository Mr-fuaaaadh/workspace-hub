import { r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, h as mockGroups, a as useNavigate, i as useUIStore, a2 as Root, a3 as Image, a4 as Fallback, U as Users } from "./index-CojF2jFo.js";
import { H as Hash } from "./hash--rUsAWO2.js";
const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];
const LAST_ACTIVITY = {
  "group-1": "5 min ago",
  "group-2": "3 min ago",
  "group-2a": "1 hr ago",
  "group-2b": "20 min ago",
  "group-3": "10 min ago",
  "group-4": "2 hrs ago",
  "group-5": "15 min ago",
  "group-5a": "45 min ago"
};
function flattenGroups(groups) {
  var _a;
  const result = [];
  for (const g of groups) {
    result.push(g);
    if ((_a = g.children) == null ? void 0 : _a.length) {
      result.push(...g.children);
    }
  }
  return result;
}
function GroupCard({ group, index }) {
  const navigate = useNavigate();
  const { setActiveGroupId } = useUIStore();
  const handleClick = () => {
    setActiveGroupId(group.id);
    navigate({ to: "/chat/$groupId", params: { groupId: group.id } });
  };
  const isChild = !!group.parentId;
  const initials = group.name.split(/[-_\s]/).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("").slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.28,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: { y: -2, scale: 1.012 },
      whileTap: { scale: 0.98 },
      onClick: handleClick,
      "data-ocid": `group_list.group_card.${index + 1}`,
      className: "group/card bg-card border border-border rounded-2xl p-5 cursor-pointer shadow-material hover:shadow-material-elevated transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { className: "w-12 h-12 rounded-full ring-1 ring-border flex-shrink-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: group.avatar,
                alt: group.name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Fallback, { className: "w-full h-full flex items-center justify-center bg-muted text-foreground text-sm font-semibold", children: initials })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate leading-tight", children: group.name }),
            group.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-snug", children: group.description })
          ] }),
          isChild && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-medium flex-shrink-0", children: "sub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              group.memberCount,
              " members"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: LAST_ACTIVITY[group.id] ?? "—" })
        ] })
      ]
    }
  );
}
function SkeletonCard({ id }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-5 animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4/5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-4 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-16" })
        ] })
      ]
    },
    id
  );
}
function GroupListPage() {
  const [loading, setLoading] = reactExports.useState(true);
  const [groups, setGroups] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      setGroups(flattenGroups(mockGroups));
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);
  const allGroups = flattenGroups(mockGroups);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 border-b border-border bg-card px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Groups" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        allGroups.length,
        " channels in your workspace"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6 pb-20 md:pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: SKELETON_KEYS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { id }, id))
      },
      "skeleton"
    ) : groups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        "data-ocid": "group_list.empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "No groups yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Groups will appear here once they are created in your workspace." })
        ]
      },
      "empty"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: groups.map((group, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GroupCard, { group, index: i }, group.id))
      },
      "grid"
    ) }) })
  ] });
}
export {
  GroupListPage
};
