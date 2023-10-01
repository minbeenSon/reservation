import { findBoardList } from "../../../domain/service/board";
import { findUserByCookies } from "../../../domain/service/user";
import { findUserByUserId } from "../../../domain/service/user";

export async function load({ cookies, url }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let searchPart = url.searchParams.get('searchPart') ? url.searchParams.get('searchPart') : '';
    let searchText = url.searchParams.get('searchText') ? url.searchParams.get('searchText') : '';
    let boardList = await findBoardList(searchPart, searchText);
    for (let board of boardList) {
        if (board.content_text.length > 20) {
            let txt = board.content_text.substr(0, 20) + '...';
            board.content_text = txt;
        }
        board.user_id = (await findUserByUserId(board.user_id)).nickname;

        let createdAt = new Date(board.created_at);
        board.created_at = createdAt.getFullYear() + '/' + createdAt.getMonth() + '/' + createdAt.getDay();
    }
    if (user) {
        return { user: user, boardList: boardList };
    } else {
        return { user: null, boardList: boardList };
    }

}