import { findBoardList } from "../../../domain/service/board";
import { findUserByCookies } from "../../../domain/service/user";

export async function load({ cookies, url }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let searchPart = url.searchParams.get('searchPart') ? url.searchParams.get('searchPart') : '';
    let searchText =  url.searchParams.get('searchText') ? url.searchParams.get('searchText') : '';

    let boardList = await findBoardList(searchPart, searchText);

    if (user) {
        return { user: user, boardList: boardList };
    } else {
        return { user: null, boardList: boardList };
    }

}