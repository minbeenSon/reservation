import { json } from '@sveltejs/kit';
import { createVoteCandidate } from '../../../domain/service/voteCandidate';
import { createVoteCount } from '../../../domain/service/voteCount';

export async function POST({ request }) {
    let { voteId, names } = await request.json();
    for(let name of names) {
        let voteCandidate = await createVoteCandidate(voteId, name);
        await createVoteCount(voteCandidate.id);
    }
    return json({});
}