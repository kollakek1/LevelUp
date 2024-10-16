import { connectToMongo } from "../../../../libs/mongodb";
import { generateIdFromEntropySize } from "lucia";

export async function POST({ request, locals }) {
    try {
        const { db } = await connectToMongo();
        
        const { chatId, message } = await request.json();

        const userId = locals?.user?.id;

        if (!chatId) {
            return new Response(JSON.stringify({ error: "Неверный ID чата" }), { status: 400 });
        }
        if (!message || message.trim() === "") {
            return new Response(JSON.stringify({ error: "Сообщение не может быть пустым" }), { status: 400 });
        }
        if (!userId) {
            return new Response(JSON.stringify({ error: "Необходимо авторизоваться" }), { status: 401 });
        }

        const newMessage = {
            _id: generateIdFromEntropySize(15),
            chatId: chatId,
            message: message.trim(),
            time: new Date(),
            user: {
                id: locals?.user?.id,
                username: locals?.user?.username
            }
        };

        const result = await db.collection("messages").insertOne(newMessage);

        await db.collection("chats").updateOne(
            { _id: chatId },
            {
                $set: {
                    lastMessage: message.trim(),
                    lastMessageAt: new Date(),
                    lastMessageBy: userId
                }
            }
        );

        return new Response(JSON.stringify({ success: true, messageId: result.insertedId }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        return new Response(JSON.stringify({ error: "Ошибка сервера" }), { status: 500 });
    }
}
