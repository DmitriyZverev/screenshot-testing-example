const logger = require('../logger');

const pullImage = require('./pullImage');

/**
 * Create and start docker-container.
 *
 * Similar for `docker run`.
 */
module.exports = async (docker, params) => {
    await pullImage(docker, params.image);
    logger.log(`Container "${params.containerName}" is starting...`);
    const container = await docker.createContainer({
        Image: params.image,
        name: params.containerName,
        Env: params.env,
        HostConfig: {
            Binds: params.binds,
            PortBindings: {
                [params.publish[1]]: [
                    {
                        HostIp: '',
                        HostPort: params.publish[0],
                    },
                ],
            },
        },
        NetworkingConfig: {
            EndpointsConfig: {
                [params.network]: {},
            },
        },
    });
    await container.start();
    logger.log(`Container "${params.containerName}" is ready.`);
    return container;
};
