import path from 'path'
import fetch from 'node-fetch';
import {promises as fs} from 'fs'
import { NowRequest, NowResponse } from '@now/node'

const style = fs.readFile(path.join(__dirname, 'style.css'), 'utf-8');
const script = fs.readFile(path.join(__dirname, 'script.js'), 'utf-8');
export default async (request: NowRequest, response: NowResponse) => {
  if (request.url === '/') {
    response.writeHead(301, {
      'Location': '/app/restaurants/a0329009700a7824d1be0d00d6f3e1c1/a-la-carte-menu'
    });
    return response.end();
  }

  const sourceResponse = await fetch('https://dishcovery.menu' + (request.url === '/' ?  '/app/restaurants/a0329009700a7824d1be0d00d6f3e1c1/a-la-carte-menu' : request.url), {
    headers: {
      'User-Agent': request.headers['user-agent'],
    }
  })

  const html = (await sourceResponse.text())
  .replace(/https:\/\/dishcovery.menu/g, request.headers['x-forwarded-proto'] + '://' + request.headers.host)
  .replace('</body>', '<style>' + await style + '</style></body>')
  .replace('</head>', '<script>' + await script + '</script></head>')
  .replace(/\.00",/g, ' ",')
  .replace(/\.(\d)0",/g, ',$1 ",')

  response.setHeader('Content-Type', sourceResponse.headers.get('content-type'))
  response.setHeader('Cache-Control', 's-maxage=' + (30 * 24 * 3600) + ', public')
  response.end(html);
}
