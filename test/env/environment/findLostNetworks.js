/**
 * Find networks by name.
 */
module.exports = async (docker, networkName) => {
    return Array.from(await docker.listNetworks()).reduce((networks, networkInfo) => {
        if (networkName === networkInfo.Name) {
            networks.push(docker.getNetwork(networkInfo.Id));
        }
        return networks;
    }, []);
};
