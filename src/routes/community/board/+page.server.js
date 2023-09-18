import { findBoardList } from "../../../domain/service/board";
import { findUserByCookies } from "../../../domain/service/user";

export async function load({ cookies }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let boardList = await findBoardList();

    if (user) {
        return { user: user, boardList: boardList };
    } else {
        return { user: null, boardList: boardList };
    }


}