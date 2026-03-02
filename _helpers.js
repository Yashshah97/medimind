// Shared helpers for all MediMind API functions

export async function callClaude(systemPrompt, messages, maxTokens = 1000) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '';
}

export async function getFDAData(drug) {
  try {
    const res = await fetch(
      `https://api.fda.gov/drug/label.json?search=drug_interactions:${encodeURIComponent(drug)}&limit=1`
    );
    const data = await res.json();
    if (data.results?.[0]?.drug_interactions) {
      return data.results[0].drug_interactions[0].substring(0, 800);
    }
  } catch (_) {}
  return '';
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
