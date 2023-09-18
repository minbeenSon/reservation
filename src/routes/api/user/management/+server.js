import { updateUserRank, deleteCompletelyUser } from "../../../../domain/service/user";
import { json } from '@sveltejs/kit';

export async function PUT({ request }) {
    const { userId, userRank } = await request.json();

    let user = await updateUserRank(userId, userRank);

    if (user) {
        return json({}, { status: 200 });
    }
}

export async function DELETE({ url }) {
    let userId = url.searchParams.get('userId');
    await deleteCompletelyUser(userId);
    return json({}, { status: 200 });
}