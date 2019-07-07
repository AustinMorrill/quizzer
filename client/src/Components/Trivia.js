import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import TriviaProvider from "../TriviaProvider.js"
import UserProvider from "../UserProviderHooks.js"
import Finished from "./Finished.js"
import Fade from "react-reveal/Fade"
import Tada from "react-reveal/Tada"
import Shake from "react-reveal/Shake"


export default withRouter(function Trivia(props) {
	const [correct, setCorrect] = useState(0)
	const [incorrect, setIncorrect] = useState(0)
	const triviaContext = React.useContext(TriviaProvider.context)
	const userContext = React.useContext(UserProvider.context)
	const [answered, setAnswered] = React.useState()
	const [currentQuestion, setCurrentQuestion] = useState({category: '', difficulty: '', question: '', correct_answer: '', incorrect_answer: '', type: '', answerArray: []})
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)
	const [currentQuestionArray, setCurrentQuestionArray] = useState()
	const [gotCorrect, setGotCorrect] = useState()
	const [finished, setFinished] = useState(false)

	//load first question
	useEffect(() => {
		if (triviaContext.finalAnswerArray.length === 0) props.history.push("/triviaStart")
		setFinished(false)
		if (triviaContext.finalAnswerArray.length > 4) {
			let {
				category,
				difficulty,
				type,
				question,
				correct_answer,
				incorrect_answers
			} = triviaContext.finalAnswerArray[0]
			let incorrectanswers
			incorrect_answers.length === 1
				? (incorrectanswers = [atob(incorrect_answers[0]) + ""])
				: (incorrectanswers = [
						atob(incorrect_answers[0]),
						atob(incorrect_answers[1]),
						atob(incorrect_answers[2])
				  ])
			correct_answer = atob(correct_answer)
			category = atob(category)
			difficulty = atob(difficulty)
			type = atob(type)
			question = atob(question)

			let answerArray = [correct_answer, ...incorrectanswers]
			answerArray =
				answerArray.length === 2
					? [answerArray[0], answerArray[1]]
					: shuffleArray([answerArray[0], answerArray[1], answerArray[2], answerArray[3]])
			setCurrentQuestion({ category, difficulty, question, correct_answer, answerArray, type })
		}	
	}, [])


	// Set display elements for question before being answered, updates when currentQuestion state is changed
	useEffect(()=>{
		if(currentQuestion.answerArray.length === 2){
			setCurrentQuestionArray(
				<Fade>
					<div className='flex flex-col border-solid border-black rounded-lg border-2 shadow-md py-2 px-2'>
						<Fade>
							<button
								className='hover:shadow-lg flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[0]}
							>
								{currentQuestion.answerArray[0]}
							</button>
							<button
								className='hover:shadow-lg flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[1]}
							>
								{currentQuestion.answerArray[1]}
							</button>
						</Fade>
					</div>
				</Fade>
			)
		} else {
			setCurrentQuestionArray(
				<Fade>
					<div className='flex flex-col border-solid border-black rounded-lg border-2 shadow-md py-2 px-2'>
						<Fade>
							<button
								className='hover:shadow-lg flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[0]}
							>
								{currentQuestion.answerArray[0]}
							</button>
							<button
								className='hover:shadow-lg hover:tracking-tighter flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[1]}
							>
								{currentQuestion.answerArray[1]}
							</button>
							<button
								className='hover:shadow-lg hover:tracking-tighter flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[2]}
							>
								{currentQuestion.answerArray[2]}
							</button>
							<button
								className='hover:shadow-lg hover:tracking-tighter flex-1 my-2 bg-tc-lighter text-xl hover:bg-tc-light text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
								onClick={e => checkCorrect(e)}
								value={currentQuestion.answerArray[3]}
							>
								{currentQuestion.answerArray[3]}
							</button>
						</Fade>
					</div>
				</Fade>
			)
		}
	},[currentQuestion])

	//gets next question
	const getNextQuestion = () => {
			if(currentQuestionNumber < triviaContext.totalQuestions){
				if(triviaContext.finalAnswerArray.length > 4) {
				let {category, difficulty, type, question, correct_answer, incorrect_answers } = triviaContext.finalAnswerArray[currentQuestionNumber]
				let incorrectanswers 
				incorrect_answers.length === 1
					? incorrectanswers = [atob(incorrect_answers[0]) + '']
					: incorrectanswers = [atob(incorrect_answers[0]), atob(incorrect_answers[1]), atob(incorrect_answers[2])]
				correct_answer = atob(correct_answer)
				category = atob(category)
				difficulty = atob(difficulty)
				type = atob(type)
				question = atob(question)
				

				let answerArray = [correct_answer, ...incorrectanswers]
				answerArray =
					answerArray.length === 2
						? [answerArray[0], answerArray[1]]
						: shuffleArray([
								answerArray[0],
								answerArray[1],
								answerArray[2],
								answerArray[3],
								])
				setCurrentQuestion({category, difficulty, question, correct_answer, answerArray, type})
				setCurrentQuestionNumber(prev => prev + 1)
				setAnswered(false)
			}		
		} else {
			setFinished(true)
		}
	}

	const shuffleArray = array => {
		let currentIndex = 4
		let temporaryValue, randomIndex
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}
		return array
	}


	const checkCorrect = e => {
		console.log(e.target.value)
		console.log(currentQuestion.correct_answer)
		if (e.target.value === currentQuestion.correct_answer) {
			console.log("correct!", e.target.value, currentQuestion.correct_answer)
			setCorrect(prev => prev + 1)
			setGotCorrect(true)
			setAnswered(true)
		} else {
			console.log("incorrect!")
			setIncorrect(prev => prev + 1)
			setGotCorrect(false)
			setAnswered(true)
		}
		setCurrentQuestionArrayAnswered()		
	}

	const setAllStats = () => {
		
	}

	//set styling for elements for after question has been answered, highlights correct and incorrect answers
	const setCurrentQuestionArrayAnswered = () => {
		if (currentQuestion.answerArray.length === 2){
				setCurrentQuestionArray(
					<div className='flex flex-col border-solid border-black rounded-lg border-2 py-2 px-2'>
						<div
							className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
							style={
								currentQuestion.answerArray[0] === currentQuestion.correct_answer
									? { background: "#9bfbc9" }
									: { background: "#ff8618" }
							}
							value={currentQuestion.answerArray[0]}
						>
							{currentQuestion.answerArray[0]}
						</div>
						<div
							className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
							style={
								currentQuestion.answerArray[1] === currentQuestion.correct_answer
									? { background: "#9bfbc9" }
									: { background: "#ff8618" }
							}
							value={currentQuestion.answerArray[1]}
						>
							{currentQuestion.answerArray[1]}
						</div>
					</div>
				)			
		} else {
			setCurrentQuestionArray(
				<div className='flex flex-col border-solid border-black rounded-lg border-2 py-2 px-2'>
					<div
						className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
						style={
							currentQuestion.answerArray[0] === currentQuestion.correct_answer
								? { background: "#9bfbc9" }
								: { background: "#ff8618" }
						}
						value={currentQuestion.answerArray[0]}
					>
						{currentQuestion.answerArray[0]}
					</div>
					<div
						className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
						style={
							currentQuestion.answerArray[1] === currentQuestion.correct_answer
								? { background: "#9bfbc9" }
								: { background: "#ff8618" }
						}
						value={currentQuestion.answerArray[1]}
					>
						{currentQuestion.answerArray[1]}
					</div>
					<div
						className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
						style={
							currentQuestion.answerArray[2] === currentQuestion.correct_answer
								? { background: "#9bfbc9" }
								: { background: "#ff8618" }
						}
						value={currentQuestion.answerArray[2]}
					>
						{currentQuestion.answerArray[2]}
					</div>
					<div
						className='text-center flex-1 my-2 bg-tc-lighter text-xl shadow-inner-md text-gray-800 text-bold text-xl font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none'
						style={
							currentQuestion.answerArray[3] === currentQuestion.correct_answer
								? { background: "#9bfbc9" }
								: { background: "#ff8618" }
						}
						value={currentQuestion.answerArray[3]}
					>
						{currentQuestion.answerArray[3]}
					</div>
				</div>
			)
		}
	}

	return (
		<Fade>
			<div
				className='container mx-auto w-screen flex flex-col items-center'
				style={{ height: "85vh" }}
			>
				<Fade spy={finished}>
					<div
						className='mt-8 flex flex-col justify-start w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 border-tc-darker p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg transition-all transition-duration-500 static'
						style={{ height: "auto" }}
					>
						{!finished ? (
							<Fade>
								<>
									<Fade>
										<Fade spy={currentQuestion.question}>
											<div className='flex flex-col text-2xl select-none text-center mb-2 leading-none'>
												{currentQuestion.question}
											</div>
										</Fade>
										<div className='flex flex-col'>{currentQuestionArray}</div>
										<div>
											{!answered ? (
												<div className='h-5 text-white my-3'>_</div>
											) : gotCorrect ? (
												<Fade duration={400}>
													<div className='flex flex-col justify-center items-center'>
														<Tada>
															<div className='bg-tc-lighter my-2 text-center w-7/12 text-black text-2xl font-bold border-t-4 border-tc-darkest rounded px-4 py-2 shadow-md'>
																Correct!
															</div>
														</Tada>
														{currentQuestionNumber === triviaContext.totalQuestions ? (
															<button
																className='w-7/12 text-center flex-1 my-2 bg-tc-lighter hover:bg-tc-light text-black text-bold text-2xl font-semibold py-2 px-4 border-4 border-tc-dark rounded shadow-md transition-all transition-duration-500 outline-none'
																onClick={() => getNextQuestion()}
															>
																Goto Final Results
															</button>
														) : (
															<Fade delay={500}>
																<button
																	className='w-7/12 text-center flex-1 my-2 bg-tc-lighter hover:bg-tc-light text-black text-bold text-2xl font-semibold py-2 px-4 border-4 border-tc-dark rounded shadow-md transition-all transition-duration-500 outline-none'
																	onClick={() => getNextQuestion()}
																>
																	Next Question
																</button>
															</Fade>
														)}
													</div>
												</Fade>
											) : (
												<Fade duration={500}>
													<div className='flex flex-col justify-center items-center'>
														<Shake>
															<div className='bg-tc2-light text-center text-white w-7/12 text-2xl my-2 border-t-4 border-tc2-lighter font-bold rounded px-4 py-2 shadow-md outline-none'>
																You got it wrong.
															</div>
														</Shake>
														{currentQuestionNumber === triviaContext.totalQuestions ? (
															<button
																className='w-7/12 text-center flex-1 my-2 bg-tc-lighter hover:bg-tc-light text-black text-bold text-2xl font-semibold py-2 px-4 border-4 border-tc-dark rounded shadow-md transition-all transition-duration-500 outline-none'
																onClick={() => getNextQuestion()}
															>
																Goto Final Results
															</button>
														) : (
															<Fade delay={500}>
																<button
																	className='border-2 w-7/12 text-center flex-1 my-2 bg-tc-lighter hover:bg-tc-light text-black text-bold text-2xl font-semibold py-2 px-4 border-4 border-tc-dark rounded shadow-md transition-all transition-duration-500 outline-none focus:outline-none'
																	onClick={() => getNextQuestion()}
																>
																	Next Question
																</button>
															</Fade>
														)}
													</div>
												</Fade>
											)}
										</div>
										<div className='flex flex-col items-center text-xl'>
											<div>Category: {currentQuestion.category}</div>
											<div>
												Current Question: {currentQuestionNumber} of{" "}
												{triviaContext.totalQuestions}
											</div>
											<div>
												Difficulty:{" "}
												{currentQuestion.difficulty.charAt(0).toUpperCase() +
													currentQuestion.difficulty.slice(1)}
											</div>
										</div>
									</Fade>
								</>
							</Fade>
						) : (
							<Finished correct={correct} incorrect={incorrect} />
						)}
					</div>
				</Fade>
			</div>
		</Fade>
	)
})


