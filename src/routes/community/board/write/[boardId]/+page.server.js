import { error } from "@sveltejs/kit";
import { findBoardByBoardId } from "../../../../../domain/service/board";
import { findUserByCookies } from "../../../../../domain/service/user";

export async function load({ params, cookies }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    if (params.boardId === 'new') {
        let newBoard = {
            id: 0,
            title: '',
            content_text: '',
            content_image_url: '',
            view_count: 0,
            created_at: null,
            deleted_at: null
        }
        return { user: user, board: newBoard }
    }

    let board = await findBoardByBoardId(params.boardId);

    if (user.id !== board.user_id) {
        throw error(401, 'NO AUTHENTICATION');
    }

    return { user: user, board: board }
}