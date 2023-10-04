import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {    
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