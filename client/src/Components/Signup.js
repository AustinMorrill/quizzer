import React, { useState } from 'react'
// import { withUser } from '../UserProvider.js'
import UserProviderHooks from '../UserProviderHooks.js'

export default function (props) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const userContext = React.useContext(UserProviderHooks.context)

	const handleSubmit = (e) => {
		e.preventDefault()
		userContext
			.signup({ username, password })
			.then(() => props.history.push("/triviaStart"))
			.catch(err => {
				setErrorMessage(err.response.data.message)
			})
	}

	return (
		<div className='signup__container'>
			<form className='form-wrapper' onSubmit={handleSubmit}>
				<h3>Sign-up</h3>
				<input
					value={username}
					name="username"
					type="text"
					placeholder="username"
					onChange={e=>setUsername(e.target.value)}
					required
					/>
				<input
					value={password}
					name="password"
					type="password"
					placeholder="Password"
					onChange={e=>setPassword(e.target.value)}
					required
					/>
				<button>Create Account</button>
			</form>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
		</div>

	)

}