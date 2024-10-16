import { connectToMongo } from "../../../../libs/mongodb";

export async function GET({ params, request, locals }) {

    const user = locals.user;

    const id = params.id;

    
    const { db } = await connectToMongo();

    const chat = await db.collection("chats").findOne({ _id: id });

    if (!chat) {
        return new Response(null, {
            status: 404
        });
    }

    const messages = await db.collection("messages").find({ chatId: id }).toArray();

    chat.messages = messages;

    if (!chat.members.includes(user.id) || !user) {
        return new Response(null, {
            status: 401
        });
    }


    return new Response(JSON.stringify(chat));
}
