import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { withUser } from "../UserProvider"
import UserProviderHooks from '../UserProviderHooks.js'


export default function (props) {
	const userContext = React.useContext(UserProviderHooks.context)
	const { component: Component, ...rest } = props
	return userContext.token ? <Route {...rest} component={Component} /> : <Redirect to='/login' />
}

