import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Eu7Uez6u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [authError, setAuthError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const p = new URLSearchParams(window.location.search);
		const err = p.get("error_description") || p.get("error");
		if (err) setAuthError(err);
	}, []);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/home",
				replace: true
			});
		});
		const { data } = supabase.auth.onAuthStateChange((event, s) => {
			if (event === "SIGNED_IN" && s) navigate({
				to: "/home",
				replace: true
			});
		});
		return () => data.subscription.unsubscribe();
	}, [navigate]);
	async function google() {
		setBusy(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin + "/auth" }
		});
		if (error) {
			toast.error("تعذر تسجيل الدخول");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background bg-hero px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-3xl border bg-card p-8 text-center shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-3xl text-primary",
					children: "اختبرني"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "دخول المدرسين وإدارة المنصة"
				}),
				authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
					children: authError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: google,
					disabled: busy,
					size: "lg",
					className: "mt-8 w-full",
					children: "الدخول بحساب جوجل"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/student",
					className: "mt-6 block text-sm text-muted-foreground underline",
					children: "طالب؟ ادخل بالكود"
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
