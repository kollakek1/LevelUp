import { connectToMongo } from "../../../../libs/mongodb";

export async function GET({ params, request, locals }) {

    const user = locals.user;
    const id = params.id;

    if (!user) {
        return new Response(null, {
            status: 401
        });
    }

    const { db } = await connectToMongo();

    const chat = await db.collection("chats").findOne({ _id: id });

    if (!chat) {
        return new Response(null, {
            status: 404
        });
    }

    if (!chat.members.includes(user.id)) {
        return new Response(null, {
            status: 403
        });
    }

    const messages = await db.collection("messages").find({ chatId: id }).toArray();
    chat.messages = messages;

    if (chat.type === 'private') {
        const otherMemberId = chat.members.find(memberId => memberId !== user.id);

        const otherMember = await db.collection("users").findOne({ _id: otherMemberId });

        if (otherMember) {
            chat.name = otherMember.username;
        } else {
            chat.name = "Unknown";
        }
    }

    return new Response(JSON.stringify(chat));
}