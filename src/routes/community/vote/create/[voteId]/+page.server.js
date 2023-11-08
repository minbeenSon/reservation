import { error, redirect } from "@sveltejs/kit";
import { findUserByCookies } from "../../../../../domain/service/user";
import { findVoteById } from "../../../../../domain/service/vote";

export async function load({ params, cookies }) {
    let logInToken = cookies.get('smb');
    let user = await findUserByCookies(logInToken);

    if (!user) {
        throw redirect(303, '/login');
    }

    let now = new Date();
    if (params.voteId === 'new') {
        const newVote = {
            id: 0,
            user_id: user.id,
            title: '',
            start_at: new Date(),
            end_at: new Date(now.setDate(now.getDate() + 1)),
            created_at: null,
            deleted_at: null
        }
        return { user: user, vote: newVote }
    } else {
        const vote = await findVoteById(parseInt(params.voteId));
        return { user: user, vote: vote }

    }
}