const base = process.env.CATASO_EDGE_URL || process.argv[2];

if (!base) {
  console.error('Usage: CATASO_EDGE_URL=https://cataso-edge.<account>.workers.dev npm run test:smoke');
  process.exit(2);
}

async function checkJson(path) {
  const res = await fetch(new URL(path, base));
  if (!res.ok) {
    throw new Error(`${path} returned HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!json || json.ok !== true) {
    throw new Error(`${path} returned unexpected JSON: ${JSON.stringify(json)}`);
  }
  console.log(`OK ${path}`);
}

async function main() {
  await checkJson('/health');
  await checkJson('/logs?room=0&limit=1');
  await checkJson('/stats?limit=1');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
