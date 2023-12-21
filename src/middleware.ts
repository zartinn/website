import { defineMiddleware } from "astro:middleware";

const BASIC_AUTH_USER = import.meta.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = import.meta.env.BASIC_AUTH_PW;
const AUTH_STRING = `Basic ${Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`).toString('base64')}`;

const paths = ['/', '/contact', '/feats', '/journey', '/craft'];
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {  
  const authHeader = context.request.headers.get('authorization') || '';
  // Check for Basic Auth
  if (BASIC_AUTH_USER && authHeader !== AUTH_STRING) {
    return new Response('Unauthorized', {
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      },
      status: 401
    })
  }

  // Continue with the next middleware or route handler
  if (paths.includes(context.url.pathname) && context.request.method === 'GET') {
    const res = await next();
    const clonedRes = res.clone();
    const body = await clonedRes.arrayBuffer();
    const etag = await generateETag(body);
    res.headers.set('Etag', etag);
    return res
  } else {
    return next();
  }
});

async function generateETag(content: ArrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', content);  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `W/"${hashHex}"`;
}