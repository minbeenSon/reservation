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

export async function findBoardList(searchPart, searchText) {

    let searchParamsOR = [];
    if (searchPart !== 'title') {
        searchParamsOR.push({ content_text: { contains: searchText } });
    }
    if (searchPart !== 'content') {
        searchParamsOR.push({ title: { contains: searchText } });
    }

    return prisma.board.findMany({
        where: {
            deleted_at: null,
            OR: searchParamsOR
        },
        orderBy: {
            id: 'desc'
        }
    });
}

/** == UPDATE == */
export async function updateBoard(board) {
    await prisma.board.update({
        where: {
            id: board.id
        },
        data: {
            title: board.title,
            content_text: board.content_text,
            content_image_url: board.content_image_url
        }
    })
}


/** == DELETE == */
export async function deleteBoard(boardId) {
    await prisma.board.update({
        where: {
            id: parseInt(boardId)
        },
        data: {
            deleted_at: new Date()
        }
    })
}
