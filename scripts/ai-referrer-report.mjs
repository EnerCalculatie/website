// AI-referrer-rapport: haalt Cloudflare Web Analytics (RUM) op via de GraphQL
// Analytics API en filtert bezoeken die van AI-chatplatforms komen (ChatGPT,
// Perplexity, Copilot, Claude, Gemini) — vult de blinde vlek uit CLAUDE.md's
// "geen Google Analytics"-keuze: Cloudflare Web Analytics toont referrers wel,
// alleen niet gesegmenteerd per AI-bron in het dashboard zelf.
//
// Gebruik:
//   node scripts/ai-referrer-report.mjs                 laatste 7 dagen
//   node scripts/ai-referrer-report.mjs --days 30        laatste 30 dagen
//
// Vereist in .env: CLOUDFLARE_API_TOKEN (Account Analytics Read),
// CLOUDFLARE_ACCOUNT_ID (Cloudflare dashboard > Overview > API, rechterkolom
// "Account ID" — de RUM-dataset zit op account-niveau, niet op zone-niveau).
//
// Caveat: AI-chatclients sturen bij klikken vaak geen of een lege referrer-header
// mee — dit rapport telt dus een ondergrens, geen volledig beeld.

import 'dotenv/config';

const GRAPHQL_ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';

const AI_REFERRER_HOSTS = [
  'chat.openai.com',
  'chatgpt.com',
  'perplexity.ai',
  'www.perplexity.ai',
  'copilot.microsoft.com',
  'www.bing.com',
  'claude.ai',
  'gemini.google.com',
];

const args = process.argv.slice(2);
const daysFlagIndex = args.indexOf('--days');
const days = daysFlagIndex !== -1 ? Number(args[daysFlagIndex + 1]) : 7;

if (!Number.isInteger(days) || days <= 0) {
  throw new Error('--days moet een positief geheel getal zijn.');
}

const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const requestHost = process.env.SITE_HOST ?? 'www.enercalculatie.nl';

if (!apiToken || !accountId) {
  throw new Error('CLOUDFLARE_API_TOKEN en/of CLOUDFLARE_ACCOUNT_ID ontbreken in .env.');
}

const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
const until = new Date().toISOString();

const query = `
  query AiReferrers($accountTag: String!, $since: Time!, $until: Time!, $requestHost: String!, $refererHosts: [String!]!) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        rumPageloadEventsAdaptiveGroups(
          limit: 10000
          filter: {
            datetime_geq: $since
            datetime_leq: $until
            requestHost: $requestHost
            refererHost_in: $refererHosts
          }
        ) {
          count
          dimensions {
            refererHost
          }
        }
      }
    }
  }
`;

async function fetchAiReferrers() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        accountTag: accountId,
        since,
        until,
        requestHost,
        refererHosts: AI_REFERRER_HOSTS,
      },
    }),
  });

  const body = await response.json();

  if (!response.ok || body.errors?.length) {
    const message = body.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    throw new Error(`Cloudflare GraphQL-fout: ${message}`);
  }

  const groups = body.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];

  const counts = new Map();
  for (const group of groups) {
    const host = (group.dimensions?.refererHost ?? '').toLowerCase();
    counts.set(host, (counts.get(host) ?? 0) + group.count);
  }

  return counts;
}

function printReport(counts) {
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0);

  console.log(`AI-referrer-rapport — laatste ${days} dag(en)`);
  console.log(`Periode: ${since} t/m ${until}\n`);

  if (total === 0) {
    console.log('Geen pageviews met een AI-referrer gevonden in deze periode.');
    console.log('Let op: dit is een ondergrens — AI-chatclients sturen vaak geen referrer mee.');
    return;
  }

  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const widest = Math.max(...rows.map(([host]) => host.length));

  for (const [host, count] of rows) {
    console.log(`${host.padEnd(widest)}  ${count}`);
  }
  console.log(`\nTotaal: ${total} pageviews via bekende AI-bronnen.`);
}

const counts = await fetchAiReferrers();
printReport(counts);
