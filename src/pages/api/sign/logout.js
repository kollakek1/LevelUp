import { lucia } from "../../../libs/auth";

export async function POST({ request, cookies }) {
    const session = cookies.get("auth_session");

    if (!session) {
        return new Response(null, {
            status: 401
        });
    }

    await lucia.invalidateSession(session);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response();
}