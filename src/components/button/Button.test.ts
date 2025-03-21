import {Page} from 'puppeteer-core';

import {connectBrowser} from '../../../test/utils/connectBrowser';

describe('Button', () => {
    const {testPage} = connectBrowser();

    describe('Default', () => {
        let page: Page;

        beforeEach(async () => {
            page = await testPage('./components/button/Button.cases.tsx', 'Default');
            await page.setViewport({width: 100, height: 32});
        });

        test('Normal', async () => {
            expect(await page.screenshot({encoding: 'base64'})).toMatchImageSnapshot();
        });

        test('Hover', async () => {
            await page.hover('button');
            expect(await page.screenshot({encoding: 'base64'})).toMatchImageSnapshot();
        });

        test('Focus', async () => {
            await page.focus('button');
            expect(await page.screenshot({encoding: 'base64'})).toMatchImageSnapshot();
        });
    });
});
