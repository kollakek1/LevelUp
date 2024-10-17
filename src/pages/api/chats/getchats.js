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

    const updatedChats = await Promise.all(chats.map(async (chat) => {
        if (chat.type === 'private') {
            const otherMemberId = chat.members.find(memberId => memberId !== user.id);

            const otherMember = await db.collection("users").findOne({ _id: otherMemberId });

            return {
                ...chat,
                name: otherMember ? otherMember.username : "Unknown"
            };
        }

        return chat;
    }));

    return new Response(JSON.stringify(updatedChats));
}
