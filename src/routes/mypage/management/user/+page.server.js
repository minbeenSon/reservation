import { error } from "@sveltejs/kit";
import { findUserByCookies, findUserList } from "../../../../domain/service/user";

export async function load({ cookies, url }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    if (!user) {
        throw error(401, 'NO USER');
    }
    if (user.user_rank !== 'MANAGER') {
        throw error(401, 'NO MANAGER');
    }

    let manager = url.searchParams.get('manager') === 'on' ? true : false;
    let deleted =url.searchParams.get('deleted') === 'on' ? true : false;
    let searchPart = url.searchParams.get('searchPart') ? url.searchParams.get('searchPart') : '';
    let searchText =  url.searchParams.get('searchText') ? url.searchParams.get('searchText') : '';

    let userList = await findUserList(manager, deleted, searchPart, searchText);

    return { user: user, userList: userList };
}