import { findUserByCookies, findUserByUserId, findUserListForVote } from "../../../domain/service/user";
import { findVoteList } from "../../../domain/service/vote";
import { findVoteCandidateListByVoteId, findVoteCandidateList, updateVoteCountDown, updateVoteCountUp, findVoteCandidateById, findCountVoteByVoteId } from "../../../domain/service/voteCandidate";

export async function load({ cookies }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    let voteListWithMetaData = [];
    let voteList = await findVoteList();
    for (let vote of voteList) {
        let voteWithMetaData = {
            vote: vote,
            creator: await findUserByUserId(vote.user_id),
            startAt: (new Date(vote.start_at)).getFullYear() + '/' + (new Date(vote.start_at)).getMonth() + '/' + (new Date(vote.start_at)).getDay() + '/' + (new Date(vote.start_at)).getHours() + ':' + (new Date(vote.start_at)).getMinutes(),
            endAt: (new Date(vote.end_at)).getFullYear() + '/' + (new Date(vote.end_at)).getMonth() + '/' + (new Date(vote.end_at)).getDay() + '/' + (new Date(vote.end_at)).getHours() + ':' + (new Date(vote.end_at)).getMinutes()
        }
        voteListWithMetaData.push(voteWithMetaData);
    }


    let candidateListWithMetaData = [];
    let candidateList = await findVoteCandidateList();
    for (let candidate of candidateList) {
        let userList = [];
        let checked = false;

        if (candidate.user_id_list) {
            let splitUserIdList = candidate.user_id_list
                .trim()
                .split(',')
                .map((item) => parseInt(item.trim()))
                .filter((item) => item !== '');
            let userListForVote = await findUserListForVote(splitUserIdList);
            for (let userForVote of userListForVote) {
                userList.push(userForVote.nickname);
                checked = user.id === userForVote.id;
            }
        }

        let candidateWithMetaData = {
            candidate: candidate,
            userNicknameList: userList ? userList.join(', ') : '',
            checked: checked,
            percentage: (isNaN(candidate.count / await findCountVoteByVoteId(candidate.vote_id)) ? 0 : candidate.count / await findCountVoteByVoteId(candidate.vote_id)) * 100
        }
        candidateListWithMetaData.push(candidateWithMetaData);
    }

    if (user) {
        return { user: user, voteListWithMetaData: voteListWithMetaData, candidateListWithMetaData: candidateListWithMetaData };
    } else {
        return { user: null, voteListWithMetaData: voteListWithMetaData, candidateListWithMetaData: candidateListWithMetaData };
    }
}

export const actions = {
    vote_candidate_count: async ({ request }) => {
        const body = await request.formData();
        const userId = body.get('user-id')?.toString();
        const voteId = body.get("vote-id")?.toString();
        const candidateId = body.get('candidate-id')?.toString();

        if (userId && voteId && candidateId) {

            let isExist = false;
            let newUserIdList = [];

            // 존재하면 삭제
            const voteCandidates = await findVoteCandidateListByVoteId(parseInt(voteId));
            for (let voteCandidate of voteCandidates) {
                if (voteCandidate.user_id_list) {
                    let splitUserIdList = voteCandidate.user_id_list
                        .trim()
                        .split(',')
                        .map((item) => item.trim())
                        .filter((item) => item !== '');

                    newUserIdList = [];
                    for (let i = 0; i < splitUserIdList.length; i++) {
                        if (splitUserIdList[i] === userId) {
                            isExist = true;
                        } else {
                            newUserIdList.push(splitUserIdList[i]);
                        }
                    }

                    if (isExist) {
                        await updateVoteCountDown(voteCandidate.id, newUserIdList.join(','));
                        break;
                    }
                }
            }

            // 추가
            const voteCandidate = await findVoteCandidateById(parseInt(candidateId));
            await updateVoteCountUp(parseInt(candidateId), voteCandidate.user_id_list ? voteCandidate.user_id_list + ',' + userId : userId);
        }
    }
}