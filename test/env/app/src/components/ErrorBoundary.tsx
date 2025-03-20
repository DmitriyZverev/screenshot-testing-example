import React from 'react';

import logger from '../../../logger';

export interface Props {
    renderError: (error: any) => React.ReactNode;
}

export interface State {
    error: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
    override state: State = {
        error: null,
    };

    override componentDidCatch(error: any, errorInfo: any) {
        this.setState({error});
        logger.log('errorInfo', errorInfo.componentStack);
    }

    override render() {
        if (this.state.error) {
            return this.props.renderError(this.state.error);
        }
        return this.props.children;
    }
}
