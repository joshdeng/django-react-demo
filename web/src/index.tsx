import * as React from 'react';
import * as ReactDOM from 'react-dom';

// // for development environment

import { logger } from 'redux-logger';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import  reducers  from './reducers';
import thunk from 'redux-thunk';
import App from './containers/App';
import { Provider } from 'react-redux';

// define initial states for reudux
const initState = {
	messages: {
		messages: {
			content: [{messageID: 0, username: 'loading ...', content: 'loading ...'}]
		},
		isFetching: false
	},
	addMessageModal: {
		show: false
	}
};

// // for development environment

const store = createStore(reducers, initState, applyMiddleware(thunk, logger), );

// for production environment
// const store = createStore(reducers, initState, applyMiddleware(thunk), );

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root') as HTMLElement
);

registerServiceWorker();
