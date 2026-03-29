require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const http     = require('http');
const https    = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');

const FRONTEND_DIST = path.join(__dirname, 'frontend-dist');
const UPLOADS_DIR   = path.join(__dirname, 'uploads');

const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT            || '8001');
const API_PORT      = parseInt(process.env.API_GATEWAY_SERVICE_PORT || '3000');
const WS_PORT       = parseInt(process.env.POS_WS_PORT              || '3005');
const PROTOCOL      = process.env.PROTOCOL || 'http';

const app = express();

// 1. Uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// 2. WebSocket proxy
const wsProxy = createProxyMiddleware({
  target: 'http://localhost:' + WS_PORT,
  changeOrigin: true,
  ws: true,
});
app.use('/socket.io', wsProxy);

// 3. API proxy - only for non-HTML requests (fixes hard refresh on /pos route)
const apiProxy = createProxyMiddleware({
  target: 'https://localhost:' + API_PORT,
  changeOrigin: true,
  secure: false,
  on: {
    error: (err, req, res) => {
      console.error('[proxy] ERROR ' + req.method + ' ' + req.url + ' ->', err.message);
      if (!res.headersSent) res.status(502).json({ message: 'API Gateway unavailable' });
    },
  },
});

app.use('/pos', (req, res, next) => {
  // When browser hard-refreshes /pos it sends Accept: text/html
  // Skip the API proxy so the SPA fallback serves index.html instead
  const accept = req.headers['accept'] || '';
  if (accept.includes('text/html')) return next();
  return apiProxy(req, res, next);
});

// 4. Frontend static files
app.use(express.static(FRONTEND_DIST));

// 5. SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
});

const BASE_URL = process.env.BASE_URL
  ? process.env.BASE_URL.replace(/\/$/, '')
  : PROTOCOL + '://localhost:' + FRONTEND_PORT;

let server;

if (PROTOCOL === 'https') {
  try {
    const sslOptions = {
      key:  fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
      ca:   fs.readFileSync(process.env.SSL_CA_PATH),
    };
    server = https.createServer(sslOptions, app);
    console.log('[server-runner] SSL loaded successfully');
  } catch (err) {
    console.error('[server-runner] SSL load failed:', err.message);
    console.warn('[server-runner] Falling back to HTTP');
    server = http.createServer(app);
  }
} else {
  server = http.createServer(app);
}

server.listen(FRONTEND_PORT, () => {
  console.log('\n[server-runner] Frontend  -> ' + BASE_URL);
  console.log('[server-runner] API       -> ' + BASE_URL + '/pos  (proxied to :' + API_PORT + ')');
  console.log('[server-runner] WebSocket -> ' + BASE_URL + '/socket.io  (proxied to :' + WS_PORT + ')');
  console.log('[server-runner] Uploads   -> ' + BASE_URL + '/uploads\n');
});

server.on('upgrade', wsProxy.upgrade);