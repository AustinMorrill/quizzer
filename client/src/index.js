import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
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
