import { PrismaClient } from '@prisma/client'
import { comment } from 'postcss';

const prisma = new PrismaClient();

/** == CREATE == */
export async function createBoardComment(boardId, userId, content, commentId) {
    return await prisma.board_comment.create({
        data: {
            board_id: boardId,
            user_id: userId,
            content: content,
            comment_id: commentId,
            created_at: new Date()
        }
    })
}

/** == READ == */
export async function findBoardCommentByBoardId(boardId) {
    return await prisma.board_comment.findMany({
        where: {
            board_id: parseInt(boardId),
            deleted_at: null
        },
        orderBy: [
            {
                comment_id: 'desc'
            },
            {
                id: 'desc'
            }
        ]
    })
}