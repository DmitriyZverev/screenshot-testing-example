const webpack = require('webpack');

const logger = require('../logger');

const webpackConfig = require('./webpack.config');

/**
 * Webpack compiler.
 *
 * It builds test application.
 */
module.exports = class Compiler {
    constructor() {
        this.compiler = webpack(webpackConfig);
    }

    outputPath() {
        return webpackConfig.output.path;
    }

    compile = async () => {
        logger.log('Test application compiling...');
        await new Promise((resolve, reject) => {
            this.compiler.run((err, stats) => {
                if (err) {
                    logger.error(err.stack || err);
                    if (err.details) {
                        logger.error(err.details);
                    }
                    reject(new Error('Webpack compilation error.'));
                } else {
                    const info = stats.toJson();
                    if (stats.hasErrors()) {
                        logger.error(info.errors);
                    }
                    if (stats.hasWarnings()) {
                        logger.warn(info.warnings);
                    }
                    logger.log(stats.toString());
                    logger.log('Test application successfully compiled.');
                    resolve();
                }
            });
        });
    };
};
