import React, { Component } from "react"
import axios from "axios"
const { Provider, Consumer } = React.createContext()
const triviaAxios = axios.create()


triviaAxios.interceptors.request.use(config => {
	const token = localStorage.getItem("token")
	config.headers.Authorization = `Bearer ${token}`
	return config
})


export default class UserProvider extends Component {
	constructor() {
		super()
		this.state = {
			stats: [],
			user: JSON.parse(localStorage.getItem("user")) || {},
			token: localStorage.getItem("token") || ""
		}
	}

	componentDidMount() {
		this.getStats()
	}

	getStats = () => {
		return triviaAxios.get("/api/stat").then(response => {
			this.setState({ stats: response.data })
			return response
		})
	}

	// addTodo = newTodo => {
	// 	return triviaAxios.post("/api/todo/", newTodo).then(response => {
	// 		this.setState(prevState => {
	// 			return { todos: [...prevState.todos, response.data] }
	// 		})
	// 		return response
	// 	})
	// }

	// editTodo = (todoId, todo) => {
	// 	return triviaAxios.put(`/api/todo/${todoId}`, todo).then(response => {
	// 		this.setState(prevState => {
	// 			const updatedTodos = prevState.todos.map(todo => {
	// 				return todo._id === response.data._id ? response.data : todo
	// 			})
	// 			return { todos: updatedTodos }
	// 		})
	// 		return response
	// 	})
	// }

	// deleteTodo = todoId => {
	// 	return triviaAxios.delete(`/api/todo/${todoId}`).then(response => {
	// 		this.setState(prevState => {
	// 			const updatedTodos = prevState.todos.filter(todo => {
	// 				return todo._id !== todoId
	// 			})
	// 			return { todos: updatedTodos }
	// 		})
	// 		return response
	// 	})
	// }

	signup = userInfo => {
		return triviaAxios.post("/auth/signup", userInfo).then(response => {
			const { user, token } = response.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			this.setState({
				user,
				token
			})
			return response
		})
	}

	login = credentials => {
		return triviaAxios.post("/auth/login", credentials).then(response => {
			const { token, user } = response.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			this.setState({
				user,
				token
			})
			this.getStats()
			return response
		})
	}

	logout = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		this.setState({
			todos: [],
			user: {},
			token: ""
		})
	}

	render() {
		return (
			<Provider
				value={{
					getStats: this.getStats,
					// addTodo: this.addTodo,
					// editTodo: this.editTodo,
					// deleteTodo: this.deleteTodo,
					signup: this.signup,
					login: this.login,
					logout: this.logout,
					...this.state
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}

export const withUser = C => props => <Consumer>{value => <C {...value} {...props} />}</Consumer>