import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from './components/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error(`Can't find root element`);
}

ReactDOM.createRoot(rootElement).render(<App />);
