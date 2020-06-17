import path from 'path'
import fetch from 'node-fetch';
import { promises as fs } from 'fs'
import { NowRequest, NowResponse } from '@now/node'

export default async (request: NowRequest, response: NowResponse) => {
  if (request.method === 'GET') {
    const page = fs.readFile(path.join(__dirname, 'reset-page.html'), 'utf-8');
    response.end(await page);
    return;
  }
  try {
    // Uses deployments currently at dishcovery.menuteti.it
    const api = await fetch('https://api.vercel.com/v5/now/deployments/dpl_EK7RMJVAhQNYkHMH23kUYsRr6UoC/aliases', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.TOKEN,
      },
      method: 'POST',
      body: JSON.stringify({alias: 'menuteti.it'})
    })
    const json = await api.json();
    if (json.created) {
      const page = fs.readFile(path.join(__dirname, 'reset-page-done.html'), 'utf-8');
      response.end(await page);
    } else {
      response.status(response.statusCode).json(json);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
