import React from "react"
import { Link } from "react-router-dom"
// import { withUser } from "../UserProvider.js"
import UserProviderHooks from "../UserProviderHooks.js"

const Navbar = (props) => {
	const userContext = React.useContext(UserProviderHooks.context)
	return (
		<div className='navBar color1'>
			{!userContext.token ? (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Signup</Link>
				</>
			) : (
				<>
					<Link to='/'>Start</Link>
					<Link to='/triviaStart'>About</Link>
					<button onClick={userContext.logout}>Logout</button>
				</>
			)}
		</div>
	)
}

export default Navbar
