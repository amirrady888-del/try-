import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CuqyC1MI.js
/**
* Pure utilities for admin email detection.
* Kept separate from admin.functions.ts so they can be unit-tested
* without pulling in server-only imports (client.server, createServerFn).
*/
/** Reads VITE_ADMIN_EMAIL from environment and normalizes it (trim + lowercase). */
function getAdminEmail() {
	const email = processModule.env.VITE_ADMIN_EMAIL;
	if (!email) return null;
	return email.trim().toLowerCase() || null;
}
/** Returns true if the two emails match after normalization. */
function emailsMatch(a, b) {
	return a.trim().toLowerCase() === b.trim().toLowerCase();
}
async function adminClient() {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	return supabaseAdmin;
}
/**
* Checks if the authenticated user's email matches the admin email env var.
* If it matches and no admin role exists, creates one automatically.
* Idempotent: calling multiple times results in exactly one role record.
*/
var checkAndAssignAdminRole_createServerFn_handler = createServerRpc({
	id: "c65ec1c350db70dc14f381550aaebe26c80206d03674d703e399ceb2ce1a07dc",
	name: "checkAndAssignAdminRole",
	filename: "src/lib/admin.functions.ts"
}, (opts) => checkAndAssignAdminRole.__executeServer(opts));
var checkAndAssignAdminRole = createServerFn({ method: "POST" }).inputValidator((i) => ({
	userId: String(i.userId),
	userEmail: String(i.userEmail)
})).handler(checkAndAssignAdminRole_createServerFn_handler, async ({ data }) => {
	const adminEmail = getAdminEmail();
	if (!adminEmail) return { isAdmin: false };
	if (!emailsMatch(data.userEmail, adminEmail)) return { isAdmin: false };
	const db = await adminClient();
	const { data: existing } = await db.from("user_roles").select("role").eq("user_id", data.userId).eq("role", "admin").maybeSingle();
	if (existing) return { isAdmin: true };
	const { error } = await db.from("user_roles").insert({
		user_id: data.userId,
		role: "admin"
	});
	if (error) {
		console.error("[admin-auto-detection] Failed to assign admin role:", error.message);
		return { isAdmin: false };
	}
	console.log(`[admin-auto-detection] Admin role assigned to: ${data.userEmail}`);
	return { isAdmin: true };
});
//#endregion
export { checkAndAssignAdminRole_createServerFn_handler };
