import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useSignOut, t as useMe } from "./use-me-yWP5dLXW.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-B8jhxvPP.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { data, isLoading } = useMe();
	const signOut = useSignOut();
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (data.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin",
		replace: true
	});
	if (!data.teacher) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/onboarding",
		replace: true
	});
	if (data.teacher.status === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/dashboard",
		replace: true
	});
	const msg = data.teacher.status === "pending" ? {
		t: "طلبك قيد المراجعة",
		d: "هنراجع بياناتك ونفعّل حسابك في أقرب وقت."
	} : data.teacher.status === "rejected" ? {
		t: "تم رفض طلبك",
		d: "تواصل مع إدارة المنصة لمزيد من التفاصيل."
	} : {
		t: "حسابك موقوف",
		d: "تواصل مع إدارة المنصة لإعادة التفعيل."
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background bg-hero px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-3xl border bg-card p-10 text-center shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-6 h-3 w-3 animate-pulse rounded-full bg-warning" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: msg.t
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: msg.d
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-8",
					onClick: signOut,
					children: "خروج"
				})
			]
		})
	});
}
//#endregion
export { Home as component };
