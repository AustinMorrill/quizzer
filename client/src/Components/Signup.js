import React, { useState } from 'react'
// import { withUser } from '../UserProvider.js'
import UserProviderHooks from '../UserProviderHooks.js'
import { Link } from "react-router-dom"

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
		<div className='h-screen container mx-auto w-screen flex flex-col justify-center items-center'>
			<div className='flex justify-center items-center w-9/10 sm:w-1/3 md:1/4 border-tc-darker p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg'>
				<form className='flex flex-col item-center justify-center w-full' onSubmit={handleSubmit}>
					<h3 className='mb-4 text-center text-xl'>Sign-up to begin trivia.</h3>
					<label class='font-bold text-grey-darker block mb-2'>Username</label>
					<input
						className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-600 px-2 py-2 rounded shadow transition-all outline-none focus:shadow-outline focus:bg-tc-lightest opacity-50'
						value={username}
						name='username'
						type='text'
						placeholder='username'
						onChange={e => setUsername(e.target.value)}
						required
					/>
					<label class='font-bold text-grey-darker block mb-2'>Password</label>
					<input
						className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-600 px-2 py-2 rounded shadow transition-all outline-none focus:shadow-outline focus:bg-tc-lightest opacity-50'
						value={password}
						name='password'
						type='password'
						placeholder='Password'
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<div>
						<button className='bg-tc hover:bg-tc-darker text-gray-100 hover:text-tc2 font-bold my-2 py-2 px-3 rounded w-1/3 transition-all'>
							Create Account
						</button>
						{errorMessage && (
							<span className='inline-flex text-red-500 ml-2 align-self-bottom'>
								{errorMessage}
							</span>
						)}
					</div>
				</form>
			</div>
			<p className='text-grey-dark text-sm transition-all'>
				Already have an account?
				<Link className='no-underline text-blue-400 font-bold' to='/login'>
					Login
				</Link>
			</p>
		</div>
	)

}