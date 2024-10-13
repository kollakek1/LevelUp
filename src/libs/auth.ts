import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection } from "mongodb";
import { connectToMongo } from "./mongodb";

const { db } = await connectToMongo();

type UserDoc = {
	_id: string;
	username: string;
    email: string;
};

type SessionDoc = {
	_id: string;
	expires_at: Date;
	user_id: string;
};

const User: Collection<UserDoc> = db.collection("users") as Collection<UserDoc>;
const Session: Collection<SessionDoc> = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(Session, User);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
            email: attributes.email
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
    email: string;
}
