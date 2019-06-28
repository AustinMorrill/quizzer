import React, { Suspense, lazy } from 'react';
import './App.css';
// import Login from "./Components/Login.js"
// import Signup from "./Components/Signup.js"
// import triviaStart from "./Containers/TriviaStart.js"
import Navbar from './Components/Navbar.js'
import ProtectedRoute from "./Components/ProtectedRoute.js"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Spinner from './Components/Spinner'

const Login = lazy(() => import('./Components/Login.js'))
const Signup = lazy(() => import('./Components/Signup.js'))
const triviaStart = lazy(() => import('./Containers/TriviaStart.js'))

const  App = () => {
  return (
		<Router>
			<>
				<Navbar />
				<Suspense fallback={<Spinner />}>
					<div className='content__container'>
						<Switch>
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
							<ProtectedRoute path='/triviaStart' component={triviaStart} />
							<Route exact path='/' render={() => <Redirect to='/triviaStart' />} />
						</Switch>
					</div>
				</Suspense>
			</>
		</Router>
	)
}

export default App;

// function App(props) {
//   return (
// 		<div className='App'>
// 			<Navbar />
// 			<Switch>
//         <Route path='/signup' component={Signup} />
// 				<Route path='/login' component={Login} />
//         <ProtectedRoute path="/triviaStart" component={triviaStart} />
// 				<Route exact path="/" render={() => <Redirect to="/triviaStart"/>} />
// 			</Switch>
// 		</div>
// 	)
// }

// export default App;
