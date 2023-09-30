import { json } from '@sveltejs/kit';
import { findBoardLikeByBoardIdAndUserId, deleteBoardLike, createBoardLike } from '../../../domain/service/boardLike';

export async function GET({ url }) {
    let boardId = url.searchParams.get('boardId');
    let userId = url.searchParams.get('userId');
    if (!userId) {
        return json({ pressed: false });
    }
    
    let boardLike = await findBoardLikeByBoardIdAndUserId(parseInt(boardId), parseInt(userId));
    if (boardLike) {
        return json({ pressed: true });
    } else {
        return json({ pressed: false });
    }
}

export async function POST({ request }) {
    const { boardId, userId } = await request.json();
    let boardLike = await findBoardLikeByBoardIdAndUserId(parseInt(boardId), parseInt(userId));

    if (boardLike) {
        await deleteBoardLike(boardLike.id);
    } else {
        await createBoardLike(boardId, userId);
    }
    return json({}, { status: 200 });
}
