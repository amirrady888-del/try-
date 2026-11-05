import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-DUhTqdzm.js
var $$splitComponentImporter = () => import("./onboarding-BSM0PIRw.mjs");
var Route = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [{ title: "بيانات المدرس — اختبرني" }, {
		name: "description",
		content: "أكمل بياناتك كمدرس"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
