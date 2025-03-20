import env from '../env';
import logger from '../env/logger';

// eslint-disable-next-line import/no-default-export
export default async () => {
    logger.log('Global setup...');
    if (!process.argv.includes('--no-env')) {
        await env.setup();
    }
    logger.log('Global setup completed.');
};
