import React from "react"
import { Link } from "react-router-dom"
import UserProviderHooks from "../UserProviderHooks.js"
import Modal from "react-modal"

const Navbar = (props) => {
	const userContext = React.useContext(UserProviderHooks.context)
	const [modalIsOpen, setModalIsOpen] = React.useState(false)
	const areYouSure = () => {
		
	}
	return (
		<div className='flex items-center w-full'>
			{/* {!userContext.token ? (
				<div className='flex flex-row justify-center w-full'>
					<Link className='mx-5' to='/login'>Login</Link>
					<Link className='mx-5' to='/signup'>Signup</Link>
				</div>
			) : ( */}
				<div className='flex flex-row justify-center w-full border-bottom border-tc-darkest border-solid border-b text-2xl bg-tc-lightest'>
					<Link className='mx-5 text-gray-700 hover:text-gray-900' to='/'>Reset</Link>
					{/* <Link className='mx-5 text-gray-700 hover:text-gray-900' to='/triviaStart'>About</Link> */}
					{/* <button className='mx-5 self-end text-gray-700 hover:text-gray-900' onClick={userContext.logout}>Logout</button> */}
				</div>
			{/* )} */}
		</div>
	)
}

export default Navbar
