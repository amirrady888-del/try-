import { t as supabase } from "./client-GOtSBnV2.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BOYu3TPd.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-me-yWP5dLXW.js
/**
* Checks if the authenticated user's email matches the admin email env var.
* If it matches and no admin role exists, creates one automatically.
* Idempotent: calling multiple times results in exactly one role record.
*/
var checkAndAssignAdminRole = createServerFn({ method: "POST" }).inputValidator((i) => ({
	userId: String(i.userId),
	userEmail: String(i.userEmail)
})).handler(createSsrRpc("c65ec1c350db70dc14f381550aaebe26c80206d03674d703e399ceb2ce1a07dc"));
function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const { data: u } = await supabase.auth.getUser();
			const user = u.user;
			if (user.email) try {
				await checkAndAssignAdminRole({ data: {
					userId: user.id,
					userEmail: user.email
				} });
			} catch {}
			const [{ data: roles }, { data: teacher }] = await Promise.all([supabase.from("user_roles").select("role").eq("user_id", user.id), supabase.from("teachers").select("*").eq("id", user.id).maybeSingle()]);
			return {
				user,
				isAdmin: (roles ?? []).some((r) => r.role === "admin"),
				teacher
			};
		}
	});
}
function useSignOut() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	return async () => {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
}
//#endregion
export { useSignOut as n, useMe as t };
