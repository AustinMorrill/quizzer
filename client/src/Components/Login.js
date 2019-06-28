import React, { useState } from "react"
// import { withUser } from "../UserProvider.js"
import TriviaProvider from "../TriviaProvider.js"
import UserProviderHooks from '../UserProviderHooks'

const Login = (props) => {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [errorMessage, setErrorMessage] = useState('')
 
const userContext = React.useContext(UserProviderHooks.context)
const triviaContext = React.useContext(TriviaProvider.context)

 const clearinputs = () => {
	 setUsername('')
	 setPassword('')
	 setErrorMessage('')
 }

const handleSubmit = e => {
	e.preventDefault()
	userContext
		.login({ username, password })
		.then(() => {
			triviaContext.getApiKey()
			props.history.push("/triviaStart")
		})
		.catch(err => {
			setErrorMessage(err.response.data.message)
			clearinputs()
		})		
}

return (
	<div className='login__container'>
		<form className='form-wrapper' onSubmit={handleSubmit}>
			<h3>Log In</h3>
			<input
				onChange={e => setUsername(e.target.value)}
				value={username}
				name='username'
				type='text'
				placeholder='username'
				required
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				name='password'
				type='password'
				placeholder='password'
				required
			/>
			<button type='submit'>Submit</button>
		</form>
		<button onClick={() => console.log(userContext)}>click</button>
		{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
	</div>
)}


export default Login
