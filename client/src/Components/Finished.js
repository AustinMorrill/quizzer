import React, { useEffect, useState, useContext } from 'react';
import TriviaProvider from "../TriviaProvider"
import UserProvider from "../UserProviderHooks.js"
import Chart from "chart.js"
import { Link } from "react-router-dom"
// import classes from "./LineGraph.module.css"

const Finished = (props) => {
	 let chartRef = React.createRef()
	 const triviaContext = useContext(TriviaProvider)
	 const userContext = useContext(UserProvider.context) 
	 const [percentCorrect, setPercentCorrect] = useState()
	 const [finalMessage, setFinalMessage] = useState()

	useEffect(()=>{
		const myChartRef = chartRef.current.getContext("2d")
		setPercentCorrect(props.correct / (props.correct + props.incorrect))

		new Chart(myChartRef, {
			type: "doughnut",
			data: {
				//Bring in data
				labels: ["Correct", "Incorrect"],
				datasets: [
					{
						label: "Correct Answers",
						data: [props.correct, props.incorrect],
						backgroundColor: ["rgba(91, 236, 163, 0.2)", "rgba(237, 105, 0, 0.2)"],
						borderColor: ["#40e394", "#d25200"],
						borderWidth: 1
					}
				]
			},
			options: {
				//Customize chart options
			}
		})
		finalMessageSetter()
	},[])

	const finalMessageSetter = () => {
		if((props.correct / (props.correct + props.incorrect)) === 0) setFinalMessage(<div>Uh...wow. Were you trying to get them all wrong?</div>)
		if((props.correct / (props.correct + props.incorrect)) > 0) setFinalMessage(<div>Hey....At least you didn't get 0?</div>)
		if((props.correct / (props.correct + props.incorrect)) >= .2) setFinalMessage(<div>Okay on the bottom rung there, maybe take a break?</div>)
		if((props.correct / (props.correct + props.incorrect)) >= .4) setFinalMessage(<div>The good news is you have some upside.</div>)
		if((props.correct / (props.correct + props.incorrect)) >= .6) setFinalMessage(<div>You did pretty well but you can do better!</div>)
		if((props.correct / (props.correct + props.incorrect)) >= .8) setFinalMessage(<div>So close to achieving true greatness.</div>)
		if((props.correct / (props.correct + props.incorrect)) === 1) setFinalMessage(<div>You are the champion my friend.</div>)
	}
	
	
	return (
		<div className="w-full flex flex-col justify-center items-center text-xl">
			<h2 className="text-3xl text-center underline">Results</h2>
			<div>{userContext.user["username"]} you got {(percentCorrect * 100).toFixed(0)}% of your questions right. </div>
			<div>{finalMessage}</div>

			<div className='w-7/12 h-auto'>
				<canvas id='myChart' ref={chartRef} />
			</div>
				<Link className='border-2 w-4/12 text-center flex-1 my-2 bg-tc-lighter hover:bg-tc-light text-black text-bold text-2xl font-semibold py-2 px-4 border-4 border-tc-dark rounded shadow-md transition-all transition-duration-500 outline-none focus:outline-none' to='/'>Play again?</Link>
		</div>
	)
}

export default Finished;
