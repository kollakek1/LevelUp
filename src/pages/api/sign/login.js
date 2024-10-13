import bcrypt from "bcryptjs";
import { connectToMongo } from "../../../libs/mongodb";
import { lucia } from "../../../libs/auth";

export async function POST({ request }) {

  const { login, password } = await request.json()

  // Валидация данных
  if (!login || !password) {
    return new Response(JSON.stringify({ error: "Логин и пароль обязательны" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Подключение к базе данных
    const { db } = await connectToMongo();

    // Найдем пользователя по логину или email
    const user = await db.collection("users").findOne({
      $or: [
        { email: login },
        { username: login },
      ],
    });
    if (!user) {
        return new Response(JSON.stringify({ error: "Пользователь не найден" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: "Неверный пароль" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    } 
        
    const userId = user._id.toString();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new Response(JSON.stringify({ message: "Пользователь успешно авторизован" }), {
        status: 201,
        headers: { 
            'Content-Type': 'application/json',
            'Set-Cookie': `${sessionCookie.name}=${sessionCookie.value}; Path=/; ${sessionCookie.attributes.secure ? 'Secure; ' : ''}HttpOnly; SameSite=Strict`
        },
    });

    } catch (error) {

    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
