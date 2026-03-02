import { callClaude, cors } from './_helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { profile, outbreaks } = req.body;

  const prompt = `Patient: ${profile?.name}, ${profile?.age} ${profile?.sex}, conditions: ${profile?.conditions}, medications: ${profile?.meds}, allergies: ${profile?.allergies}.

Current active health threats:
${outbreaks}

Provide PERSONALIZED advice for this specific patient:

**🎯 Your Risk Level**
[Rate risk for each outbreak as Low / Moderate / High — based on their age, conditions, and meds. Explain why.]

**🛡️ Your Protection Plan**
[Specific precautions tailored to their conditions — not generic advice]

**💊 Medication Considerations**
[Any interactions between outbreak treatments and their medications: ${profile?.meds}]

**🚨 Your Warning Signs**
[Given their profile, which symptoms mean they should seek care immediately]

**📋 Your Action Plan This Week**
1. [Specific action]
2. [Specific action]
3. [Specific action]`;

  try {
    const reply = await callClaude(null, [{ role: 'user', content: prompt }], 900);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
