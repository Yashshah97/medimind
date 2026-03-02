import { callClaude, cors } from './_helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reportText, profile } = req.body;
  if (!reportText) return res.status(400).json({ error: 'reportText required' });

  const prompt = `You are explaining a medical report to a patient in plain English.
Patient: ${profile?.name}, ${profile?.age} year old ${profile?.sex}.
Conditions: ${profile?.conditions || 'none'}. Medications: ${profile?.meds || 'none'}. Allergies: ${profile?.allergies || 'none'}.

Medical Report:
---
${reportText}
---

Explain this report with this structure:

**📋 What This Report Is**
[One sentence: what kind of report and why it was done]

**🔢 Your Results Explained**
[For EACH value/result: test name, patient's result, normal range, and plain English meaning. Use analogies if helpful.]

**⚠️ Values That Need Attention**
[Each result outside normal range: what it means, why it matters, how serious it is, what usually causes it. Relate to their conditions if relevant.]

**✅ What Looks Good**
[Brief reassurance about normal results]

**❓ Questions to Ask Your Doctor**
[5 specific questions based on the ACTUAL results — not generic]

**🚨 How Urgent Is This?**
[Call doctor TODAY / Schedule this week / Routine follow-up / Keep for records — with a brief reason]

**💡 What You Can Do Now**
[2-3 practical lifestyle steps based on these specific results]

Use simple language. Spell out abbreviations. Be honest but compassionate.`;

  try {
    const reply = await callClaude(null, [{ role: 'user', content: prompt }], 1500);
    res.json({ reply });
  } catch (err) {
    console.error('report error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
