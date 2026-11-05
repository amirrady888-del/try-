import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useMe } from "./use-me-yWP5dLXW.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { n as Panel, t as AppShell } from "./AppShell-Sz6-wnEv.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Badge } from "./tabs-C4_NZSXE.mjs";
import { a as subjectInfo, n as STATUS_LABELS } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trash2, o as Copy } from "../_libs/lucide-react.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-C8xRNvLb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function genCode() {
	const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	return Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(6)), (b) => c[b % 32]).join("");
}
function Dashboard() {
	const { data: me, isLoading } = useMe();
	if (isLoading || !me) return null;
	if (!me.teacher || me.teacher.status !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/home",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: `${me.teacher.full_name} · ${subjectInfo(me.teacher.subject).label}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "exams",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "exams",
							children: "الامتحانات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "groups",
							children: "المجموعات والطلاب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "news",
							children: "الإعلانات"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "exams",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exams, { teacherId: me.user.id })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "groups",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Groups, { teacherId: me.user.id })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "news",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(News, {})
				})
			]
		})
	});
}
function Exams({ teacherId }) {
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ["exams", teacherId],
		queryFn: async () => (await supabase.from("exams").select("id,title,status,duration_min,questions,created_at").eq("teacher_id", teacherId).order("created_at", { ascending: false })).data ?? []
	});
	async function create() {
		const { data: e, error } = await supabase.from("exams").insert({
			teacher_id: teacherId,
			title: "امتحان جديد"
		}).select("id").single();
		if (error || !e) {
			toast.error("تعذر الإنشاء");
			return;
		}
		navigate({
			to: "/exam/$id",
			params: { id: e.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "امتحاناتك"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: create,
					children: "+ امتحان جديد"
				})]
			}),
			data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "text-center text-muted-foreground",
				children: "لسه ما عملتش امتحانات."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: data?.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold",
						children: e.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							e.questions.length,
							" سؤال · ",
							e.duration_min,
							" دقيقة"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: e.status === "active" ? "default" : "secondary",
								children: STATUS_LABELS[e.status]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exam/$id",
								params: { id: e.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									children: "تعديل"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/results/$id",
								params: { id: e.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									children: "النتائج"
								})
							})
						]
					})]
				}, e.id))
			})
		]
	});
}
function Groups({ teacherId }) {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [welcome, setWelcome] = (0, import_react.useState)("");
	const { data: groups } = useQuery({
		queryKey: ["groups", teacherId],
		queryFn: async () => (await supabase.from("groups").select("*").eq("teacher_id", teacherId).order("created_at")).data ?? []
	});
	const { data: students } = useQuery({
		queryKey: ["students", teacherId],
		queryFn: async () => (await supabase.from("students").select("*").eq("teacher_id", teacherId).order("created_at")).data ?? []
	});
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["groups", teacherId] });
		qc.invalidateQueries({ queryKey: ["students", teacherId] });
	};
	async function addGroup() {
		if (!name.trim()) return;
		const { error } = await supabase.from("groups").insert({
			teacher_id: teacherId,
			name: name.trim(),
			welcome_message: welcome.trim() || null
		});
		if (error) {
			toast.error("تعذر الإضافة");
			return;
		}
		setName("");
		setWelcome("");
		refresh();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold",
					children: "مجموعة جديدة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "اسم المجموعة (فصل أو سنتر)",
					value: name,
					onChange: (e) => setName(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					placeholder: "رسالة ترحيب (اختياري)",
					value: welcome,
					onChange: (e) => setWelcome(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: addGroup,
					children: "إضافة المجموعة"
				})
			]
		}), groups?.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupCard, {
			group: g,
			teacherId,
			students: (students ?? []).filter((s) => s.group_id === g.id),
			onChange: refresh
		}, g.id))]
	});
}
function GroupCard({ group, teacherId, students, onChange }) {
	const [sname, setSname] = (0, import_react.useState)("");
	async function addStudent() {
		if (!sname.trim()) return;
		for (let i = 0; i < 3; i++) {
			const { error } = await supabase.from("students").insert({
				teacher_id: teacherId,
				group_id: group.id,
				name: sname.trim(),
				code: genCode()
			});
			if (!error) {
				setSname("");
				onChange();
				return;
			}
		}
		toast.error("تعذر إضافة الطالب");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: group.name
			}), group.welcome_message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: group.welcome_message
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: async () => {
					if (confirm("حذف المجموعة وكل طلابها؟")) {
						await supabase.from("groups").delete().eq("id", group.id);
						onChange();
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "اسم الطالب",
				value: sname,
				onChange: (e) => setSname(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && addStudent()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: addStudent,
				children: "إضافة طالب"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y",
			children: [students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: s.active ? "" : "text-muted-foreground line-through",
					children: s.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 rounded-md bg-muted px-2 py-1 font-mono text-sm",
							dir: "ltr",
							onClick: () => {
								navigator.clipboard.writeText(s.code);
								toast.success("تم نسخ الكود");
							},
							children: [
								s.code,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: s.active,
							onCheckedChange: async (v) => {
								await supabase.from("students").update({ active: v }).eq("id", s.id);
								onChange();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: async () => {
								if (confirm("حذف الطالب؟")) {
									await supabase.from("students").delete().eq("id", s.id);
									onChange();
								}
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
						})
					]
				})]
			}, s.id)), students.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-2 text-sm text-muted-foreground",
				children: "لا يوجد طلاب بعد."
			})]
		})
	] });
}
function News() {
	const { data } = useQuery({
		queryKey: ["announcements"],
		queryFn: async () => (await supabase.from("announcements").select("*").order("created_at", { ascending: false })).data ?? []
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "text-muted-foreground",
			children: "لا توجد إعلانات."
		}), data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-bold",
			children: a.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground",
			children: a.body
		})] }, a.id))]
	});
}
//#endregion
export { Dashboard as component };
