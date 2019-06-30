import React from 'react'
import './Spinner.css'

const Spinner = () => {
	return (
	<div className="cssload-loader cursor-wait">
		<div className="cssload-inner cssload-one"></div>
		<div className="cssload-inner cssload-two"></div>
		<div className="cssload-inner cssload-three"></div>
	</div>
	)
}

export default Spinner