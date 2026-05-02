var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { n as Subscribable, s as shallowEqualObjects, a5 as hashKey, a6 as getDefaultState, D as notifyManager, F as useQueryClient, r as reactExports, t as noop, E as shouldThrowError, f as createLucideIcon, a7 as mockMessages, l as mockTasks, u as useAuthStore, k as mockUsers, j as jsxRuntimeExports, m as motion, X, b as ue, g as cn } from "./index-CojF2jFo.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
async function getMessages(groupId) {
  await delay(rand(150, 300));
  return mockMessages[groupId] ?? [];
}
async function getTasks(groupId) {
  await delay(rand(150, 300));
  return mockTasks[groupId] ?? [];
}
async function sendMessage(groupId, content, senderId, senderName) {
  await delay(rand(150, 300));
  const msg = {
    id: `m-${Date.now()}`,
    groupId,
    senderId,
    senderName,
    content,
    timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })
  };
  if (!mockMessages[groupId]) mockMessages[groupId] = [];
  mockMessages[groupId].push(msg);
  return msg;
}
async function createTask(groupId, title, assignedTo, assignedToName, dueDate, createdBy) {
  await delay(rand(150, 300));
  const task = {
    id: `task-${Date.now()}`,
    groupId,
    title,
    assignedTo,
    assignedToName,
    status: "pending",
    dueDate,
    createdBy
  };
  if (!mockTasks[groupId]) mockTasks[groupId] = [];
  mockTasks[groupId].push(task);
  return task;
}
async function updateTaskStatus(groupId, taskId, status) {
  await delay(rand(150, 300));
  const tasks = mockTasks[groupId] ?? [];
  const task = tasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found");
  task.status = status;
  return task;
}
function AddTaskModal({
  groupId,
  onClose,
  onCreate
}) {
  const { user } = useAuthStore();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [assignedTo, setAssignedTo] = reactExports.useState(mockUsers[0].id);
  const [dueDate, setDueDate] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("pending");
  const createMut = useMutation({
    mutationFn: () => {
      const assignee = mockUsers.find((u) => u.id === assignedTo);
      return createTask(
        groupId,
        title,
        assignedTo,
        (assignee == null ? void 0 : assignee.name) ?? "",
        dueDate || "TBD",
        (user == null ? void 0 : user.id) ?? ""
      );
    },
    onSuccess: (task) => {
      onCreate({ ...task, status, description });
      ue.success("Task created");
      onClose();
    },
    onError: () => ue.error("Failed to create task")
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createMut.mutate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40",
        "data-ocid": "add_task.backdrop"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 16 },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-ocid": "add_task.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-md bg-card rounded-3xl border border-border shadow-material-elevated overflow-hidden",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-6 pb-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "New Task" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "add_task.close_button",
                    className: "p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "task-title",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                        children: "Task Title *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "task-title",
                        type: "text",
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        placeholder: "Enter task title",
                        required: true,
                        "data-ocid": "add_task.title_input",
                        className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "task-desc",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                        children: "Description"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "task-desc",
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        placeholder: "Optional description...",
                        rows: 2,
                        "data-ocid": "add_task.description_textarea",
                        className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 resize-none transition-smooth placeholder:text-muted-foreground"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-assignee",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Assign To"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          id: "task-assignee",
                          value: assignedTo,
                          onChange: (e) => setAssignedTo(e.target.value),
                          "data-ocid": "add_task.assignee_select",
                          className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth",
                          children: mockUsers.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id, children: u.name }, u.id))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-due",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Due Date"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "task-due",
                          type: "text",
                          value: dueDate,
                          onChange: (e) => setDueDate(e.target.value),
                          placeholder: "e.g. May 15",
                          "data-ocid": "add_task.due_date_input",
                          className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Initial Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["pending", "in_progress"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setStatus(s),
                        "data-ocid": `add_task.status.${s}`,
                        className: `text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth ${status === s ? "bg-foreground text-background border-foreground" : "text-muted-foreground border-border hover:border-foreground/40"}`,
                        children: s === "pending" ? "Pending" : "In Progress"
                      },
                      s
                    )) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-2 flex gap-3 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "data-ocid": "add_task.cancel_button",
                      className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: createMut.isPending || !title.trim(),
                      "data-ocid": "add_task.submit_button",
                      className: "px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 disabled:opacity-40 transition-smooth",
                      children: createMut.isPending ? "Creating..." : "Create Task"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function TaskDetailModal({
  task,
  groupId,
  canManage,
  onClose,
  onUpdate
}) {
  var _a2;
  const [title, setTitle] = reactExports.useState(task.title);
  const [status, setStatus] = reactExports.useState(task.status);
  const [assignedTo, setAssignedTo] = reactExports.useState(task.assignedTo);
  const [dueDate, setDueDate] = reactExports.useState(task.dueDate);
  const [description, setDescription] = reactExports.useState(task.description ?? "");
  const saveMut = useMutation({
    mutationFn: () => updateTaskStatus(groupId, task.id, status),
    onSuccess: (updated) => {
      const assignee = mockUsers.find((u) => u.id === assignedTo);
      onUpdate({
        ...updated,
        title,
        assignedTo,
        assignedToName: (assignee == null ? void 0 : assignee.name) ?? updated.assignedToName,
        dueDate,
        description
      });
      ue.success("Task updated");
      onClose();
    },
    onError: () => ue.error("Failed to update task")
  });
  const isDirty = title !== task.title || status !== task.status || assignedTo !== task.assignedTo || dueDate !== task.dueDate || description !== (task.description ?? "");
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40",
        "data-ocid": "task_detail.backdrop"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 16 },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-ocid": "task_detail.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-md bg-card rounded-3xl border border-border shadow-material-elevated overflow-hidden",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  canManage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: title,
                      onChange: (e) => setTitle(e.target.value),
                      "data-ocid": "task_detail.title_input",
                      className: "w-full text-base font-semibold text-foreground bg-transparent outline-none border-b border-transparent focus:border-border pb-0.5 transition-smooth"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    "Created by",
                    " ",
                    ((_a2 = mockUsers.find((u) => u.id === task.createdBy)) == null ? void 0 : _a2.name) ?? "Unknown"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "task_detail.close_button",
                    className: "p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth flex-shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "task-detail-description",
                      className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                      children: "Description"
                    }
                  ),
                  canManage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "task-detail-description",
                      value: description,
                      onChange: (e) => setDescription(e.target.value),
                      placeholder: "Add a description...",
                      rows: 3,
                      "data-ocid": "task_detail.description_textarea",
                      className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2.5 border border-border outline-none focus:border-foreground/40 resize-none transition-smooth placeholder:text-muted-foreground"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: description || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "No description" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: statusOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => canManage && setStatus(opt.value),
                      "data-ocid": `task_detail.status.${opt.value}`,
                      className: cn(
                        "text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth",
                        status === opt.value ? "bg-foreground text-background border-foreground" : "text-muted-foreground border-border hover:border-foreground/40",
                        !canManage && "cursor-default"
                      ),
                      children: opt.label
                    },
                    opt.value
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "task-detail-assignee",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                          " Assignee"
                        ]
                      }
                    ),
                    canManage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "task-detail-assignee",
                        value: assignedTo,
                        onChange: (e) => setAssignedTo(e.target.value),
                        "data-ocid": "task_detail.assignee_select",
                        className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth",
                        children: mockUsers.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id, children: u.name }, u.id))
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: task.assignedToName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "task-detail-due-date",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                          " Due Date"
                        ]
                      }
                    ),
                    canManage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "task-detail-due-date",
                        type: "text",
                        value: dueDate,
                        onChange: (e) => setDueDate(e.target.value),
                        placeholder: "e.g. May 15",
                        "data-ocid": "task_detail.due_date_input",
                        className: "w-full text-sm text-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border outline-none focus:border-foreground/40 transition-smooth placeholder:text-muted-foreground"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: task.dueDate })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-2 flex gap-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "task_detail.cancel_button",
                    className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-smooth",
                    children: "Cancel"
                  }
                ),
                canManage && isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => saveMut.mutate(),
                    disabled: saveMut.isPending || !title.trim(),
                    "data-ocid": "task_detail.save_button",
                    className: "px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-80 disabled:opacity-40 transition-smooth",
                    children: saveMut.isPending ? "Saving..." : "Save changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AddTaskModal as A,
  TaskDetailModal as T,
  User as U,
  getTasks as a,
  getMessages as g,
  sendMessage as s,
  useMutation as u
};
