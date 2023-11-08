import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** == CREATE == */
export async function createVoteCandidate(voteId, name) {
    return prisma.vote_candidate.create({
        data: {
            vote_id: voteId,
            name: name,
            count: 0,
            user_id_list: ''
        }
    });
}

/** == READ == */
export async function findVoteCandidateById(candidateId) {
    return prisma.vote_candidate.findUnique({
        where: {
            id: candidateId
        }
    })
}

export async function findVoteCandidateList() {
    return prisma.vote_candidate.findMany();
}
export async function findVoteCandidateListByVoteId(voteId) {
    return prisma.vote_candidate.findMany({
        where: {
            vote_id: voteId
        }
    });
}

export async function findCountVoteByVoteId(voteId) {
    const countSum =  prisma.vote_candidate.aggregate({
        where: {
            vote_id: voteId
        },
        _sum: {
            count: true
        }
    })
    
    return (await countSum)._sum.count
}

/** == UPDATE == */
export async function updateVoteCountUp(voteCandidateId, userIdList) {
    await prisma.vote_candidate.update({
        where: {
            id: voteCandidateId
        },
        data: {
            count: {
                increment: 1
            },
            user_id_list: userIdList
        }
    })
}

export async function updateVoteCountDown(voteCandidateId, userIdList) {
    await prisma.vote_candidate.update({
        where: {
            id: voteCandidateId
        },
        data: {
            count: {
                decrement: 1
            },
            user_id_list: userIdList
        }
    })
}