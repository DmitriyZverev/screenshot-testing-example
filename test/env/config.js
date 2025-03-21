require('dotenv').config({path: ['test/.env.local', 'test/.env']});

const prefix = (str) => `ste-${str}`;

const env = (name) => {
    const fullName = `STE_${name}`;
    if (!(fullName in process.env)) {
        throw new Error(`Environment variable "${fullName}" is not set`);
    }
    return process.env[fullName];
};

exports.NETWORK_NAME = prefix('network');
exports.BROWSER_IMAGE = env('BROWSER_IMAGE');
exports.BROWSER_CONTAINER_NAME = prefix('browser');
exports.BROWSER_PORT = env('BROWSER_PORT');
exports.BROWSER_TOKEN = env('BROWSER_TOKEN');
exports.BROWSER_WS_ENDPOINT = `ws://localhost:${exports.BROWSER_PORT}?token=${exports.BROWSER_TOKEN}`;
exports.NGINX_IMAGE = env('NGINX_IMAGE');
exports.NGINX_CONTAINER_NAME = prefix('nginx');
exports.NGINX_PORT = env('NGINX_PORT');
exports.TEST_APP_ENDPOINT = `http://${exports.NGINX_CONTAINER_NAME}:80`;
