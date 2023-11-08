import { createVote } from '../../../domain/service/vote';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    let vote = await createVote(await request.json());

    return json({vote: vote});
}

export async function PUT({ request }) {
    await updateVote(await request.json());
    return json({}, { status: 200 });
}