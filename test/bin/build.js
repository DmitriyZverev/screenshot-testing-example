const Compiler = require('../env/app/Compiler');
const logger = require('../env/logger');

(async () => {
    const compiler = new Compiler();
    try {
        await compiler.compile();
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
})();
