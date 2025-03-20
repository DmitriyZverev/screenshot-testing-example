const Docker = require('dockerode');

const config = require('./config');
const Compiler = require('./app/Compiler');
const makeEnvironment = require('./environment/makeEnvironment');

const env = makeEnvironment({
    docker: new Docker(),
    compiler: new Compiler(),
    networkName: config.NETWORK_NAME,
    browser: {
        image: config.BROWSER_IMAGE,
        containerName: config.BROWSER_CONTAINER_NAME,
        port: config.BROWSER_PORT,
    },
    server: {
        image: config.NGINX_IMAGE,
        containerName: config.NGINX_CONTAINER_NAME,
        port: config.NGINX_PORT,
    },
});

module.exports = env;
