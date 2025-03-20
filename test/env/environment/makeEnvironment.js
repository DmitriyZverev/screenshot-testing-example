const Compiler = require('../app/Compiler');

const findLostContainers = require('./findLostContainers');
const findLostNetworks = require('./findLostNetworks');
const removeContainers = require('./removeContainers');
const removeNetworks = require('./removeNetworks');
const runContainer = require('./runContainer');

/**
 * Environment - additional services needed for tests executing.
 *
 * There are two actions:
 * - Setup action - compiles test application and then starts browser and static
 * server.
 * - Teardown action - kills all containers.
 */
const makeEnvironment = (params) => {
    const {docker, compiler, networkName, browser, server} = params;
    const state = {
        network: null,
        browserContainer: null,
        serverContainer: null,
    };
    const clean = async () => {
        const [lostContainers, lostNetworks] = await Promise.all([
            findLostContainers(docker, [browser.containerName, server.containerName]),
            findLostNetworks(docker, networkName),
        ]);
        await removeContainers(...lostContainers);
        await removeNetworks(...lostNetworks);
    };
    return {
        async setup() {
            await clean();
            state.network = await docker.createNetwork({Name: networkName});
            const [browserContainer, serverContainer] = await Promise.all([
                runContainer(docker, {
                    image: browser.image,
                    containerName: browser.containerName,
                    publish: [browser.port, '3000/tcp'],
                    network: networkName,
                    env: [
                        // Set browser connection timeout to 10 minutes.
                        // That should be enough to complete all tests in ONE test file.
                        'CONNECTION_TIMEOUT=600000',
                    ],
                }),
                compiler.compile().then(() =>
                    runContainer(docker, {
                        image: server.image,
                        containerName: server.containerName,
                        binds: [`${compiler.outputPath()}:/usr/share/nginx/html`],
                        publish: [server.port, '80/tcp'],
                        network: networkName,
                    }),
                ),
            ]);
            state.browserContainer = browserContainer;
            state.serverContainer = serverContainer;
        },
        async teardown() {
            if (!state.browserContainer || !state.serverContainer || !state.network) {
                await clean();
            } else {
                await removeContainers(state.browserContainer, state.serverContainer);
                await removeNetworks(state.network);
            }
        },
    };
};

module.exports = makeEnvironment;
