import { connectToMongo } from "../../../libs/mongodb";

export async function GET({ request }) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    if (!query) {
        return new Response(JSON.stringify({ error: "No search query provided" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const { db } = await connectToMongo();

    const users = await db.collection("users")
        .find({
            $or: [
                { login: { $regex: query, $options: "i" } },
            ]
        })
        .project({
            _id: 1,
            username: 1,
            login: 1,
            createdAt: 1
        })
        .limit(10)
        .toArray();

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}