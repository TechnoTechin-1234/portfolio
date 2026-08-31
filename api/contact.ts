import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processContactSubmission } from './lib/contact.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await processContactSubmission(req.body, process.env);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Unhandled contact API error:', error);
    return res.status(500).json({
      error: 'Contact service failed unexpectedly. Check the Vercel function logs.',
    });
  }
}
