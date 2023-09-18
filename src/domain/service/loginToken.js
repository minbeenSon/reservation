import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function logIn(userId) {
	let token = crypto.randomUUID();
	let expireDate = new Date();
	expireDate.setDate(expireDate.getHours() + 1);

	const logInToken = prisma.login_token.create({
		data: {
			user_id: userId,
			token: token,
			created_at: new Date(),
			expired_at: expireDate
		}
	});
	return logInToken;
}