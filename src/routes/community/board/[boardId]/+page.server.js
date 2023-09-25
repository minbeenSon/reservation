import { findBoardByBoardId } from "../../../../domain/service/board";
import { findUserByCookies } from "../../../../domain/service/user";

export async function load({ cookies, params }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let board = await findBoardByBoardId(params.boardId);
    if (user) {
        return { user: user, board: board };
    } else {
        return { user: null, board: board };
    }
}