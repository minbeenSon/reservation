import { createUser, updateUser, deleteUser } from "../../../domain/service/user";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    await createUser(await request.json());
    return json({}, { status: 200 });
}

export async function PUT({ request }) {
    await updateUser(await request.json());
    return json({}, { status: 200 });
}

export async function DELETE({ url }) {
    let userId = url.searchParams.get('userId');
    await deleteUser(userId);
    cookies.delete('smb', { path: '/' });
    return json({}, { status: 200 });
}