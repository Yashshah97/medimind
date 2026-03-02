import { callClaude, getFDAData, cors } from './_helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { drugs, profile } = req.body;
  if (!drugs || drugs.length < 2) {
    return res.status(400).json({ error: 'At least 2 drugs required' });
  }

  // Fetch FDA data for up to 3 drugs in parallel
  const fdaResults = await Promise.all(drugs.slice(0, 3).map(d => getFDAData(d)));
  const fdaContext = drugs.slice(0, 3)
    .map((d, i) => fdaResults[i] ? `FDA data for ${d}: ${fdaResults[i]}` : '')
    .filter(Boolean).join('\n\n');

  const prompt = `Patient: ${profile?.name}, ${profile?.age} year old ${profile?.sex}.
Known conditions: ${profile?.conditions || 'None'}.
Current medications: ${profile?.meds || 'None listed'}.
Allergies: ${profile?.allergies || 'None'}.

Medications to check: ${drugs.join(', ')}

${fdaContext ? '--- FDA Reference Data ---\n' + fdaContext + '\n---' : ''}

Analyze ALL interactions between these medications. Structure your response as:

**Overall Safety Rating:** ✅ Safe / ⚠️ Caution Needed / 🔶 Moderate Risk / 🚨 High Risk

**Interaction Analysis:**
For each pair with a known interaction:
- Drug A + Drug B: [severity emoji] [severity level]
  - What happens: [plain English explanation]
  - Risk: [what could go wrong]
  - Action: [exactly what the patient should do]

**Food & Alcohol Interactions:**
[Any food or drink to avoid with these medications]

**Special Warnings for This Patient:**
[Flag anything that interacts with their known conditions: ${profile?.conditions}]

**Bottom Line:**
[2-3 sentence plain English summary of what they need to know and do today]

Severity scale: ✅ No known interaction | ⚠️ Minor — monitor | 🔶 Moderate — consult doctor | 🚨 Major — avoid | ☠️ Contraindicated — do not combine`;

  try {
    const reply = await callClaude(null, [{ role: 'user', content: prompt }], 1200);
    res.json({ reply });
  } catch (err) {
    console.error('drugs error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
