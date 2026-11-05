import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { a as KeyRound, i as ShieldCheck, r as Sparkles, t as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DmOFH1-h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: KeyRound,
		t: "دخول بكود",
		d: "الطالب يدخل بكود فريد من غير إيميل ولا باسورد."
	},
	{
		icon: ShieldCheck,
		t: "مضاد للغش",
		d: "مراقبة التاب والتركيز والشاشة الكاملة، وسجل لكل مخالفة."
	},
	{
		icon: Sparkles,
		t: "تصحيح تلقائي",
		d: "ستة أنواع أسئلة تتصحح فوراً، والمقالي يدوياً بنسبة."
	},
	{
		icon: Users,
		t: "مجموعات",
		d: "قسّم طلابك لفصول أو سناتر ووزّع الامتحانات عليهم."
	}
];
function Index() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/home",
				replace: true
			});
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background bg-hero",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-2xl text-primary",
				children: "اختبرني"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					children: "دخول المدرسين"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-6 pb-24 pt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 inline-block rounded-full bg-accent px-4 py-1 text-sm text-accent-foreground",
						children: "للمدرس الخاص ومدرسي السناتر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-5xl leading-tight text-foreground md:text-7xl",
						children: [
							"امتحن طلابك أونلاين،",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "من غير حسابات ولا غش."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg text-muted-foreground",
						children: "ابنِ الامتحان في دقائق، وزّعه على مجموعاتك، وخلي الطالب يدخل بكوده ويمتحن والتصحيح يحصل لوحده."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/student",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "h-14 px-10 text-lg",
								children: "أنا طالب — ادخل بالكود"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "h-14 px-10 text-lg",
								children: "أنا مدرس"
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "mb-4 h-7 w-7 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: f.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: f.d
						})
					]
				}, f.t))
			})]
		})]
	});
}
//#endregion
export { Index as component };
