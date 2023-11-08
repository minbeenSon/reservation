import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** == CREATE == */
export async function createVote(vote) {
    return prisma.vote.create({
        data: {
            user_id: vote.user_id,
            title: vote.title,
            start_at: vote.start_at,
            end_at: vote.end_at,
            created_at: new Date()
        }
    });
}

/** == READ == */
export async function findVoteById(voteId) {
    return prisma.vote.findUnique({
        where: {
            id: voteId
        }
    })
}

export async function findVoteList() {
    return prisma.vote.findMany({
        where: {
            deleted_at: null
        }
    })
}

