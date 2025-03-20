import puppeteer, {Page, Browser as PuppeteerBrowser, ConnectOptions} from 'puppeteer-core';

import {BROWSER_WS_ENDPOINT} from '../env/config';

import {caseUrl} from './caseUrl';
import {subscribeToPage} from './subscribeToPage';

export interface Browser {
    browser(): PuppeteerBrowser;
    testPage(): Promise<Page>;
    testPage(filePath: string, caseName: string): Promise<Page>;
}

export type ConnectBrowser = (connectOptions?: ConnectOptions) => Browser;

interface State {
    browser: PuppeteerBrowser | null;
    testPage: Page | null;
}

/**
 * Browser connection utility.
 *
 * Creates a life cycle inside the tests for the browser and pages.
 * Browser connection lives while executes tests in file. And for each
 * new test creates a new page.
 */
export const connectBrowser: ConnectBrowser = (connectOptions) => {
    const state: State = {
        browser: null,
        testPage: null,
    };

    const getBrowser = () => {
        if (!state.browser) {
            throw new Error("Can't get browser, please call browser() inside the before../after../test/it functions.");
        }
        return state.browser;
    };

    const newPage = async () => {
        const page = await getBrowser().newPage();
        subscribeToPage(page);
        return page;
    };

    beforeAll(async () => {
        state.browser = await puppeteer.connect({
            ...connectOptions,
            browserWSEndpoint: BROWSER_WS_ENDPOINT,
        });
    });

    beforeEach(async () => {
        if (state.browser && !state.testPage) {
            state.testPage = await newPage();
        }
    });

    afterEach(async () => {
        if (state.testPage && !state.testPage.isClosed()) {
            await state.testPage.close();
        }
        state.testPage = null;
    });

    afterAll(() => {
        if (state.browser && state.browser.isConnected()) {
            state.browser.disconnect();
        }
    });

    return {
        browser: getBrowser,
        testPage: async (filePath?: string, caseName?: string) => {
            if (!state.testPage) {
                state.testPage = await newPage();
            }
            if (filePath && caseName) {
                await state.testPage.goto(caseUrl(filePath, caseName));
            }
            return state.testPage;
        },
    };
};
