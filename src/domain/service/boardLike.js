import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

/** == CREATE == */
export async function createBoardLike(boardId, userId) {
    await prisma.board_like.create({
        data: {
            board_id: boardId,
            user_id: userId
        }
    })
}


/** == READ == */
export async function findBoardLikeByBoardIdAndUserId(boardId, userId) {
    return await prisma.board_like.findFirst({
        where: {
            board_id: boardId,
            user_id: userId
        }
    })
}

export async function countBoardLikeByBoardId(boardId) {
    const count = await prisma.board_like.aggregate({
		_count: {
			id: true
		},
		where: {
			board_id: parseInt(boardId)
		}
	});

    return count._count.id;
}


/** == UPDATE == */


/** == DELETE == */
export async function deleteBoardLike(boardLikeId) {
    await prisma.board_like.delete({
        where: {
            id: boardLikeId
        }
    })
}
