import { connectToMongo } from "../../../libs/mongodb";

export async function GET({ request, locals }) {

    const user = locals.user;

    if (!user) {
        return new Response(null, {
            status: 401
        });
    }

    const { db } = await connectToMongo();

    const chats = await db.collection("chats").find({ members: user.id }).toArray();

    return new Response(JSON.stringify(chats));
}
