/**
 * Stop and remove docker containers.
 *
 * Similar for `docker stop <name1> <name2> && docker rm <name1> <name2>`
 */
module.exports = (...containers) => {
    return Promise.all(
        containers.map(async (container) => {
            await container.stop();
            await container.remove();
        }),
    );
};
