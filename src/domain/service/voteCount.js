import { PrismaClient } from '@prisma/client';
import { findCandidateById } from './voteCandidate';
const prisma = new PrismaClient();

/** == CREATE == */
export async function createVoteCount(candidateId) {
    return prisma.vote_count.create({
        data: {
            vote_candidate_id: candidateId,
            vote_candidate_count: 0
        }
    });
}

/** == READ == */
export async function findExistVoteCount(userId) {
    let splitUserId = userId
        .trim()
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item !== '');

    for (let userId of splitUserId) {
        
    }
    prisma.vote_count.findFirst({
        where: {

        }
    })
}


/** == UPDATE == */
export async function updateVoteCountUp(voteCountId, userIdList) {
    prisma.vote_count.update({
        where: {
            id: voteCountId
        },
        data: {
            vote_candidate_count: {
                increment: 1
            },
            user_id_list: userIdList
        }
    })
}

export async function updateVoteCountDown(voteCountId, userIdList) {
    prisma.vote_count.update({
        where: {
            id: voteCountId
        },
        data: {
            vote_candidate_count: {
                decrement: 1
            },
            user_id_list: userIdList
        }
    })
}