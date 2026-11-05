import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-GOtSBnV2.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label$1 } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as SUBJECTS } from "./subjects-DWw0lMqz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./onboarding-DUhTqdzm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-BSM0PIRw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Label$1.displayName;
function Onboarding() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)(user.user_metadata?.["full_name"] ?? "");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("physics");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (!name.trim() || !phone.trim()) {
			toast.error("اكتب الاسم ورقم التليفون");
			return;
		}
		setBusy(true);
		const { error } = await supabase.from("teachers").insert({
			id: user.id,
			email: user.email ?? null,
			full_name: name.trim(),
			phone: phone.trim(),
			subject
		});
		setBusy(false);
		if (error) {
			toast.error("تعذر الحفظ");
			return;
		}
		await qc.invalidateQueries({ queryKey: ["me"] });
		navigate({ to: "/home" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background bg-hero px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-lg space-y-5 rounded-3xl border bg-card p-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "أهلاً بيك في اختبرني"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "عرّفنا بنفسك عشان نفعّل حسابك."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الاسم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 100
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "رقم التليفون" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						dir: "ltr",
						maxLength: 20
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "المادة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSubject(s.key),
							className: `rounded-full border px-4 py-1.5 text-sm transition ${subject === s.key ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`,
							children: s.label
						}, s.key))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full",
					disabled: busy,
					children: "إرسال الطلب"
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
