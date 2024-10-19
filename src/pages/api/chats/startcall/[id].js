import { connectToMongo } from "../../../../libs/mongodb";
import { AccessToken } from 'livekit-server-sdk';

export async function GET({ request, locals, params }) {

    const user = locals.user;
    const chatId = params.id;

    if (!user) {
        return new Response(null, { status: 401 });
    }

    const { db } = await connectToMongo();

    const chat = await db.collection("chats").findOne({ _id: chatId });

    if (!chat) {
        return new Response(JSON.stringify({ error: "Chat not found" }), { status: 404 });
    }

    if (chat.type === "private" || chat.type === "group") {
        if (!chat.members.includes(user.id)) {
            return new Response(JSON.stringify({ error: "You are not a member of this chat" }), { status: 403 });
        }
    }

    const roomName = chatId;
    const participantName = user.username;

    const livechat = new AccessToken(import.meta.env.LIVEKIT_API_KEY, import.meta.env.LIVEKIT_API_SECRET, {
        identity: participantName,
        ttl: '10m',
    });

    livechat.addGrant({ roomJoin: true, room: roomName });

    return new Response(await livechat.toJwt());
}

