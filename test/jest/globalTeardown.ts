import env from '../env';
import logger from '../env/logger';

// eslint-disable-next-line import/no-default-export
export default async () => {
    logger.log('Global teardown...');
    if (!process.argv.includes('--no-env')) {
        await env.teardown();
    }
    logger.log('Global teardown completed.');
};
