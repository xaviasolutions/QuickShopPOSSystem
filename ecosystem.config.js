const os = require('os');
const path = require('path');

const isWindows = os.platform() === 'win32';

const ROOT = isWindows
  ? path.join('C:\\laragon\\www\\QuickShopPOS\\server-runner')
  : '/home/ec2-user/main/dev/QuickShopPOSSystem';

// ── Shared base ───────────────────────────────────────────────────────────────
const base = {
  DB_HOST: '3.91.182.123',
  DB_PORT: '3306',
  DB_USER: 'webpadmin',
  DB_PASSWORD: 'Karachi@2023',
  DB_NAME: 'dev_quickshop_pos',
  JWT_ACCESS_SECRET: 'randomkey',
  DEFAULT_HOST: '127.0.0.1',
  API_GATEWAY_SERVICE_HOST: '127.0.0.1',
  API_GATEWAY_SERVICE_PORT: '3055',
  POS_SERVICE_HOST: '127.0.0.1',
  POS_SERVICE_PORT: '3057',
  POS_WS_PORT: '3058',
  FRONTEND_PORT: '3056',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '587',
  SMTP_USER: 'ranadeveloperoffical@gmail.com',
  SMTP_PASS: 'ugwj newo paay hxhz',
  SMTP_FROM: 'ranadeveloperoffical@gmail.com',
};

// ── env: local (Windows - no SSL, http, local DB) ────────────────────────────
const env_local = {
  ...base,
  NODE_ENV: 'development',
  // Local DB (Laragon MySQL)
  DB_HOST: 'localhost',
  DB_PORT: '3306',
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: 'dev_quickshop_pos',
  PROTOCOL: 'http',
  BASE_URL: 'http://localhost:3056/',
  CORS_ORIGINS: 'http://localhost:8001,http://localhost:8080,http://localhost:3000,http://localhost:3056',
};

// ── env: development (Linux server - SSL, https) ──────────────────────────────
const env_development = {
  ...base,
  NODE_ENV: 'development',
  PROTOCOL: 'https',
  BASE_URL: 'https://dev-xavia.xaviasolutions.com:3056/',
  CORS_ORIGINS: 'http://localhost:8001,http://localhost:8080,http://localhost:3000,https://dev-xavia.xaviasolutions.com:3056',
  SSL_KEY_PATH: '/etc/letsencrypt/live/dev-xavia.xaviasolutions.com/privkey.pem',
  SSL_CERT_PATH: '/etc/letsencrypt/live/dev-xavia.xaviasolutions.com/cert.pem',
  SSL_CA_PATH: '/etc/letsencrypt/live/dev-xavia.xaviasolutions.com/fullchain.pem',
};

module.exports = {
  apps: [
    // ── 1. API Gateway ────────────────────────────────────────────────────
    {
      name: 'quickpos-api-gateway-BE-3055',
      script: `${ROOT}/dist/api-gateway-app/main.js`,
      cwd: ROOT,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: { ...env_local, SERVICE_NAME: 'api-gateway-app' },
      env_development: { ...env_development, SERVICE_NAME: 'api-gateway-app' },
      out_file: `${ROOT}/logs/api-gateway-out.log`,
      error_file: `${ROOT}/logs/api-gateway-error.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },

    // ── 2. POS Service ────────────────────────────────────────────────────
    {
      name: 'quickpos-pos-service-BE-3057',
      script: `${ROOT}/dist/pos-service-app/main.js`,
      cwd: ROOT,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: { ...env_local, SERVICE_NAME: 'pos-service-app' },
      env_development: { ...env_development, SERVICE_NAME: 'pos-service-app' },
      out_file: `${ROOT}/logs/pos-service-out.log`,
      error_file: `${ROOT}/logs/pos-service-error.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },

    // ── 3. Frontend + Proxy ───────────────────────────────────────────────
    {
      name: 'quickpos-frontend-FE-3056',
      script: `${ROOT}/server.js`,
      cwd: ROOT,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: { ...env_local },
      env_development: { ...env_development },
      out_file: `${ROOT}/logs/frontend-out.log`,
      error_file: `${ROOT}/logs/frontend-error.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
