/**
 * Find containers by names.
 */
module.exports = async (docker, containerNames) => {
    const names = containerNames.map((name) => `/${name}`);
    const inspects = await Promise.all(
        Array.from(await docker.listContainers()).map((containerInfo) => {
            const container = docker.getContainer(containerInfo.Id);
            return container.inspect();
        }),
    );
    return inspects.filter((inspect) => names.includes(inspect.Name)).map((inspect) => docker.getContainer(inspect.Id));
};
