import React, { useState, useEffect } from 'react'
import Axios from 'axios'
const api = 'https://opentdb.com/api.php?'
const context = React.createContext(null)

export default function TriviaProvider({children}) {
	const triviaCategories = [
				{
					id: 9,
					name: "General Knowledge"
				},
				{
					id: 10,
					name: "Entertainment: Books"
				},
				{
					id: 11,
					name: "Entertainment: Film"
				},
				{
					id: 12,
					name: "Entertainment: Music"
				},
				{
					id: 13,
					name: "Musicals & Theatres"
				},
				{
					id: 14,
					name: "Television"
				},
				{
					id: 15,
					name: "Video Games"
				},
				{
					id: 16,
					name: "Board Games"
				},
				{
					id: 17,
					name: "Science & Nature"
				},
				{
					id: 18,
					name: "Science: Computers"
				},
				{
					id: 19,
					name: "Science: Mathematics"
				},
				{
					id: 20,
					name: "Mythology"
				},
				{
					id: 21,
					name: "Sports"
				},
				{
					id: 22,
					name: "Geography"
				},
				{
					id: 23,
					name: "History"
				},
				{
					id: 24,
					name: "Politics"
				},
				{
					id: 25,
					name: "Art"
				},
				{
					id: 26,
					name: "Celebrities"
				},
				{
					id: 27,
					name: "Animals"
				},
				{
					id: 28,
					name: "Vehicles"
				},
				{
					id: 29,
					name: "Comics"
				},
				{
					id: 30,
					name: "Science: Gadgets"
				},
				{
					id: 31,
					name: "Japanese Anime & Manga"
				},
				{
					id: 32,
					name: "Cartoon & Animations"
				}
			]
	const [apiKey, setApiKey] = useState('')

		const getApiKey = () => {
		Axios
		.get('https://opentdb.com/api_token.php?command=request')
		.then(response => {
					setApiKey(response.data.token)
				})
		.catch(err => console.log(err))
	}

	return (
			<context.Provider
				value={{
					getApiKey: getApiKey,
					apiKey: apiKey
				}}
			>
				{children}
			</context.Provider>
		)

}

TriviaProvider.context = context