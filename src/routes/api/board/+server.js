import { createBoard } from '../../../domain/service/board';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    await createBoard(await request.json());
    return json({}, { status: 200 });
}

// export async function PUT({ request }) {
//     await updateBoard(await request.json());
//     return json({}, { status: 200 });
// }