import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
// import UserProvider from "./UserProvider.js"
import TriviaProvider from "./TriviaProvider.js"
import UserProviderHooks from './UserProviderHooks'

ReactDOM.render(
	<UserProviderHooks>
		<TriviaProvider>
			<App />
		</TriviaProvider>
	</UserProviderHooks>
	,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
