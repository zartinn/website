import type { RequestContext } from '@vercel/edge';
import { next } from '@vercel/edge';

const BASIC_AUTH_USER = import.meta.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = import.meta.env.BASIC_AUTH_PW;
const AUTH_STRING = `Basic ${Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`).toString('base64')}`;
const paths = ['/', '/contact', '/feats', '/journey', '/craft'];

export default async function ({ request, context }: { request: Request; context: RequestContext }) {
    const authHeader = request.headers.get('authorization') || '';
    console.log('MIDDLEWARE');
    // Check for Basic Auth
    if (BASIC_AUTH_USER && authHeader !== AUTH_STRING) {
      return new Response('Unauthorized', {
        headers: {
          'WWW-Authenticate': 'Basic realm="Protected Area"'
        },
        status: 401
      })
    }

    console.log('AFTER AUTH');
  
    // Continue with the next middleware or route handler
    const url = new URL(request.url);
    console.log('URL: ', url);
    if (paths.includes(url.pathname) && request.method === 'GET') {
      const clonedRes = next().clone();
      const body = await clonedRes.arrayBuffer();
      const etag = await generateETag(body);
      return next({
        headers: {
            Etag: etag
        }
      })
    } else {
      return next();
    }
}

async function generateETag(content: ArrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', content);  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `W/"${hashHex}"`;
}