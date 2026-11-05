//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-73PzGM0x.js
var manifest = {
	"37a0a44ae327c8a7aea87ac8ead019c083394371cce9f6704ac8150e5cb2f9b5": {
		functionName: "studentResults_createServerFn_handler",
		importer: () => import("./_ssr/student.functions-D6Xb8fFx.mjs")
	},
	"6c679e761ed6108dc7bbc2fd0556225aa47391aa98c90fc35ca50d5376f77d67": {
		functionName: "studentSubmit_createServerFn_handler",
		importer: () => import("./_ssr/student.functions-D6Xb8fFx.mjs")
	},
	"85911a186d5f0c2d96f91432537b81004fe251104f5099950ef220fdafb7b93f": {
		functionName: "studentGetExam_createServerFn_handler",
		importer: () => import("./_ssr/student.functions-D6Xb8fFx.mjs")
	},
	"866ba05cc4452b389b42f60fe7332598ee01076241decfc045bacde19bd848bc": {
		functionName: "studentLogin_createServerFn_handler",
		importer: () => import("./_ssr/student.functions-D6Xb8fFx.mjs")
	},
	"86d9e81fb1e692c29711f3491d43715885f4c3909ea18dbbe258ad3a680f0b20": {
		functionName: "studentExams_createServerFn_handler",
		importer: () => import("./_ssr/student.functions-D6Xb8fFx.mjs")
	},
	"c65ec1c350db70dc14f381550aaebe26c80206d03674d703e399ceb2ce1a07dc": {
		functionName: "checkAndAssignAdminRole_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-CuqyC1MI.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
