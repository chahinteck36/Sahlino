/**
 * Cloudflare Worker for Automated IndexNow Submissions
 *
 * This Worker can automatically notify Bing/Yandex when pages are deployed or modified,
 * or serve the IndexNow verification key file dynamically.
 *
 * Environment Secrets required in Cloudflare Worker settings:
 * - INDEXNOW_KEY: Your IndexNow key string
 * - HOST: "www.sahlino.tech"
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Automatically serve the IndexNow key verification file:
    // e.g. https://www.sahlino.tech/{INDEXNOW_KEY}.txt -> returns {INDEXNOW_KEY}
    if (env.INDEXNOW_KEY && url.pathname === `/${env.INDEXNOW_KEY}.txt`) {
      return new Response(env.INDEXNOW_KEY, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // 2. Webhook endpoint to trigger IndexNow submission on post-deploy
    if (url.pathname === '/api/trigger-indexnow' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization');
      if (authHeader !== `Bearer ${env.DEPLOY_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
      }

      const body = await request.json().catch(() => ({}));
      const urlsToSubmit = body.urls || [`https://${env.HOST || 'www.sahlino.tech'}/`];

      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: env.HOST || 'www.sahlino.tech',
          key: env.INDEXNOW_KEY,
          keyLocation: `https://${env.HOST || 'www.sahlino.tech'}/${env.INDEXNOW_KEY}.txt`,
          urlList: urlsToSubmit,
        }),
      });

      return new Response(
        JSON.stringify({
          status: response.status,
          message: 'IndexNow submitted',
          count: urlsToSubmit.length,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Default pass-through to origin
    return fetch(request);
  },
};
