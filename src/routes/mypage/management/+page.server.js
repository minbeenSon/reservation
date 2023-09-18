import { error } from "@sveltejs/kit";
import { findUserByCookies } from "../../../domain/service/user";

export async function load({ cookies }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    if (user.user_rank !== 'MANAGER') {
        throw error (401, 'NO MANAGER');
    }

    if (user) {
        return { user: user };
    } else {
        return { user: null };
    }
}