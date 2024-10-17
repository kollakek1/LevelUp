import { connectToMongo } from "../../../libs/mongodb";
import { generateIdFromEntropySize } from "lucia";

export async function POST({ request, locals }) {
    const user = locals.user;

    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToMongo();

    const { chatName, members, type } = await request.json();

    if (!chatName || !members || members.length === 0) {
        return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
    }

    const newChat = {
        _id: generateIdFromEntropySize(15),
        name: chatName,
        members: [...members, user.id],
        type: type || "group",
        createdAt: new Date(),
        lastMessage: "",
        lastMessageAt: null,
        lastMessageBy: null,
    };

    const result = await db.collection("chats").insertOne(newChat);

    if (result.insertedId) {
        return new Response(JSON.stringify({ message: "Chat created", chatId: result.insertedId }), { status: 201 });
    } else {
        return new Response(JSON.stringify({ message: "Chat creation failed" }), { status: 500 });
    }
}
