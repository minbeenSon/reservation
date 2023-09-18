import { error } from "@sveltejs/kit";
import { checkLoginAndRedirectLoginPage, findUserByCookies } from "../../../domain/service/user";

export async function load({ cookies, url }) {
    let logInToken = cookies.get('smb');
    await checkLoginAndRedirectLoginPage(logInToken, url.pathname);

    let user = await findUserByCookies(logInToken);
    if (!user) throw error(401, 'NO USER');

    return { user: user };
}