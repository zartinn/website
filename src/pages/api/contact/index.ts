import type { APIRoute } from 'astro';
import { prepareMails } from '../../../utils/send-mail';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const success = await prepareMails(data);
    return new Response(null, { status: success ? 201 : 500 });
}