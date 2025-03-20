import React from 'react';

export interface CaseMap {
    [filePath: string]: any;
}

export interface CaseListProps {
    caseMap: CaseMap;
}

export const CaseList: React.FC<CaseListProps> = (props) => (
    <ul>
        {Object.entries(props.caseMap).map(([filePath, cases]) => (
            <li key={filePath}>
                {filePath}
                <ul>
                    {Object.keys(cases).map((caseName) => (
                        <li key={caseName}>
                            <a href={`/?filePath=${filePath}&caseName=${caseName}`}>{caseName}</a>
                        </li>
                    ))}
                </ul>
            </li>
        ))}
    </ul>
);
