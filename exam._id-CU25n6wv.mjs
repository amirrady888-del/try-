import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { n as Panel, t as AppShell } from "./AppShell-Sz6-wnEv.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { i as TEMPLATES, n as STATUS_LABELS, t as QTYPE_LABELS } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as ArrowDown, n as Trash2, s as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as Route } from "./exam._id-CoALHSIr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exam._id-CU25n6wv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sel = "w-full rounded-md border bg-background px-3 py-2 text-sm";
function blank(type) {
	const base = {
		id: crypto.randomUUID().slice(0, 8),
		type,
		text: "",
		points: 1
	};
	if (type === "mcq") return {
		...base,
		options: [
			"",
			"",
			"",
			""
		],
		correct: 0
	};
	if (type === "tf") return {
		...base,
		correct: true
	};
	if (type === "fill") return {
		...base,
		correct: ""
	};
	if (type === "match") return {
		...base,
		pairs: [{
			left: "",
			right: ""
		}, {
			left: "",
			right: ""
		}]
	};
	if (type === "order") return {
		...base,
		items: [
			"",
			"",
			""
		]
	};
	return base;
}
function Builder() {
	const { id } = Route.useParams();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["exam", id],
		queryFn: async () => {
			const { data: exam } = await supabase.from("exams").select("*").eq("id", id).single();
			const [{ data: groups }, { data: links }] = await Promise.all([supabase.from("groups").select("id,name").eq("teacher_id", exam.teacher_id), supabase.from("exam_groups").select("group_id").eq("exam_id", id)]);
			return {
				exam,
				groups: groups ?? [],
				linked: (links ?? []).map((l) => l.group_id)
			};
		}
	});
	const [f, setF] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data && !f) setF({
			title: data.exam.title,
			template: data.exam.template,
			duration_min: data.exam.duration_min,
			max_violations: data.exam.max_violations,
			status: data.exam.status,
			scheduled_at: data.exam.scheduled_at ? data.exam.scheduled_at.slice(0, 16) : "",
			questions: data.exam.questions,
			linked: data.linked
		});
	}, [data, f]);
	if (!data || !f) return null;
	const setQ = (i, patch) => setF({
		...f,
		questions: f.questions.map((q, j) => j === i ? {
			...q,
			...patch
		} : q)
	});
	const moveQ = (i, d) => {
		const qs = [...f.questions];
		const j = i + d;
		if (j < 0 || j >= qs.length) return;
		[qs[i], qs[j]] = [qs[j], qs[i]];
		setF({
			...f,
			questions: qs
		});
	};
	async function save() {
		if (!f) return;
		if (f.status === "active" && !f.linked.length) {
			toast.error("اختار مجموعة واحدة على الأقل قبل التفعيل");
			return;
		}
		setSaving(true);
		const { error } = await supabase.from("exams").update({
			title: f.title.trim() || "امتحان",
			template: f.template,
			duration_min: Math.max(1, f.duration_min),
			max_violations: Math.max(1, f.max_violations),
			status: f.status,
			scheduled_at: f.scheduled_at ? new Date(f.scheduled_at).toISOString() : null,
			questions: f.questions
		}).eq("id", id);
		if (!error) {
			await supabase.from("exam_groups").delete().eq("exam_id", id);
			if (f.linked.length) await supabase.from("exam_groups").insert(f.linked.map((g) => ({
				exam_id: id,
				group_id: g
			})));
		}
		setSaving(false);
		if (error) toast.error("تعذر الحفظ");
		else {
			toast.success("تم الحفظ");
			qc.invalidateQueries({ queryKey: ["exams"] });
		}
	}
	async function del() {
		if (!confirm("حذف الامتحان نهائياً؟")) return;
		await supabase.from("exams").delete().eq("id", id);
		qc.invalidateQueries({ queryKey: ["exams"] });
		history.back();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "منشئ الامتحان",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/results/$id",
			params: { id },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				children: "النتائج"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "العنوان"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: f.title,
								onChange: (e) => setF({
									...f,
									title: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "قالب العرض"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: sel,
								value: f.template,
								onChange: (e) => setF({
									...f,
									template: e.target.value
								}),
								children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t.key,
									children: t.label
								}, t.key))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "الحالة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: sel,
								value: f.status,
								onChange: (e) => setF({
									...f,
									status: e.target.value
								}),
								children: [
									"draft",
									"scheduled",
									"active",
									"closed"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: STATUS_LABELS[s]
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "المدة (دقيقة)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								value: f.duration_min,
								onChange: (e) => setF({
									...f,
									duration_min: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "أقصى عدد مخالفات"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								value: f.max_violations,
								onChange: (e) => setF({
									...f,
									max_violations: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "موعد الجدولة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "datetime-local",
								value: f.scheduled_at,
								onChange: (e) => setF({
									...f,
									scheduled_at: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 text-sm",
								children: "المجموعات"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [data.groups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "اعمل مجموعة الأول من لوحة التحكم."
								}), data.groups.map((g) => {
									const on = f.linked.includes(g.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setF({
											...f,
											linked: on ? f.linked.filter((x) => x !== g.id) : [...f.linked, g.id]
										}),
										className: `rounded-full border px-3 py-1 text-sm ${on ? "border-primary bg-primary text-primary-foreground" : ""}`,
										children: g.name
									}, g.id);
								})]
							})]
						})
					]
				}),
				f.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: [
									i + 1,
									". ",
									QTYPE_LABELS[q.type]
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										className: "w-20",
										value: q.points,
										onChange: (e) => setQ(i, { points: Number(e.target.value) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "درجة"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => moveQ(i, -1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => moveQ(i, 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => setF({
											...f,
											questions: f.questions.filter((_, j) => j !== i)
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "نص السؤال",
							value: q.text,
							onChange: (e) => setQ(i, { text: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							dir: "ltr",
							placeholder: "رابط صورة (اختياري)",
							value: q.media ?? "",
							onChange: (e) => setQ(i, { media: e.target.value })
						}),
						q.type === "mcq" && (q.options ?? []).map((o, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								checked: q.correct === k,
								onChange: () => setQ(i, { correct: k })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: `الاختيار ${k + 1}`,
								value: o,
								onChange: (e) => setQ(i, { options: q.options.map((x, m) => m === k ? e.target.value : x) })
							})]
						}, k)),
						q.type === "tf" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: [true, false].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: q.correct === b ? "default" : "outline",
								onClick: () => setQ(i, { correct: b }),
								children: b ? "صح" : "خطأ"
							}, String(b)))
						}),
						q.type === "fill" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "الإجابات المقبولة مفصولة بـ |",
							value: String(q.correct ?? ""),
							onChange: (e) => setQ(i, { correct: e.target.value })
						}),
						q.type === "essay" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "بيتصحح يدوياً من صفحة النتائج."
						}),
						q.type === "match" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [(q.pairs ?? []).map((p, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "العمود الأول",
										value: p.left,
										onChange: (e) => setQ(i, { pairs: q.pairs.map((x, m) => m === k ? {
											...x,
											left: e.target.value
										} : x) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "ما يقابله",
										value: p.right,
										onChange: (e) => setQ(i, { pairs: q.pairs.map((x, m) => m === k ? {
											...x,
											right: e.target.value
										} : x) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => setQ(i, { pairs: q.pairs.filter((_, m) => m !== k) }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})
								]
							}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setQ(i, { pairs: [...q.pairs ?? [], {
									left: "",
									right: ""
								}] }),
								children: "+ زوج"
							})]
						}),
						q.type === "order" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "اكتب العناصر بالترتيب الصحيح، وهتتلخبط للطالب."
								}),
								(q.items ?? []).map((it, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: `العنصر ${k + 1}`,
										value: it,
										onChange: (e) => setQ(i, { items: q.items.map((x, m) => m === k ? e.target.value : x) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => setQ(i, { items: q.items.filter((_, m) => m !== k) }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})]
								}, k)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setQ(i, { items: [...q.items ?? [], ""] }),
									children: "+ عنصر"
								})
							]
						})
					]
				}, q.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "self-center text-sm text-muted-foreground",
						children: "إضافة سؤال:"
					}), Object.keys(QTYPE_LABELS).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setF({
							...f,
							questions: [...f.questions, blank(t)]
						}),
						children: QTYPE_LABELS[t]
					}, t))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky bottom-4 flex justify-between gap-2 rounded-2xl border bg-card p-3 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: del,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " حذف"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						disabled: saving,
						children: saving ? "جارٍ الحفظ…" : "حفظ الامتحان"
					})]
				})
			]
		})
	});
}
//#endregion
export { Builder as component };
