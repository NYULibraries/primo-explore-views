export default {
  dsn: 'https://7527da50c7da4590ae8dcd1d6b56ee55@sentry.io/1394419',
  whitelistUrls: [
    /library\.nyu\.edu/,
  ],
  sanitizeKeys: [
    'pds_handle',
  ],
  debug: process.env.NODE_ENV === 'development',
};