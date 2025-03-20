/**
 * Remove docker networks.
 *
 * Similar for `docker network rm`
 */
module.exports = (...networks) => {
    return Promise.all(
        networks.map(async (network) => {
            await network.remove();
        }),
    );
};
