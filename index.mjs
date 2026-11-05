globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-11-05T00:49:59.682Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-05T00:50:02.537Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-B-wv8on9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1680-kHYLKhT2sj6FrksFfEnydZew1RQ\"",
		"mtime": "2026-11-05T07:32:39.778Z",
		"size": 5760,
		"path": "../public/assets/admin-B-wv8on9.js"
	},
	"/assets/AppShell-BT7l3_2r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"445-KGuLlFAqO9vY2n8Bjb2J+eNfV8U\"",
		"mtime": "2026-11-05T07:32:39.775Z",
		"size": 1093,
		"path": "../public/assets/AppShell-BT7l3_2r.js"
	},
	"/assets/arrow-up-COoyJhc1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-wkLltx/XJeK/2RxyZ6qF7cKLnOc\"",
		"mtime": "2026-11-05T07:32:39.780Z",
		"size": 274,
		"path": "../public/assets/arrow-up-COoyJhc1.js"
	},
	"/assets/auth-l7Bm-LA7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"685-jlyo049TyDEpCPHaoVclW4qrFec\"",
		"mtime": "2026-11-05T07:32:39.782Z",
		"size": 1669,
		"path": "../public/assets/auth-l7Bm-LA7.js"
	},
	"/assets/button-GBQeo1BE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f56-1cb29L7UxjWv2BVXC59kymm3fT8\"",
		"mtime": "2026-11-05T07:32:39.786Z",
		"size": 32598,
		"path": "../public/assets/button-GBQeo1BE.js"
	},
	"/assets/createLucideIcon-B5p0fGsA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a9-A1MbwboVnKjo8Epzh2xpdexrakQ\"",
		"mtime": "2026-11-05T07:32:39.793Z",
		"size": 1193,
		"path": "../public/assets/createLucideIcon-B5p0fGsA.js"
	},
	"/assets/createServerFn-D0r7stTu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116d-V9OhRKSELPPOI3ySlRqfEsM4atw\"",
		"mtime": "2026-11-05T07:32:39.795Z",
		"size": 4461,
		"path": "../public/assets/createServerFn-D0r7stTu.js"
	},
	"/assets/dashboard-ySRBLXgP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ee3-6X5cwQ797bgi11FLlIDXviBIBz8\"",
		"mtime": "2026-11-05T07:32:39.797Z",
		"size": 12003,
		"path": "../public/assets/dashboard-ySRBLXgP.js"
	},
	"/assets/dist-1Se_AEcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b3-un8GijwGGRoHa+L7FGTw/eYQv08\"",
		"mtime": "2026-11-05T07:32:39.813Z",
		"size": 691,
		"path": "../public/assets/dist-1Se_AEcU.js"
	},
	"/assets/exam._id-DSjnz4vA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23cb-i7uwu/ZhBbGmLm5yfNnqvoAgUmc\"",
		"mtime": "2026-11-05T07:32:39.815Z",
		"size": 9163,
		"path": "../public/assets/exam._id-DSjnz4vA.js"
	},
	"/assets/home-BSS1Mq_D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d6-uDqRZjWETtz4+MhMqc3pa0Dvxn8\"",
		"mtime": "2026-11-05T07:32:39.819Z",
		"size": 1494,
		"path": "../public/assets/home-BSS1Mq_D.js"
	},
	"/assets/input-C6ZUbX5F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-tEhHxgfhFCnyJjwNBGVN+FHmOQ8\"",
		"mtime": "2026-11-05T07:32:39.827Z",
		"size": 620,
		"path": "../public/assets/input-C6ZUbX5F.js"
	},
	"/assets/invariant-CgFvOqN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-OtvVxjJzKVqOT1XQL6Tnz3B8fGk\"",
		"mtime": "2026-11-05T07:32:39.828Z",
		"size": 450,
		"path": "../public/assets/invariant-CgFvOqN2.js"
	},
	"/assets/link-CZPTQ3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2420-LnUTBJDSlOYmi9Mr1hH/A5E45gc\"",
		"mtime": "2026-11-05T07:32:39.832Z",
		"size": 9248,
		"path": "../public/assets/link-CZPTQ3wR.js"
	},
	"/assets/matchContext--Uy-Fytd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-6wRTEfMblYMw0p/0u1+qjZ9geK8\"",
		"mtime": "2026-11-05T07:32:39.834Z",
		"size": 160,
		"path": "../public/assets/matchContext--Uy-Fytd.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-11-05T07:32:39.837Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/onboarding-DYPmaczX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9b-innfl6tQ1O/+l1T6ufN+voySf/k\"",
		"mtime": "2026-11-05T07:32:39.842Z",
		"size": 2715,
		"path": "../public/assets/onboarding-DYPmaczX.js"
	},
	"/assets/results._id-DrvQw_d1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd8-RaNiowqgP/P8pj1UU1TxSzmbfeg\"",
		"mtime": "2026-11-05T07:32:39.843Z",
		"size": 4056,
		"path": "../public/assets/results._id-DrvQw_d1.js"
	},
	"/assets/route-NfZWq0Lo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-WXFGvJyUvPtsRZTxVx51puCFhA0\"",
		"mtime": "2026-11-05T07:32:39.847Z",
		"size": 139,
		"path": "../public/assets/route-NfZWq0Lo.js"
	},
	"/assets/routes-CMECHKbO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1001-lQ2qUKmMq5XJHqLUCHvfVOLBETI\"",
		"mtime": "2026-11-05T07:32:39.849Z",
		"size": 4097,
		"path": "../public/assets/routes-CMECHKbO.js"
	},
	"/assets/scoring-Jee3QibJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-1yM0SagQOZA0BG8CHCKq/EURR/8\"",
		"mtime": "2026-11-05T07:32:39.851Z",
		"size": 377,
		"path": "../public/assets/scoring-Jee3QibJ.js"
	},
	"/assets/student-BmKrTPuz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125d-DM9IzwcwcK8arOaHmqgjvzPSHyw\"",
		"mtime": "2026-11-05T07:32:39.853Z",
		"size": 4701,
		"path": "../public/assets/student-BmKrTPuz.js"
	},
	"/assets/index-6p4rSCdx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"955e6-wwXTNQYkpQBUM+MrzlB0NJnE7GA\"",
		"mtime": "2026-11-05T07:32:39.771Z",
		"size": 611814,
		"path": "../public/assets/index-6p4rSCdx.js"
	},
	"/assets/student-exam._id-DZcBYQDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2402-6tkvD/NSuSAZZsymAj8E1Q3R0WI\"",
		"mtime": "2026-11-05T07:32:39.859Z",
		"size": 9218,
		"path": "../public/assets/student-exam._id-DZcBYQDQ.js"
	},
	"/assets/student-session-C8RN7hj9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ee-EnPJ6ifUy1pm/m1BWuaMbIqKyKw\"",
		"mtime": "2026-11-05T07:32:39.862Z",
		"size": 1006,
		"path": "../public/assets/student-session-C8RN7hj9.js"
	},
	"/assets/subjects-CQNEk1fW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d7-GBCrnqE4XLq/L7/J50m/CNWiLvU\"",
		"mtime": "2026-11-05T07:32:39.896Z",
		"size": 1495,
		"path": "../public/assets/subjects-CQNEk1fW.js"
	},
	"/assets/tabs-CAM080pX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e5a-rl1bINV6knVj+SJ7llc+4w1rhZo\"",
		"mtime": "2026-11-05T07:32:39.900Z",
		"size": 24154,
		"path": "../public/assets/tabs-CAM080pX.js"
	},
	"/assets/textarea-TqYIol9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"206-b28/RFZ0EqAuLziboqUNbYuohOg\"",
		"mtime": "2026-11-05T07:32:39.908Z",
		"size": 518,
		"path": "../public/assets/textarea-TqYIol9C.js"
	},
	"/assets/trash-2-BMsqV_8A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-MGkEeK0yLWAoKPV5347rfAFHljo\"",
		"mtime": "2026-11-05T07:32:39.910Z",
		"size": 328,
		"path": "../public/assets/trash-2-BMsqV_8A.js"
	},
	"/assets/styles-DCFeY1YZ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13265-ROdJqgRIyJOI8Ecvy9qlrh4l/rY\"",
		"mtime": "2026-11-05T07:32:39.927Z",
		"size": 78437,
		"path": "../public/assets/styles-DCFeY1YZ.css"
	},
	"/assets/use-me-C9XXt_WJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21ce-XFitX+by28m6ACXOiPqtIrWwizI\"",
		"mtime": "2026-11-05T07:32:39.915Z",
		"size": 8654,
		"path": "../public/assets/use-me-C9XXt_WJ.js"
	},
	"/assets/useRouter-DiyoLFw0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2286-t327OUn6dGIpxzl2eVAj3P567Vs\"",
		"mtime": "2026-11-05T07:32:39.917Z",
		"size": 8838,
		"path": "../public/assets/useRouter-DiyoLFw0.js"
	},
	"/assets/useSelector-3hiBiQZM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"832-aNiJ/fXQGIrZDGo028kNveweZNo\"",
		"mtime": "2026-11-05T07:32:39.919Z",
		"size": 2098,
		"path": "../public/assets/useSelector-3hiBiQZM.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_08rxd2 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_08rxd2
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
