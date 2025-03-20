import {Page, ConsoleMessageLocation, ConsoleMessage} from 'puppeteer-core';

import logger from '../env/logger';

export type SubscribeToPage = (page: Page) => void;

const stringifyLocation = (location: ConsoleMessageLocation) => {
    const {url, lineNumber, columnNumber} = location;
    return url && lineNumber && columnNumber ? `${url}:${lineNumber}:${columnNumber}` : '';
};

const logMessage = (message: ConsoleMessage) => {
    const location = stringifyLocation(message.location());
    let action: 'log' | 'error' | 'warn' = 'log';
    if (message.type() === 'error') {
        action = 'error';
    }
    if (message.type() === 'warning') {
        action = 'warn';
    }
    return logger[action](`Browser console.${message.type()} ${location}:\n${message.text()}`);
};

/**
 * Subscribe to console output on the page.
 */
export const subscribeToPage: SubscribeToPage = (page) => {
    page.on('console', (message) => {
        const messageType = message.type();
        if (messageType === 'error' || messageType === 'warning') {
            logMessage(message);
        }
    });
    page.on('pageerror', (error) => {
        logger.error(`Browser page error:\n${error.message}`);
    });
};
