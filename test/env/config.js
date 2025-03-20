const prefix = (str) => `scr-${str}`;

exports.NETWORK_NAME = prefix('test-network');

exports.BROWSER_IMAGE = 'browserless/chrome:1.28.0-puppeteer-2.1.1';
exports.BROWSER_CONTAINER_NAME = prefix('test-browser');
exports.BROWSER_PORT = '9337';
exports.BROWSER_WS_ENDPOINT = process.env.SDMSE_TEST_BROWSER_WS_ENDPOINT
    ? process.env.SDMSE_TEST_BROWSER_WS_ENDPOINT
    : `ws://localhost:${exports.BROWSER_PORT}`;

exports.NGINX_IMAGE = 'nginx:alpine';
exports.NGINX_CONTAINER_NAME = prefix('test-nginx');
exports.NGINX_PORT = '9338';
exports.TEST_APP_ENDPOINT = process.env.SDMSE_TEST_APP_ENDPOINT
    ? process.env.SDMSE_TEST_APP_ENDPOINT
    : `http://${exports.NGINX_CONTAINER_NAME}:80`;
