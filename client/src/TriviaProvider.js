import React, { useState } from 'react'
import Axios from 'axios'
import { sanitize } from "dompurify" //protects from potential xss attacks when using dangerouslySetInnerHTML
const api = 'https://opentdb.com/api.php'
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
	const [apiKey, setApiKey] = useState(``)
	const [options, setOptions] = useState([5, 'mixed', [9]])
	const [triviaQuestion, setTriviaQuestion] = useState()
	const [finalAnswerArray, setFinalAnswerArray] = useState([])
	const [totalQuestions, setTotalQuestions] = useState()

	const getApiKey = () => {
		Axios
		.get('https://opentdb.com/api_token.php?command=request')
		.then(response => {
					setApiKey(`&token=${response.data.token}`)
				})
		.catch(err => console.log(err))
	}

	const optionsFunc = (questions, difficulty, categories) => {
		setOptions([questions, difficulty, categories])
	}

	const getAllQuestions = async(questions, difficulty, categories) => {
		let finalQuestions = []
		let getDifficulty =
			difficulty === "easy" || difficulty === "medium" || difficulty === "hard"
				? `&difficulty=${difficulty}`
				: ``

		for(let i = 0; i < questions; i++){
			let getCategory =
				categories.length !== 0
					? `&category=${categories[Math.floor(Math.random() * categories.length)]}`
					: ``
			await getQuestion(getDifficulty, getCategory).then((data)=>{
				console.log(data)
				finalQuestions.push(...data)
			})
	}
	setFinalAnswerArray(finalQuestions)
	setTotalQuestions(questions)
}

	const getQuestion = (difficulty, categories) => {
		let getQuestions = `?amount=1`

		return new Promise((resolve, reject) => {
			Axios.get(api + getQuestions + difficulty + categories + "&encode=base64" + apiKey)
			.then(response => {
				return resolve(response.data.results)
			})
			.catch(err => {
				return reject(err.message)
			})
		})
	}


	return (
		<context.Provider
			value={{
				getApiKey,
				options,
				optionsFunc,
				getQuestion,
				apiKey,
				triviaQuestion,
				setTriviaQuestion,
				getAllQuestions,
				setFinalAnswerArray,
				finalAnswerArray,
				totalQuestions
			}}
		>
			{children}
		</context.Provider>
	)

}

TriviaProvider.context = context