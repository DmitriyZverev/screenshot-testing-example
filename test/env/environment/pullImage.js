const logger = require('../logger');

const formatJson = (json) => {
    const progress = json.progress ? ` | ${json.progress}` : '';
    return `${json.id} | ${json.status}${progress}`;
};

/**
 * Pull docker image if not exists.
 *
 * Similar for `docker pull`
 */
module.exports = async (docker, imageName) => {
    const imageInfo = Array.from(await docker.listImages()).find((imageInfo) => {
        return imageInfo.RepoTags.includes(imageName);
    });
    if (!imageInfo) {
        await new Promise((resolve, reject) => {
            docker.pull(imageName, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                stream.on('data', (buffer) => {
                    const chunk = buffer.toString();
                    let message = chunk;
                    try {
                        const json = JSON.parse(chunk);
                        message = json.id ? formatJson(json) : json.status;
                    } catch {}
                    logger.log(message);
                });
                stream.on('error', (err) => {
                    reject(err);
                });
                stream.on('end', () => {
                    resolve();
                });
            });
        });
    }
};
