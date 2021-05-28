import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Pasamos a render el primer recurso: <App />, como segundo pasamos el id de header
ReactDOM.render(<App />, document.getElementById('header'));
