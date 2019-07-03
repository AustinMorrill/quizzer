import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import TriviaProvider from "../TriviaProvider.js"
import UserProvider from "../UserProviderHooks.js"
import Spinner from './Spinner'
const classNames = require("classnames")


export default withRouter(function Trivia(){
	const [correct, setCorrect] = useState(0)
	const [incorrect, setIncorrect] = useState(0)
	const triviaContext = React.useContext(TriviaProvider.context)
	const userContext = React.useContext(UserProvider.context)
	const [questionGot, setQuestionGot] = React.useState({})
	const [answered, setAnswered] = React.useState(false)
	const [correctAnswer, setCorrectAnswer] = React.useState()
	const [gotCorrect, setGotCorrect] = React.useState()
	const [next, setNext] = React.useState()

	// useEffect (()=>{
	// 	console.log(triviaContext.getQuestion())
	// },[])

	useEffect (()=>{
		triviaContext.getQuestion()
		setAnswered(false)
		console.log(answered)
	}, [next])

	const checkCorrect = (e) => {
		setAnswered(true)
		console.log(triviaContext.triviaQuestion.correct_answer)
		if(e.target.value === triviaContext.triviaQuestion.correct_answer) {
			console.log("correct!", e.target.value, triviaContext.triviaQuestion.correct_answer)
			setCorrect(prev => prev + 1)
			setGotCorrect(true)
		} else {
			console.log('incorrect!')
			setIncorrect(prev => prev + 1)
			setGotCorrect(false)
		}
	}

	return (
		<div
			className='container mx-auto w-screen flex flex-col justify-center items-center'
			style={{ height: "85vh" }}
		>
			<div className='flex flex-row mt-3'>
				<button onClick={() => setNext(1)}>useEffect</button>
				<button onClick={() => setNext(3)}>useEffect</button>
				<button onClick={() => console.log(triviaContext.triviaQuestion)}>question</button>
				<button onClick={() => console.log(triviaContext.triviaQuestion.answerArray)}>
					answer array
				</button>
				<button onClick={() => console.log(triviaContext.triviaQuestion.correct_answer)}>
					local correct
				</button>
				<button onClick={() => console.log(next, answered)}>local correct</button>
			</div>
			<div className='flex flex-col justify-center sm:w-1/3 md:1/4 border-tc-darker p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg transition-all transition-duration-500'>
				{triviaContext.triviaQuestion.answerArray.length === 0 ? (
					<Spinner />
				) : triviaContext.triviaQuestion.answerArray.length === 2 ? (
					<div className='flex flex-col w-100'>
						<div>{triviaContext.triviaQuestion.question}</div>
						{!answered ? (
							<>
								<button
									className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
									onClick={e => checkCorrect(e)}
									value={triviaContext.triviaQuestion.answerArray[0]}
								>
									{String(triviaContext.triviaQuestion.answerArray[0])}
								</button>
								<button
									className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
									onClick={e => checkCorrect(e)}
									value={triviaContext.triviaQuestion.answerArray[1]}
								>
									{String(triviaContext.triviaQuestion.answerArray[1])}
								</button>
							</>
						) : (
							<>
								<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
									{String(triviaContext.triviaQuestion.answerArray[0])}
								</div>
								<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
									{String(triviaContext.triviaQuestion.answerArray[1])}
								</div>
							</>
						)}
					</div>
				) : (
					<div className='flex flex-col w-100'>
						<div>{triviaContext.triviaQuestion.question}</div>
						<div className='flex flex-col'>
							{!answered ? (
								<>
									<button
										className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
										onClick={e => checkCorrect(e)}
										value={triviaContext.triviaQuestion.answerArray[0]}
									>
										{String(triviaContext.triviaQuestion.answerArray[0])}
									</button>
									<button
										className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
										onClick={e => checkCorrect(e)}
										value={triviaContext.triviaQuestion.answerArray[1]}
									>
										{String(triviaContext.triviaQuestion.answerArray[1])}
									</button>
									<button
										className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
										onClick={e => checkCorrect(e)}
										value={triviaContext.triviaQuestion.answerArray[2]}
									>
										{String(triviaContext.triviaQuestion.answerArray[2])}
									</button>
									<button
										className='flex-1 my-2 mx-1 bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
										onClick={e => checkCorrect(e)}
										value={triviaContext.triviaQuestion.answerArray[3]}
									>
										{String(triviaContext.triviaQuestion.answerArray[3])}
									</button>
								</>
							) : (
								<>
									<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
										{String(triviaContext.triviaQuestion.answerArray[0])}
									</div>
									<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
										{String(triviaContext.triviaQuestion.answerArray[1])}
									</div>
									<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
										{String(triviaContext.triviaQuestion.answerArray[2])}
									</div>
									<div className='flex-1 my-2 mx-1 bg-gray-400 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'>
										{String(triviaContext.triviaQuestion.answerArray[3])}
									</div>
								</>
							)}
						</div>
					</div>
				)}
				<div className='flex flex-row'>
					{!answered ? (
						<div className='h-5 text-white my-3'>_</div>
					) : gotCorrect ? (
						<>
							<div className='bg-tc border-t-4 border-tc-lighter rounded text-teal-900 px-4 py-2 shadow-md'>
								Correct!
							</div>
							<button
								onClick={() => {
									setNext(prev => prev + 1)
								}}
							>
								Next
							</button>
						</>
					) : (
						<>
							<div className='bg-tc2 border-t-4 border-tc2-lighter text-white font-bold rounded px-4 py-2 shadow-md'>
								Incorrect
							</div>
							<button
								onClick={() => {
									setNext(prev => prev + 1)
								}}
							>
								Next
							</button>
						</>
					)}
				</div>
			</div>
			<div>Category: {triviaContext.triviaQuestion.gategory}</div>
			<div>Difficulty: {triviaContext.triviaQuestion.difficulty}</div>
			<div>Question: 0{triviaContext.triviaQuestion.gategory} of 10</div>
		</div>
	)
})