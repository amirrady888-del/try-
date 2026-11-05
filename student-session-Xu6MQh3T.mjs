import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BOYu3TPd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-session-Xu6MQh3T.js
var codeInput = (i) => ({ code: String(i.code ?? "").slice(0, 20) });
var studentLogin = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(createSsrRpc("866ba05cc4452b389b42f60fe7332598ee01076241decfc045bacde19bd848bc"));
var studentExams = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(createSsrRpc("86d9e81fb1e692c29711f3491d43715885f4c3909ea18dbbe258ad3a680f0b20"));
var studentGetExam = createServerFn({ method: "POST" }).inputValidator((i) => ({
	code: String(i.code),
	examId: String(i.examId)
})).handler(createSsrRpc("85911a186d5f0c2d96f91432537b81004fe251104f5099950ef220fdafb7b93f"));
var studentSubmit = createServerFn({ method: "POST" }).inputValidator((i) => i).handler(createSsrRpc("6c679e761ed6108dc7bbc2fd0556225aa47391aa98c90fc35ca50d5376f77d67"));
var studentResults = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(createSsrRpc("37a0a44ae327c8a7aea87ac8ead019c083394371cce9f6704ac8150e5cb2f9b5"));
var KEY = "ekhtebarni_student";
function getStudentSession() {
	if (typeof window === "undefined") return null;
	try {
		const s = JSON.parse(sessionStorage.getItem(KEY) || "null");
		if (!s || s.expires < Date.now()) {
			sessionStorage.removeItem(KEY);
			return null;
		}
		return s;
	} catch {
		return null;
	}
}
function setStudentSession(s) {
	sessionStorage.setItem(KEY, JSON.stringify({
		...s,
		expires: Date.now() + 24 * 3600 * 1e3
	}));
}
function clearStudentSession() {
	sessionStorage.removeItem(KEY);
}
//#endregion
export { studentGetExam as a, studentSubmit as c, studentExams as i, getStudentSession as n, studentLogin as o, setStudentSession as r, studentResults as s, clearStudentSession as t };
