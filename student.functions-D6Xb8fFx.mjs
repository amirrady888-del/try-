import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { r as scoreExam, t as finalScore } from "./scoring-DuX3rD9W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.functions-D6Xb8fFx.js
async function admin() {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	return supabaseAdmin;
}
async function loadStudent(code) {
	const db = await admin();
	const { data } = await db.from("students").select("id, name, code, active, group_id, teacher_id, groups(name, welcome_message), teachers(subject, status)").eq("code", code.trim().toUpperCase()).maybeSingle();
	if (!data || !data.active) throw new Error("الكود غير صحيح أو الحساب موقوف");
	const t = data.teachers;
	if (!t || t.status !== "active") throw new Error("المدرس غير مفعل حالياً");
	return {
		db,
		student: data,
		subject: t.subject
	};
}
var codeInput = (i) => ({ code: String(i.code ?? "").slice(0, 20) });
var studentLogin_createServerFn_handler = createServerRpc({
	id: "866ba05cc4452b389b42f60fe7332598ee01076241decfc045bacde19bd848bc",
	name: "studentLogin",
	filename: "src/lib/student.functions.ts"
}, (opts) => studentLogin.__executeServer(opts));
var studentLogin = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(studentLogin_createServerFn_handler, async ({ data }) => {
	const { student, subject } = await loadStudent(data.code);
	const g = student.groups;
	return {
		code: student.code,
		id: student.id,
		name: student.name,
		groupName: g?.name ?? "",
		welcome: g?.welcome_message ?? null,
		subject
	};
});
var studentExams_createServerFn_handler = createServerRpc({
	id: "86d9e81fb1e692c29711f3491d43715885f4c3909ea18dbbe258ad3a680f0b20",
	name: "studentExams",
	filename: "src/lib/student.functions.ts"
}, (opts) => studentExams.__executeServer(opts));
var studentExams = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(studentExams_createServerFn_handler, async ({ data }) => {
	const { db, student } = await loadStudent(data.code);
	const { data: links } = await db.from("exam_groups").select("exam_id").eq("group_id", student.group_id);
	const ids = (links ?? []).map((l) => l.exam_id);
	if (!ids.length) return [];
	const { data: exams } = await db.from("exams").select("id, title, duration_min, questions").in("id", ids).eq("status", "active");
	const { data: subs } = await db.from("submissions").select("exam_id").eq("student_id", student.id);
	return (exams ?? []).map((e) => ({
		id: e.id,
		title: e.title,
		duration_min: e.duration_min,
		count: e.questions.length,
		attempts: (subs ?? []).filter((s) => s.exam_id === e.id).length
	}));
});
function shuffle(a) {
	const r = [...a];
	for (let i = r.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const t = r[i];
		r[i] = r[j];
		r[j] = t;
	}
	return r;
}
async function loadActiveExam(db, examId, groupId) {
	const { data: link } = await db.from("exam_groups").select("exam_id").eq("exam_id", examId).eq("group_id", groupId).maybeSingle();
	if (!link) throw new Error("الامتحان غير متاح لك");
	const { data: exam } = await db.from("exams").select("*").eq("id", examId).maybeSingle();
	if (!exam || exam.status !== "active") throw new Error("الامتحان غير متاح الآن");
	return exam;
}
var studentGetExam_createServerFn_handler = createServerRpc({
	id: "85911a186d5f0c2d96f91432537b81004fe251104f5099950ef220fdafb7b93f",
	name: "studentGetExam",
	filename: "src/lib/student.functions.ts"
}, (opts) => studentGetExam.__executeServer(opts));
var studentGetExam = createServerFn({ method: "POST" }).inputValidator((i) => ({
	code: String(i.code),
	examId: String(i.examId)
})).handler(studentGetExam_createServerFn_handler, async ({ data }) => {
	const { db, student, subject } = await loadStudent(data.code);
	const exam = await loadActiveExam(db, data.examId, student.group_id);
	const qs = exam.questions.map((q) => ({
		id: q.id,
		type: q.type,
		text: q.text,
		points: q.points,
		media: q.media,
		options: q.type === "mcq" ? q.options : void 0,
		lefts: q.type === "match" ? (q.pairs ?? []).map((p) => p.left) : void 0,
		rights: q.type === "match" ? shuffle((q.pairs ?? []).map((p) => p.right)) : void 0,
		items: q.type === "order" ? shuffle(q.items ?? []) : void 0
	}));
	return {
		id: exam.id,
		title: exam.title,
		template: exam.template,
		duration_min: exam.duration_min,
		max_violations: exam.max_violations,
		subject,
		questions: qs
	};
});
var studentSubmit_createServerFn_handler = createServerRpc({
	id: "6c679e761ed6108dc7bbc2fd0556225aa47391aa98c90fc35ca50d5376f77d67",
	name: "studentSubmit",
	filename: "src/lib/student.functions.ts"
}, (opts) => studentSubmit.__executeServer(opts));
var studentSubmit = createServerFn({ method: "POST" }).inputValidator((i) => i).handler(studentSubmit_createServerFn_handler, async ({ data }) => {
	const { db, student } = await loadStudent(data.code);
	const exam = await loadActiveExam(db, data.examId, student.group_id);
	const questions = exam.questions;
	const log = Array.isArray(data.cheatLog) ? data.cheatLog.slice(0, 500) : [];
	const forced = Boolean(data.forceZero) || log.length >= exam.max_violations;
	const r = scoreExam(questions, data.answers ?? {});
	const { count } = await db.from("submissions").select("id", {
		count: "exact",
		head: true
	}).eq("exam_id", exam.id).eq("student_id", student.id);
	const final = forced ? 0 : r.hasEssay ? null : finalScore(questions, r.auto, {});
	const { error } = await db.from("submissions").insert({
		exam_id: exam.id,
		student_id: student.id,
		attempt_num: (count ?? 0) + 1,
		answers: data.answers,
		cheat_log: log,
		auto_score: forced ? 0 : r.auto,
		max_score: r.max,
		has_pending_essay: !forced && r.hasEssay,
		final_score: final,
		forced_zero: forced
	});
	if (error) throw new Error("تعذر حفظ التسليم، حاول مرة أخرى");
	return { ok: true };
});
var studentResults_createServerFn_handler = createServerRpc({
	id: "37a0a44ae327c8a7aea87ac8ead019c083394371cce9f6704ac8150e5cb2f9b5",
	name: "studentResults",
	filename: "src/lib/student.functions.ts"
}, (opts) => studentResults.__executeServer(opts));
var studentResults = createServerFn({ method: "POST" }).inputValidator(codeInput).handler(studentResults_createServerFn_handler, async ({ data }) => {
	const { db, student } = await loadStudent(data.code);
	const { data: subs } = await db.from("submissions").select("id, attempt_num, final_score, max_score, forced_zero, submitted_at, exams(title)").eq("student_id", student.id).order("submitted_at", { ascending: false });
	return (subs ?? []).map((s) => ({
		id: s.id,
		attempt_num: s.attempt_num,
		final_score: s.final_score,
		max_score: s.max_score,
		forced_zero: s.forced_zero,
		submitted_at: s.submitted_at,
		title: s.exams?.title ?? ""
	}));
});
//#endregion
export { studentExams_createServerFn_handler, studentGetExam_createServerFn_handler, studentLogin_createServerFn_handler, studentResults_createServerFn_handler, studentSubmit_createServerFn_handler };
