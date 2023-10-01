import { findBoardByBoardId } from "../../../../domain/service/board";
import { findUserByCookies, findUserByUserId } from "../../../../domain/service/user";
import { countBoardLikeByBoardId } from "../../../../domain/service/boardLike";
import { createBoardComment, findBoardCommentByBoardId } from "../../../../domain/service/boardComment";

export async function load({ cookies, params }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let board = await findBoardByBoardId(params.boardId);
    let boardLikeCount = await countBoardLikeByBoardId(params.boardId);

    let boardComment = await findBoardCommentByBoardId(params.boardId);
    let commentMap = new Map();
    let sortedBoardComment = [];
    for (let comment of boardComment) {
        comment.user_id = (await findUserByUserId(comment.user_id)).nickname;
        let createdAt = new Date(comment.created_at);
        comment.created_at = createdAt.getFullYear() + '/' + createdAt.getMonth() + '/' + createdAt.getDay() + ' ' + createdAt.getHours() + ':' + createdAt.getMinutes();

        let id = comment.comment_id ? comment.comment_id : comment.id;
        let d = commentMap.get(id);
        if (!d) {
            d = { main: null, sub: [] };
            commentMap.set(id, d)
            sortedBoardComment.push(d);
        }
        if (!comment.comment_id) {
            d.main = comment;
        } else {
            d.sub.push(comment);
        }
    }

    if (user) {
        return { user: user, board: board, boardLikeCount: boardLikeCount, boardComment: sortedBoardComment };
    } else {
        return { user: null, board: board, boardLikeCount: boardLikeCount, boardComment: sortedBoardComment };
    }
}

export const actions = {
    comment_create: async ({ request }) => {
        const body = await request.formData();
        let boardId = body.get('board-id')?.toString();
        let userId = body.get('user-id')?.toString();
        let content = body.get('content')?.toString();
        let commentId = body.get('comment-id')?.toString();
        if (boardId && userId && content) {
            await createBoardComment(parseInt(boardId), parseInt(userId), content, commentId ? parseInt(commentId) : null);
        }
    }
}