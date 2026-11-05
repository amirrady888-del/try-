import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useMe } from "./use-me-yWP5dLXW.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { n as Panel, t as AppShell } from "./AppShell-Sz6-wnEv.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Badge } from "./tabs-C4_NZSXE.mjs";
import { a as subjectInfo, n as STATUS_LABELS } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ebxpk6Yn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Admin() {
	const { data: me, isLoading } = useMe();
	if (isLoading || !me) return null;
	if (!me.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/home",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "الأدمن",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "teachers",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "teachers",
							children: "المدرسين"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "exams",
							children: "الامتحانات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "students",
							children: "الطلاب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "subs",
							children: "التسليمات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "news",
							children: "الإعلانات"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "teachers",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Teachers, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "exams",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Simple, {
						table: "exams",
						cols: "id,title,status",
						label: (r) => `${r.title} · ${STATUS_LABELS[r.status]}`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "students",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Simple, {
						table: "students",
						cols: "id,name,code,active",
						label: (r) => `${r.name} · ${r.code}${r.active ? "" : " (موقوف)"}`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "subs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Simple, {
						table: "submissions",
						cols: "id,final_score,max_score,submitted_at",
						order: "submitted_at",
						label: (r) => `${r.final_score ?? "قيد التصحيح"} / ${r.max_score} · ${new Date(r.submitted_at).toLocaleString("ar-EG")}`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "news",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(News, {})
				})
			]
		})]
	});
}
function Stats() {
	const { data } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const t = [
				"teachers",
				"students",
				"exams",
				"groups",
				"submissions"
			];
			const r = await Promise.all(t.map((x) => supabase.from(x).select("id", {
				count: "exact",
				head: true
			})));
			return t.map((x, i) => ({
				x,
				n: r[i].count ?? 0
			}));
		}
	});
	const L = {
		teachers: "مدرس",
		students: "طالب",
		exams: "امتحان",
		groups: "مجموعة",
		submissions: "تسليم"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-5",
		children: data?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-3xl text-primary",
				children: s.n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: L[s.x]
			})]
		}, s.x))
	});
}
function Teachers() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-teachers"],
		queryFn: async () => (await supabase.from("teachers").select("*").order("created_at", { ascending: false })).data ?? []
	});
	async function setStatus(id, status) {
		const { error } = await supabase.from("teachers").update({ status }).eq("id", id);
		if (error) toast.error("تعذر التحديث");
		else qc.invalidateQueries({ queryKey: ["admin-teachers"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "text-muted-foreground",
			children: "لا يوجد مدرسين."
		}), data?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-bold",
				children: [
					t.full_name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: t.status === "active" ? "default" : "secondary",
						children: STATUS_LABELS[t.status]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted-foreground",
				dir: "auto",
				children: [
					subjectInfo(t.subject).label,
					" · ",
					t.phone,
					" · ",
					t.email
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					t.status !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => setStatus(t.id, "active"),
						children: "قبول"
					}),
					t.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setStatus(t.id, "rejected"),
						children: "رفض"
					}),
					t.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setStatus(t.id, "suspended"),
						children: "إيقاف"
					})
				]
			})]
		}, t.id))]
	});
}
function Simple({ table, cols, label, order = "created_at" }) {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin", table],
		queryFn: async () => (await supabase.from(table).select(cols).order(order, { ascending: false }).limit(200)).data ?? []
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "divide-y rounded-2xl border bg-card",
		children: [data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-4 text-muted-foreground",
			children: "لا توجد بيانات."
		}), data?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label(r) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				onClick: async () => {
					if (confirm("حذف؟")) {
						await supabase.from(table).delete().eq("id", r.id);
						qc.invalidateQueries({ queryKey: ["admin"] });
						qc.invalidateQueries({ queryKey: ["admin-stats"] });
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
			})]
		}, r.id))]
	});
}
function News() {
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const { data } = useQuery({
		queryKey: ["announcements"],
		queryFn: async () => (await supabase.from("announcements").select("*").order("created_at", { ascending: false })).data ?? []
	});
	async function add() {
		if (!title.trim() || !body.trim()) return;
		const { error } = await supabase.from("announcements").insert({
			title: title.trim(),
			body: body.trim()
		});
		if (error) {
			toast.error("تعذر النشر");
			return;
		}
		setTitle("");
		setBody("");
		qc.invalidateQueries({ queryKey: ["announcements"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "العنوان",
					value: title,
					onChange: (e) => setTitle(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					placeholder: "نص الإعلان",
					value: body,
					onChange: (e) => setBody(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: add,
					children: "نشر"
				})
			]
		}), data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "flex justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-bold",
				children: a.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-sm text-muted-foreground",
				children: a.body
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				onClick: async () => {
					await supabase.from("announcements").delete().eq("id", a.id);
					qc.invalidateQueries({ queryKey: ["announcements"] });
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
			})]
		}, a.id))]
	});
}
//#endregion
export { Admin as component };
