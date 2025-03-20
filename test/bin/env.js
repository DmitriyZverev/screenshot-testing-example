/**
 * Command line util for manage test environment.
 */

const env = require('../env');
const logger = require('../env/logger');

(async () => {
    try {
        const action = process.argv[2];
        if (action && ['setup', 'teardown'].includes(action)) {
            await env[action]();
        } else {
            throw new Error('Invalid action. Expected "setup" or "teardown"');
        }
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
