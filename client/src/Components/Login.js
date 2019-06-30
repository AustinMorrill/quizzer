import React, { useState } from "react"
// import { withUser } from "../UserProvider.js"
import TriviaProvider from "../TriviaProvider.js"
import UserProviderHooks from '../UserProviderHooks'
import { Link } from "react-router-dom"

const Login = (props) => {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [errorMessage, setErrorMessage] = useState('')
 
const userContext = React.useContext(UserProviderHooks.context)
const triviaContext = React.useContext(TriviaProvider.context)

 const clearinputs = () => {
	 setUsername('')
	 setPassword('')
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
			console.log('fired')
			setErrorMessage(err.response.data.message)
			clearinputs()
		})		
}

return (
	<div className='h-screen container mx-auto w-screen flex flex-col justify-center items-center'>
		<div className='flex justify-center items-center w-9/10 sm:w-1/3 md:1/4 border-tc-darker p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg'>
			<form className='flex flex-col item-center justify-center w-full' onSubmit={handleSubmit}>
				<h3 className='mb-4 text-center text-xl'>Login to begin trivia.</h3>
				<label class='font-bold text-gray-700 block mb-2'>Username</label>
				<input
					className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-600 px-2 py-2 rounded shadow transition-all outline-none focus:shadow-outline focus:bg-tc-lightest opacity-50'
					onChange={e => setUsername(e.target.value)}
					value={username}
					name='username'
					type='text'
					placeholder='username'
					required
				/>
				<label class='font-bold text-gray-700 block mb-2'>Password</label>
				<input
					className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-600 px-2 py-2 rounded shadow transition-all outline-none focus:shadow-outline focus:bg-tc-lightest opacity-50'
					onChange={e => setPassword(e.target.value)}
					value={password}
					name='password'
					type='password'
					placeholder='password'
					required
				/>
				<div>
					<button
						className='bg-tc hover:bg-tc-darker text-gray-100 hover:text-tc2 font-bold my-2 py-2 px-3 rounded w-1/3 transition-all'
						type='submit'
					>
						Submit
					</button>
					{errorMessage && <span className='text-red-500 ml-2 align-self-bottom'>{errorMessage}</span>}
					<a
						className='no-underline inline-block align-baseline font-bold text-xs text-blue-400 hover:text-blue-dark float-right'
						href='#'
					>
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
		<p className='text-grey-dark text-sm transition-all'>
			Don't have an account?
			<Link className='no-underline text-blue-400 font-bold' to='/signup'>
				Create an Account
			</Link>
		</p>
	</div>
)}


export default Login
