import { n as __toESM } from "../_runtime.mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { i as TEMPLATES, o as subjectThemeVars } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as ArrowDown, s as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as Route } from "./student-exam._id-98WGGAev.mjs";
import { a as studentGetExam, c as studentSubmit, n as getStudentSession } from "./student-session-Xu6MQh3T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-exam._id-B7PZ9qcW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamScreen() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)(null);
	const [exam, setExam] = (0, import_react.useState)(null);
	const [started, setStarted] = (0, import_react.useState)(false);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [log, setLog] = (0, import_react.useState)([]);
	const [deadline, setDeadline] = (0, import_react.useState)(0);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	const [page, setPage] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submitted = (0, import_react.useRef)(false);
	const key = code ? `ekh_draft_${code}_${id}` : "";
	(0, import_react.useEffect)(() => {
		const s = getStudentSession();
		if (!s) {
			navigate({ to: "/student" });
			return;
		}
		setCode(s.code);
		studentGetExam({ data: {
			code: s.code,
			examId: id
		} }).then((e) => {
			setExam(e);
			const raw = localStorage.getItem(`ekh_draft_${s.code}_${id}`);
			if (raw) {
				const d = JSON.parse(raw);
				setAnswers(d.answers);
				setLog(d.log);
				setDeadline(d.deadline);
				setStarted(true);
			}
		}).catch((err) => {
			toast.error(err instanceof Error ? err.message : "خطأ");
			navigate({ to: "/student" });
		});
	}, [id, navigate]);
	(0, import_react.useEffect)(() => {
		if (started && key && !submitted.current) localStorage.setItem(key, JSON.stringify({
			answers,
			log,
			deadline
		}));
	}, [
		answers,
		log,
		deadline,
		started,
		key
	]);
	const submit = (0, import_react.useCallback)(async (forceZero = false) => {
		if (!exam || !code || submitted.current) return;
		submitted.current = true;
		setBusy(true);
		try {
			await studentSubmit({ data: {
				code,
				examId: exam.id,
				answers,
				cheatLog: log,
				forceZero
			} });
			localStorage.removeItem(key);
			if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
			toast.success(forceZero ? "تم التسليم تلقائياً بسبب المخالفات" : "تم التسليم بنجاح");
			navigate({ to: "/student" });
		} catch (err) {
			submitted.current = false;
			toast.error(err instanceof Error ? err.message : "تعذر التسليم");
		} finally {
			setBusy(false);
		}
	}, [
		exam,
		code,
		answers,
		log,
		key,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		const t = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(t);
	}, [started]);
	(0, import_react.useEffect)(() => {
		if (started && deadline && now >= deadline) submit(false);
	}, [
		now,
		deadline,
		started,
		submit
	]);
	const lastV = (0, import_react.useRef)(0);
	const addViolation = (0, import_react.useCallback)((type) => {
		if (submitted.current) return;
		const t = Date.now();
		if (t - lastV.current < 3e3) return;
		lastV.current = t;
		setLog((l) => [...l, {
			type,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}]);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		const isMobile = matchMedia("(pointer: coarse)").matches;
		let blurTimer;
		const onVis = () => {
			if (document.hidden) addViolation("تغيير التاب");
		};
		const onBlur = () => {
			const el = document.activeElement;
			if (isMobile && el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
			blurTimer = setTimeout(() => {
				if (!document.hasFocus() && !document.hidden) addViolation("فقدان التركيز");
			}, 1500);
		};
		const onFocus = () => clearTimeout(blurTimer);
		const onFs = () => {
			if (!document.fullscreenElement && !isMobile) addViolation("الخروج من ملء الشاشة");
		};
		document.addEventListener("visibilitychange", onVis);
		window.addEventListener("blur", onBlur);
		window.addEventListener("focus", onFocus);
		document.addEventListener("fullscreenchange", onFs);
		return () => {
			clearTimeout(blurTimer);
			document.removeEventListener("visibilitychange", onVis);
			window.removeEventListener("blur", onBlur);
			window.removeEventListener("focus", onFocus);
			document.removeEventListener("fullscreenchange", onFs);
		};
	}, [started, addViolation]);
	(0, import_react.useEffect)(() => {
		if (!exam || !started || !log.length) return;
		if (log.length >= exam.max_violations) submit(true);
		else toast.warning(`تحذير ${log.length} من ${exam.max_violations}: ${log[log.length - 1].type}`);
	}, [log.length]);
	if (!exam) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	const theme = subjectThemeVars(exam.subject);
	if (!started) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: theme,
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-3xl border bg-card p-8 text-center shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-primary",
					children: exam.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-muted-foreground",
					children: [
						exam.questions.length,
						" سؤال · ",
						exam.duration_min,
						" دقيقة"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-1 text-right text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• الامتحان هيفتح في ملء الشاشة." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• تغيير التاب أو الخروج من الشاشة بيتسجل مخالفة." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"• بعد ",
							exam.max_violations,
							" مخالفات بيتسلم الامتحان بدرجة صفر."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• إجاباتك بتتحفظ تلقائياً، والوقت مش بيتصفر لو عملت refresh." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					onClick: () => {
						document.documentElement.requestFullscreen?.().catch(() => {});
						setDeadline(Date.now() + exam.duration_min * 6e4);
						setStarted(true);
					},
					children: "ابدأ الامتحان"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/student",
					className: "mt-3 inline-block text-sm text-muted-foreground underline",
					children: "رجوع"
				})
			]
		})
	});
	const left = Math.max(0, deadline - now);
	const mm = String(Math.floor(left / 6e4)).padStart(2, "0");
	const ss = String(Math.floor(left % 6e4 / 1e3)).padStart(2, "0");
	const tpl = TEMPLATES.find((t) => t.key === exam.template) ?? TEMPLATES[0];
	const set = (qid, v) => setAnswers((a) => ({
		...a,
		[qid]: v
	}));
	const shown = tpl.paged ? [exam.questions[page]].filter(Boolean) : exam.questions;
	const answered = exam.questions.filter((q) => answers[q.id] !== void 0 && answers[q.id] !== "").length;
	const card = {
		classic: "border-b pb-6",
		single: "rounded-2xl border bg-card p-6 shadow-soft",
		cards: "rounded-3xl border-2 border-primary/20 bg-card p-6 shadow-soft",
		focus: "rounded-3xl bg-card p-10 text-lg shadow-soft",
		compact: "rounded-lg border bg-card p-3 text-sm",
		notebook: "rounded-md border-r-4 border-primary bg-card p-5"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: theme,
		className: "min-h-screen select-none bg-background",
		onCopy: (e) => e.preventDefault(),
		onContextMenu: (e) => e.preventDefault(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-10 border-b bg-card/90 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-bold",
					children: exam.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								answered,
								"/",
								exam.questions.length
							]
						}),
						log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-destructive/10 px-2 py-1 text-destructive",
							children: [
								"مخالفات ",
								log.length,
								"/",
								exam.max_violations
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-mono text-lg ${left < 6e4 ? "text-destructive" : "text-primary"}`,
							dir: "ltr",
							children: [
								mm,
								":",
								ss
							]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: `mx-auto max-w-3xl px-4 py-6 ${tpl.key === "compact" ? "space-y-2" : "space-y-6"}`,
			children: [shown.map((q) => {
				const idx = exam.questions.indexOf(q);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: card[tpl.key],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-bold",
								children: [
									idx + 1,
									". ",
									q.text
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: [q.points, " درجة"]
							})]
						}),
						q.media && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: q.media,
							alt: "",
							className: "mb-3 max-h-64 rounded-lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionInput, {
							q,
							value: answers[q.id],
							onChange: (v) => set(q.id, v)
						})
					]
				}, q.id);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between gap-2",
				children: tpl.paged ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: page === 0,
					onClick: () => setPage(page - 1),
					children: "السابق"
				}), page < exam.questions.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setPage(page + 1),
					children: "التالي"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					onClick: () => confirm("تسليم الامتحان؟") && submit(false),
					children: "تسليم"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: busy,
					onClick: () => confirm("تسليم الامتحان؟") && submit(false),
					children: "تسليم الامتحان"
				})
			})]
		})]
	});
}
function QuestionInput({ q, value, onChange }) {
	if (q.type === "mcq") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2",
		children: (q.options ?? []).map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(i),
			className: `rounded-xl border px-4 py-3 text-right transition ${value === i ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted"}`,
			children: o
		}, i))
	});
	if (q.type === "tf") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2",
		children: [true, false].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(b),
			className: `flex-1 rounded-xl border py-3 ${value === b ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted"}`,
			children: b ? "صح" : "خطأ"
		}, String(b)))
	});
	if (q.type === "fill") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value: String(value ?? ""),
		onChange: (e) => onChange(e.target.value),
		placeholder: "اكتب إجابتك"
	});
	if (q.type === "essay") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		rows: 5,
		value: String(value ?? ""),
		onChange: (e) => onChange(e.target.value),
		placeholder: "اكتب إجابتك"
	});
	if (q.type === "match") {
		const v = value ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: (q.lefts ?? []).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: l
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "flex-1 rounded-md border bg-background px-2 py-2",
					value: v[i] ?? "",
					onChange: (e) => onChange({
						...v,
						[i]: e.target.value
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "اختر…"
					}), (q.rights ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: r,
						children: r
					}, r))]
				})]
			}, i))
		});
	}
	if (q.type === "order") {
		const list = Array.isArray(value) ? value : q.items ?? [];
		const move = (i, d) => {
			const r = [...list];
			const j = i + d;
			if (j < 0 || j >= r.length) return;
			[r[i], r[j]] = [r[j], r[i]];
			onChange(r);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-2",
			children: list.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 rounded-lg border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-6 text-muted-foreground",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: it
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						onClick: () => move(i, -1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						onClick: () => move(i, 1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {})
					})
				]
			}, it))
		});
	}
	return null;
}
//#endregion
export { ExamScreen as component };
