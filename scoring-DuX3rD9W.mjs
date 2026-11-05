//#region node_modules/.nitro/vite/services/ssr/assets/scoring-DuX3rD9W.js
/** Normalize Arabic text so spelling variants of hamza/taa marbuta/yaa compare equal. */
function normalizeArabic(s) {
	return String(s ?? "").replace(/[\u064B-\u0652\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/\s+/g, " ").trim().toLowerCase();
}
function scoreQuestion(q, a) {
	const pts = Number(q.points) || 0;
	switch (q.type) {
		case "mcq": return a !== void 0 && a !== null && Number(a) === Number(q.correct) ? pts : 0;
		case "tf": return typeof a === "boolean" && a === Boolean(q.correct) ? pts : 0;
		case "fill": return String(q.correct ?? "").split("|").map(normalizeArabic).filter(Boolean).includes(normalizeArabic(String(a ?? ""))) ? pts : 0;
		case "essay": return null;
		case "match": {
			const pairs = q.pairs ?? [];
			if (!pairs.length) return 0;
			const ans = a ?? {};
			const right = pairs.filter((p, i) => normalizeArabic(ans[i] ?? "") === normalizeArabic(p.right)).length;
			return Math.round(right / pairs.length * pts * 100) / 100;
		}
		case "order": {
			const items = q.items ?? [];
			const ans = Array.isArray(a) ? a : [];
			return items.length > 0 && ans.length === items.length && items.every((it, i) => it === ans[i]) ? pts : 0;
		}
	}
}
function scoreExam(questions, answers) {
	let auto = 0;
	let max = 0;
	let hasEssay = false;
	for (const q of questions) {
		max += Number(q.points) || 0;
		const s = scoreQuestion(q, answers[q.id]);
		if (s === null) hasEssay = true;
		else auto += s;
	}
	return {
		auto: Math.round(auto * 100) / 100,
		max,
		hasEssay
	};
}
/** Final score: null while any essay is ungraded. essayGrades holds a percentage (0-100) per essay id. */
function finalScore(questions, auto, essayGrades, forcedZero = false) {
	if (forcedZero) return 0;
	let total = auto;
	for (const q of questions) {
		if (q.type !== "essay") continue;
		const g = essayGrades[q.id];
		if (g === void 0 || g === null || Number.isNaN(Number(g))) return null;
		total += Math.min(100, Math.max(0, Number(g))) / 100 * (Number(q.points) || 0);
	}
	return Math.round(total * 100) / 100;
}
function gradeLabel(percent) {
	if (percent >= 85) return "ممتاز";
	if (percent >= 75) return "جيد جداً";
	if (percent >= 60) return "جيد";
	if (percent >= 40) return "مقبول";
	return "ضعيف";
}
//#endregion
export { gradeLabel as n, scoreExam as r, finalScore as t };
