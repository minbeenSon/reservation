import { createBoard, updateBoard, deleteBoard } from '../../../domain/service/board';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    await createBoard(await request.json());
    return json({}, { status: 200 });
}

export async function PUT({ request }) {
    await updateBoard(await request.json());
    return json({}, { status: 200 });
}

export async function DELETE({ url }) {
    let boardId = url.searchParams.get('boardId');
    await deleteBoard(boardId);
    return json({}, { status: 200 });
}