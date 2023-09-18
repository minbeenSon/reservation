import { json } from '@sveltejs/kit';
import { findUserByEmailAndPassword } from '../../../domain/service/user';
import { logIn } from '../../../domain/service/loginToken';

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();
    const user = await findUserByEmailAndPassword(email, password);
    if (!user) return json({}, {status :  400});
    const logInToken = await logIn(user.id);
    console.log('쿠키만들기전!')
    console.log(logInToken.token)
    console.log(logInToken.expired_at)
    cookies.set('smb', logInToken.token, { path : '/', expires: logInToken.expired_at })

    return json({ smb : logInToken }, { status: 200 });
}