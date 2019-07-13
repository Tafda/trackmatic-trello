import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './Shared/serviceWorker';
import { createAppState } from './Shared/State/AppState';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const stateObject = createAppState();
ReactDOM.render(
    <Provider store={stateObject.store}>
        <PersistGate loading={null} persistor={stateObject.storePersistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
