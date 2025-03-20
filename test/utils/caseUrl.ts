import {TEST_APP_ENDPOINT} from '../env/config';

/**
 * Make URL for access to test case inside a browser.
 */
export const caseUrl = (filePath: string, caseName: string) => {
    return `${TEST_APP_ENDPOINT}?filePath=${filePath}&caseName=${caseName}`;
};
