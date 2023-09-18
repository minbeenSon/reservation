import { checkLoginAndRedirectLoginPage, findUserByCookies } from "../../domain/service/user";

export async function load({ cookies, url }) {
    let logInToken = cookies.get('smb');
    await checkLoginAndRedirectLoginPage(logInToken, url.pathname);

    let user = await findUserByCookies(logInToken);

    return { user: user };
}