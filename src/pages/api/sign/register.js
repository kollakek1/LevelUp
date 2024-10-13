import bcrypt from "bcryptjs";
import { connectToMongo } from "../../../libs/mongodb";
import { lucia } from "../../../libs/auth";
import { generateIdFromEntropySize } from "lucia";

export async function POST({ request, context }) {

  const { email, password, username, login } = await request.json()

  // Валидация данных
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email и пароль обязательны" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
  }

    // Подключение к базе данных
    const { db } = await connectToMongo();

    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await db.collection("users").findOne({
      $or: [
        { email: login },
        { username: login },
      ],
    });
    if (existingUser) {
        return new Response(JSON.stringify({ error: "Пользователь с таким email уже существует" }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateIdFromEntropySize(16);

    // Создаем нового пользователя
    const newUser = {
      username: username,
      login: login,
      _id: userId,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Вставляем нового пользователя в коллекцию
    await db.collection("users").insertOne(newUser);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new Response(JSON.stringify({ message: "Пользователь успешно зарегистрирован" }), {
        status: 201,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `${sessionCookie.name}=${sessionCookie.value}; Path=/; ${sessionCookie.attributes.secure ? 'Secure; ' : ''}HttpOnly; SameSite=Strict`
        },
      });

}
