import { connectToMongo } from "../../../../libs/mongodb";

export async function GET({ params, request, locals }) {
    const userId = params.id;

    const currentUser = locals.user;

    if (!currentUser) {
        return new Response(null, {
            status: 401
        });
    }

    const { db } = await connectToMongo();

    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
        return new Response(null, {
            status: 404,
            statusText: "User not found",
        });
    }

    return new Response(JSON.stringify(user));
}
