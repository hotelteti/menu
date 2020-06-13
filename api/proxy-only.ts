import path from 'path'
import {promises as fs} from 'fs'
import { NowRequest, NowResponse } from '@now/node'
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  target: 'https://dishcovery.menu',
  changeOrigin: true
});

const style = fs.readFile(path.join(__dirname, 'style.css'), 'utf-8');
export default async (request: NowRequest, response: NowResponse) => {
  if (request.url === '/') {
    response.writeHead(301, {
      'Location': '/app/restaurants/a0329009700a7824d1be0d00d6f3e1c1/a-la-carte-menu'
    });
    return response.end();
  }
  proxy.web(request, response);
}
