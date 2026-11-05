import { n as __toESM } from "../_runtime.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { n as Panel } from "./AppShell-Sz6-wnEv.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { a as subjectInfo, o as subjectThemeVars } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as gradeLabel } from "./scoring-DuX3rD9W.mjs";
import { i as studentExams, n as getStudentSession, o as studentLogin, r as setStudentSession, s as studentResults, t as clearStudentSession } from "./student-session-Xu6MQh3T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-DZ9Jdtqk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentPage() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSession(getStudentSession());
		setReady(true);
	}, []);
	if (!ready) return null;
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Login, { onLogin: setSession });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		s: session,
		onLogout: () => {
			clearStudentSession();
			setSession(null);
		}
	});
}
function Login({ onLogin }) {
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function go(e) {
		e.preventDefault();
		if (!code.trim()) return;
		setBusy(true);
		try {
			setStudentSession(await studentLogin({ data: { code } }));
			onLogin(getStudentSession());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "حدث خطأ");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background bg-hero px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: go,
			className: "w-full max-w-sm rounded-3xl border bg-card p-8 text-center shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-3xl text-primary",
					children: "اختبرني"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "اكتب الكود اللي إداك المدرس"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					dir: "ltr",
					className: "mt-6 text-center font-mono text-xl tracking-widest",
					value: code,
					onChange: (e) => setCode(e.target.value.toUpperCase()),
					placeholder: "ABC123",
					maxLength: 20
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					disabled: busy,
					children: busy ? "جارٍ الدخول…" : "دخول"
				})
			]
		})
	});
}
function Portal({ s, onLogout }) {
	const [tab, setTab] = (0, import_react.useState)("exams");
	const exams = useQuery({
		queryKey: ["st-exams", s.code],
		queryFn: () => studentExams({ data: { code: s.code } })
	});
	const results = useQuery({
		queryKey: ["st-results", s.code],
		queryFn: () => studentResults({ data: { code: s.code } }),
		enabled: tab === "results"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		style: subjectThemeVars(s.subject),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b bg-card/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-4xl items-center justify-between px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-2xl text-primary",
					children: ["أهلاً ", s.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: [
						s.groupName,
						" · ",
						subjectInfo(s.subject).label
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: onLogout,
					children: "خروج"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-4xl space-y-5 px-6 py-8",
			children: [
				s.welcome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "bg-accent text-accent-foreground",
					children: s.welcome
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: tab === "exams" ? "default" : "outline",
						onClick: () => setTab("exams"),
						children: "الامتحانات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: tab === "results" ? "default" : "outline",
						onClick: () => setTab("results"),
						children: "نتايجي"
					})]
				}),
				tab === "exams" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [
						exams.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "جارٍ التحميل…"
						}),
						exams.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							className: "text-muted-foreground",
							children: "مفيش امتحانات متاحة دلوقتي."
						}),
						exams.data?.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: [
									e.count,
									" سؤال · ",
									e.duration_min,
									" دقيقة",
									e.attempts ? ` · ${e.attempts} محاولة سابقة` : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/student-exam/$id",
								params: { id: e.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "ابدأ" })
							})]
						}, e.id))
					]
				}),
				tab === "results" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [results.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						className: "text-muted-foreground",
						children: "لسه مفيش نتايج."
					}), results.data?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground",
							children: [
								"محاولة ",
								r.attempt_num,
								" · ",
								new Date(r.submitted_at).toLocaleString("ar-EG")
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-left",
							children: r.final_score === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "قيد التصحيح"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-xl",
								children: [
									r.final_score,
									" / ",
									r.max_score
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: r.forced_zero ? "صفر بسبب الغش" : gradeLabel(r.max_score ? Number(r.final_score) / r.max_score * 100 : 0)
							})] })
						})]
					}, r.id))]
				})
			]
		})]
	});
}
//#endregion
export { StudentPage as component };
