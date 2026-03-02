import { callClaude, cors } from './_helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { log, profile } = req.body;

  const prompt = `Patient: ${profile?.name}, ${profile?.age} ${profile?.sex}, conditions: ${profile?.conditions}, meds: ${profile?.meds}.

Health log (most recent first):
${log}

Analyze patterns and provide:

**📊 What I'm Seeing**
[Key patterns across the log — frequency, severity trends, timing]

**🔗 Connections**
[How symptoms relate to each other or to known conditions: ${profile?.conditions}]

**⚠️ Things That Concern Me**
[Any patterns that suggest the patient should take action]

**💡 Recommendations**
1. [Specific action]
2. [Specific action]
3. [Specific action]

**🩺 Should You See a Doctor?**
[Yes/No/Maybe with a specific reason based on the actual data]

Be specific to this log data, not generic advice.`;

  try {
    const reply = await callClaude(null, [{ role: 'user', content: prompt }], 800);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
