import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios'
import TriviaProvider from "./TriviaProvider"

const triviaAxios = Axios.create()

const context = createContext(null)

triviaAxios.interceptors.request.use(config => {
	const token = localStorage.getItem("token")
	config.headers.Authorization = `Bearer ${token}`
	return config
})


export default function UserProvider({children}) {
	const [stats, setStats] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})
	const [token, setToken] = useState(localStorage.getItem("token") || "")
	const triviaContext = React.useContext(TriviaProvider.context)
	

	const getStats = () => {
			return triviaAxios.get("/api/stat").then(response => {
			this.setState({ stats: response.data })
			return response
		})
	}

	const login = credentials => {
		return triviaAxios.post("/auth/login", credentials).then(response => {
			const { token, user } = response.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			setUser(user)
			setToken(token)
			return response
		})
	}

	const signup = userInfo => {
		return triviaAxios.post("/auth/signup", userInfo).then(response => {
			const { user, token } = response.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			setUser(user)
			setToken(token)
			return response
		})
	}

	const	logout = () => {
			localStorage.removeItem("user")
			localStorage.removeItem("token")
			setUser({})
			setToken("")
			setStats([])
			// console.log(triviaContext)
			// triviaContext.setTriviaQuestion({ answerArray: [] })
		}

	return (
		<context.Provider
			value={{
				stats: stats,
				user: user,
				token: token,
				login: login,
				signup: signup,
				logout: logout,
				getStats: getStats
			}} >
			{children}
		</context.Provider>
	)
}

UserProvider.context = context