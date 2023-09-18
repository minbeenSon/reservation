import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

/** == CREATE == */
export async function createBoard(board) {
    return await prisma.board.create({
        data: {
            title: board.title,
            content_text: board.content_text,
            content_image_url: board.content_image_url,
            view_count: 0,
            user_id: board.user_id,
            created_at: new Date()
        }
    })
}


/** == READ == */
export async function findBoardByBoardId(boardId) {
    return await prisma.board.findUnique({
        where: {
            id: parseInt(boardId)
        }
    });
}

export async function findBoardList() {
    return prisma.board.findMany({
        orderBy: {
            id: 'desc'
        }
    });
}

/** == UPDATE == */


/** == DELETE == */

