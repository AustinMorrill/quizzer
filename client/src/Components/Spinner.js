import React from 'react'
import './Spinner.css'

const Spinner = () => {
	return (
		<div className='cssload-loader cursor-wait flex justify-center align-middle items-center self-center'>
			<div className='cssload-inner cssload-one' />
			<div className='cssload-inner cssload-two' />
			<div className='cssload-inner cssload-three' />
		</div>
	)
}

export default Spinner