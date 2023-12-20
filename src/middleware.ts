import { defineMiddleware } from "astro:middleware";

const BASIC_AUTH_USER = import.meta.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = import.meta.env.BASIC_AUTH_PW;
const AUTH_STRING = `Basic ${Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`).toString('base64')}`;

const paths = ['/', '/contact', '/feats', '/journey', '/craft'];
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {  
  return next();
  // const authHeader = context.request.headers.get('authorization') || '';
  // // Check for Basic Auth
  // if (BASIC_AUTH_USER && authHeader !== AUTH_STRING) {
  //   return new Response('Unauthorized', {
  //     headers: {
  //       'WWW-Authenticate': 'Basic realm="Protected Area"'
  //     },
  //     status: 401
  //   })
  // }

  // Extract current language from URL
  const requestUrl = new URL(context.url);
  const urlLang = requestUrl.pathname.split('/')[1] || '';
  // If the URL doesn't contain a language, redirect to defaultLang
  // if (urlLang === 'en' || urlLang === 'de') {
  //   const redirectURL = `${requestUrl.pathname.replace(`/${urlLang}`, '/')}`.replace(/\/+/g, '/');
  //   return context.redirect(redirectURL);
  // }

  // Continue with the next middleware or route handler
  // if (paths.includes(context.url.pathname) && context.request.method === 'GET') {
  //   const res = await next();
  //   const clonedRes = res.clone();
  //   const body = await clonedRes.arrayBuffer();
  //   const etag = await generateETag(body);
  //   res.headers.set('Etag', etag);
  //   return res
  // } else {
  //   return next();
  // }
});

async function generateETag(content: ArrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', content);  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `W/"${hashHex}"`;
}