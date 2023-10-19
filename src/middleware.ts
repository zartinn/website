import { defineMiddleware } from "astro:middleware";

const BASIC_AUTH_USER = 'martin';  // change to your desired username
const BASIC_AUTH_PASS = 'martin';  // change to your desired password
const AUTH_STRING = `Basic ${Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`).toString('base64')}`;


// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {    
  const authHeader = context.request.headers.get('authorization') || '';

  // Check for Basic Auth
  if (authHeader !== AUTH_STRING) {
    // Unauthorized
    return new Response('Unauthorized', {
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      },
      status: 401
    })
  }

  // Extract current language from URL
  const requestUrl = new URL(context.url);
  const urlLang = requestUrl.pathname.split('/')[1] || '';
  // If the URL doesn't contain a language, redirect to defaultLang
  if (urlLang === 'en') {
    const redirectURL = `${requestUrl.pathname.replace('/en', '/')}`.replace(/\/+/g, '/');
    return context.redirect(redirectURL);
  }
  // Continue with the next middleware or route handler
  next();
});