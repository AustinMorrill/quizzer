import React, { useState, useEffect } from "react"
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

	useEffect(()=> {
		triviaContext.setTriviaQuestion({ answerArray: []})
	}, [])

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
			setErrorMessage(err.response.data.message)
			clearinputs()
		})		
}

return (
	<div className='container mx-auto w-screen flex flex-col items-center' style={{ height: "85vh" }}>
		<div className='flex justify-center items-center w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 border-tc-darker p-8 border-t-8 bg-white mt-24 rounded-lg shadow-lg'>
			<form className='flex flex-col item-center justify-center w-full' onSubmit={handleSubmit}>
				<h3 className='mb-4 text-center text-xl'>Login to begin trivia.</h3>
				<label className='font-bold text-gray-700 block mb-2'>Username</label>
				<input
					className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-600 px-2 py-2 rounded shadow transition-all outline-none focus:shadow-outline focus:bg-tc-lightest opacity-50'
					onChange={e => setUsername(e.target.value)}
					value={username}
					name='username'
					type='text'
					placeholder='username'
					required
				/>
				<label className='font-bold text-gray-700 block mb-2'>Password</label>
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
						className='bg-tc hover:bg-tc-darker text-center text-white hover:text-black font-bold my-2 py-2 rounded w-1/3 transition-all'
						type='submit'
					>
						Submit
					</button>

					<a
						className='no-underline inline-block align-baseline font-bold text-xs text-blue-400 hover:text-blue-dark float-right'
						href='#'
					>
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
		<p className='text-grey-dark text-sm transition-all mt-4'>
			Don't have an account? {"  "}
			<Link className='no-underline text-blue-400 font-bold' to='/signup'>
				Create an Account
			</Link>
		</p>
		{errorMessage && !username && !password && (
			<h3 className='mb-4 text-center text-red-600 text-xl transition-all'>{errorMessage}.</h3>
		)}
	</div>
)}


export default Login
