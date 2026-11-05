import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { n as Panel, t as AppShell } from "./AppShell-Sz6-wnEv.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as gradeLabel, t as finalScore } from "./scoring-DuX3rD9W.mjs";
import { t as Route } from "./results._id-DPiEkOWI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results._id-BLowN5yA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Results() {
	const { id } = Route.useParams();
	const { data } = useQuery({
		queryKey: ["results", id],
		queryFn: async () => {
			const { data: exam } = await supabase.from("exams").select("id,title,questions,teacher_id").eq("id", id).single();
			const [{ data: subs }, { data: students }] = await Promise.all([supabase.from("submissions").select("*").eq("exam_id", id).order("submitted_at", { ascending: false }), supabase.from("students").select("id,name").eq("teacher_id", exam.teacher_id)]);
			const names = Object.fromEntries((students ?? []).map((s) => [s.id, s.name]));
			return {
				exam,
				subs: subs ?? [],
				names
			};
		}
	});
	if (!data) return null;
	const questions = data.exam.questions;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: `نتائج: ${data.exam.title}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/exam/$id",
			params: { id },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				children: "تعديل الامتحان"
			})
		}),
		children: [data.subs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "text-center text-muted-foreground",
			children: "لسه مفيش تسليمات."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: data.subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubRow, {
				sub: s,
				name: data.names[s.student_id] ?? "طالب محذوف",
				questions,
				examId: id
			}, s.id))
		})]
	});
}
function SubRow({ sub, name, questions, examId }) {
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [grades, setGrades] = (0, import_react.useState)(sub.essay_grades ?? {});
	const answers = sub.answers ?? {};
	const log = Array.isArray(sub.cheat_log) ? sub.cheat_log : [];
	const essays = questions.filter((q) => q.type === "essay");
	async function saveGrades() {
		const final = finalScore(questions, Number(sub.auto_score), grades, sub.forced_zero);
		const { error } = await supabase.from("submissions").update({
			essay_grades: grades,
			final_score: final,
			has_pending_essay: final === null
		}).eq("id", sub.id);
		if (error) toast.error("تعذر الحفظ");
		else {
			toast.success("تم حفظ التصحيح");
			qc.invalidateQueries({ queryKey: ["results", examId] });
		}
	}
	const pct = sub.final_score !== null && sub.max_score ? Number(sub.final_score) / sub.max_score * 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "flex w-full items-center justify-between text-right",
		onClick: () => setOpen(!open),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-bold",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-muted-foreground",
			children: [
				"محاولة ",
				sub.attempt_num,
				" · ",
				new Date(sub.submitted_at).toLocaleString("ar-EG"),
				log.length ? ` · ${log.length} مخالفة` : ""
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-left",
			children: sub.final_score === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-warning",
				children: "قيد التصحيح"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-xl",
				children: [
					sub.final_score,
					" / ",
					sub.max_score
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: sub.forced_zero ? "صفر — غش" : pct !== null ? gradeLabel(pct) : ""
			})] })
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-4 border-t pt-4",
		children: [
			essays.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold",
						children: [
							q.text,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									"(",
									q.points,
									" درجة)"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm",
						children: String(answers[q.id] ?? "— بدون إجابة —")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 100,
							className: "w-24",
							value: grades[q.id] ?? "",
							onChange: (e) => setGrades({
								...grades,
								[q.id]: Number(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "%"
						})]
					})
				]
			}, q.id)),
			essays.length > 0 && !sub.forced_zero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: saveGrades,
				children: "حفظ التصحيح"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 text-sm font-bold",
				children: "سجل الغش"
			}), log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "لا توجد مخالفات."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm",
				children: log.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"• ",
					l.type,
					" — ",
					new Date(l.at).toLocaleTimeString("ar-EG")
				] }, i))
			})] })
		]
	})] });
}
//#endregion
export { Results as component };
