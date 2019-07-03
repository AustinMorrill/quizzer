import React, { useState } from 'react'
// import { withUser } from '../UserProvider.js'
import UserProviderHooks from '../UserProviderHooks.js'
import { Link } from "react-router-dom"

export default function(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const userContext = React.useContext(UserProviderHooks.context)

	const handleSubmit = e => {
		e.preventDefault()
		userContext
			.signup({ username, password })
			.then(() => props.history.push("/triviaStart"))
			.catch(err => {
				setErrorMessage(err.response.data.message)
			})
	}

	return (
		<div
			className='container mx-auto w-screen flex flex-col items-center'
			style={{ height: "85vh" }}
		>
			<div className='flex justify-center items-center w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 border-tc-darker p-8 border-t-8 bg-white mt-24 rounded-lg shadow-lg'>
				<form className='flex flex-col item-center justify-center w-full' onSubmit={handleSubmit}>
					<h3 className='mb-4 text-center text-xl'>Create an account.</h3>
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
							className='bg-tc w-5/12 hover:bg-tc-darker text-center text-white hover:text-black font-bold my-2 py-2 rounded transition-all'
							type='submit'
						>
							Sign-up
						</button>
					</div>
				</form>
			</div>
			<p className='text-grey-dark text-sm transition-all mt-4'>
				Already have an account? {"  "}
				<Link className='no-underline text-blue-400 font-bold' to='/login'>
					login.
				</Link>
			</p>
			{errorMessage && (
				<h3 className='mb-4 text-center text-red-600 text-xl transition-all'>{errorMessage}.</h3>
			)}
		</div>
	)
}