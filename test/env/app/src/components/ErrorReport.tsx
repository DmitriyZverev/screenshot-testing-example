import React from 'react';

import logger from '../../../logger';

export interface Props {
    error?: any;
    children: string;
}

export const ErrorReport: React.FC<Props> = (props) => {
    logger.error(props.children);
    return (
        <div>
            <div>{props.children}</div>
            {props.error ? (
                <pre>
                    <code>{props.error?.stack ?? props.error?.toString?.()}</code>
                </pre>
            ) : null}
        </div>
    );
};
