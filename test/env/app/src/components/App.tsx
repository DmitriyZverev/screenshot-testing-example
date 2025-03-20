import React from 'react';
import queryString from 'query-string';

import {CaseList, CaseMap} from './CaseList';
import {ErrorReport} from './ErrorReport';
import {ErrorBoundary} from './ErrorBoundary';

const errorMessages = {
    renderError: 'Case render error.',
    pathNotExists: (filePath: string) => `Can't find file with cases by path: "${filePath}".`,
    caseNotExists: (filePath: string, caseName: string) =>
        `File "${filePath}" has no exported case with name "${caseName}".`,
    invalidCaseType: (filePath: string, caseName: string, caseType: string) =>
        `Invalid case type: "${caseType}". Export with name: "${caseName}" in file "${filePath}" should be a React component.`,
};

const requireContext = require.context('./../../../../../src', true, /\.cases\.tsx$/);

const filePaths = requireContext.keys();
const caseMap = filePaths.reduce<CaseMap>((caseMap, filePath) => {
    caseMap[filePath] = requireContext(filePath);
    return caseMap;
}, {});

export const App = React.memo(() => {
    const {filePath, caseName} = queryString.parse(window.location.search);
    if (filePath && typeof filePath === 'string' && caseName && typeof caseName === 'string') {
        if (!caseMap[filePath]) {
            const message = errorMessages.pathNotExists(filePath);
            return <ErrorReport>{message}</ErrorReport>;
        }
        const CaseComponent = caseMap[filePath][caseName];
        if (!CaseComponent) {
            const message = errorMessages.caseNotExists(filePath, caseName);
            return <ErrorReport>{message}</ErrorReport>;
        }
        const caseType = typeof CaseComponent;
        if (caseType === 'function') {
            return (
                <ErrorBoundary
                    renderError={(error) => <ErrorReport error={error}>{errorMessages.renderError}</ErrorReport>}
                >
                    <CaseComponent />
                </ErrorBoundary>
            );
        }
        return <ErrorReport>{errorMessages.invalidCaseType(filePath, caseName, caseType)}</ErrorReport>;
    }
    return <CaseList caseMap={caseMap} />;
});
