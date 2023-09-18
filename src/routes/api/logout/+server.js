import { json } from '@sveltejs/kit';

export async function DELETE({ cookies }) {
    cookies.delete('smb', { path: '/' });
    
    return json({}, { status: 200 });
}