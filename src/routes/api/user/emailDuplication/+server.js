import { emailDuplication } from "../../../../domain/service/user";
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    let email = url.searchParams.get('email');
    let user = await emailDuplication(email);
    if (user) {
        return json({}, { status: 200 });
    } else {
        return json({}, { status: 500 });
    }
}