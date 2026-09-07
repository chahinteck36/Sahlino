/**
 * IndexNow Submission Utility for Sahlino (https://www.sahlino.tech)
 *
 * IndexNow allows instant indexing notification to Bing, Yandex, Seznam, and Naver
 * when pages are added, updated, or deleted.
 *
 * Usage:
 *   INDEXNOW_KEY=your_key npx tsx scripts/indexnow.ts
 *
 * Requirements:
 * 1. Place your IndexNow key text file at public/<your-key>.txt containing only <your-key>
 * 2. Set the environment variable INDEXNOW_KEY (never commit keys to git)
 */

import https from 'https';
import { TOOLS, CATEGORIES } from '../src/data/tools.js';

const HOST = 'www.sahlino.tech';
const BASE_URL = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log(`
[IndexNow Info]
To ping IndexNow search engines (Bing, Yandex, etc.):
1. Generate an IndexNow key (e.g. at https://www.bing.com/indexnow)
2. Place a verification file in 'public/<your-key>.txt' with the key as content.
3. Run: INDEXNOW_KEY=<your-key> npx tsx scripts/indexnow.ts
`);
  process.exit(0);
}

// All public URLs
const urlList = [
  `${BASE_URL}/`,
  `${BASE_URL}/tools`,
  `${BASE_URL}/categories`,
  ...CATEGORIES.map((cat) => `${BASE_URL}/categories/${cat.slug}`),
  ...TOOLS.filter((t) => t.status === 'available').map((t) => `${BASE_URL}/${t.slug}`),
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urlList,
});

const req = https.request(
  'https://api.indexnow.org/indexnow',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    console.log(`[IndexNow] Response Status: ${res.statusCode} ${res.statusMessage}`);
    res.on('data', (d) => process.stdout.write(d));
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`[IndexNow] Successfully submitted ${urlList.length} URLs for instant indexing!`);
      } else {
        console.log(`[IndexNow] Submission returned status code ${res.statusCode}`);
      }
    });
  }
);

req.on('error', (error) => {
  console.error('[IndexNow] Error submitting to IndexNow:', error);
});

req.write(payload);
req.end();
