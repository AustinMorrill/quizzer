import React, { useState, useEffect } from 'react';
import TriviaProvider from "../TriviaProvider"
import Axios from 'axios';
import { sanitize } from "dompurify" //protects from potential xss attacks when using dangerouslySetInnerHTML
import styled from 'styled-components'

const TriviaStart = (props) => {
	const triviaContext = React.useContext(TriviaProvider.context) //Trivia Provider
	// const [qArray, setQArray] = useState([])
	const [nine, setNine] = useState('clicked')
	const [ten, setTen] = useState('unclicked')
	const [eleven, setEleven] = useState('unclicked')
	// const [nineButton, setNineButton] = useState('unclicked')



	const triviaCategories = [
				{
					id: 9,
					name: "General Knowledge",
					value: 'nine'
				},
				{
					id: 10,
					name: "Entertainment: Books",
					value: 'ten'
				},
				{
					id: 11,
					name: "Entertainment: Film",
					value: 'eleven'
				},
				{
					id: 12,
					name: "Entertainment: Music",
					value: 'twelve'
				},
				{
					id: 13,
					name: "Musicals & Theatres",
					value: 'thirteen'
				},
				{
					id: 14,
					name: "Television",
					value: 'fourteen'
				},
				{
					id: 15,
					name: "Video Games",
					value: 'fifteen'
				},
				{
					id: 16,
					name: "Board Games",
					value: 'sixteen'
				},
				{
					id: 17,
					name: "Science & Nature",
					value: 'seventeen'
				},
				{
					id: 18,
					name: "Science: Computers",
					value: 'eightteen'
				},
				{
					id: 19,
					name: "Science: Mathematics",
					value: 'nineteen'
				},
				{
					id: 20,
					name: "Mythology",
					value: 'twenty'
				},
				{
					id: 21,
					name: "Sports",
					value: 'twentyone'
				},
				{
					id: 22,
					name: "Geography",
					value: 'twentytwo'
				},
				{
					id: 23,
					name: "History",
					value: 'twentythree'
				},
				{
					id: 24,
					name: "Politics",
					value: 'twentyfour'
				},
				{
					id: 25,
					name: "Art",
					value: 'twentyfive'
				},
				{
					id: 26,
					name: "Celebrities",
					value: 'twentysix'
				},
				{
					id: 27,
					name: "Animals",
					value: 'twentyseven'
				},
				{
					id: 28,
					name: "Vehicles",
					value: 'twentyeight'
				},
				{
					id: 29,
					name: "Comics",
					value: 'twentynine'
				},
				{
					id: 30,
					name: "Science: Gadgets",
					value: 'thirty'
				},
				{
					id: 31,
					name: "Japanese Anime & Manga",
					value: 'thirtyone'
				},
				{
					id: 32,
					name: "Cartoon & Animations",
					value: 'thirtytwo'
				}
			]
	
	const Button = styled.button`
		cursor: pointer;
		color: #cb7432;
		height: 55px;
		width: 80%;
		padding-left: 15pt;
		border-radius: 15px;
		border: solid black 1pt;
		transition: all 0.4s ease-in-out;
		background-image: linear-gradient(to right, #12d3cf, #67eaca, #b0f4e6, #12d3cf);
		background-size: 300% 100%;
		:disabled {
			opacity: 0.4;
		}
		:hover {
			background-position: 100% 0;
			transition: all 0.6s ease-in-out;
		}
	`
	let qArray = [31]
	const addQArray = (id) => {
		if (qArray.findIndex((e) => e === id) === -1){
			qArray.push(id)			
		} else {
			qArray.splice(qArray.indexOf(id), 1)
		}
	}

	
	const triviaCategoryCheckBoxes = triviaCategories.map((category, i) => {
		const index = i + 9
		let setCategory = `set${category.id}`
		let id = category.id
		let clickedStyle = 'unchecked'
		
		return (
			<button
				className={clickedStyle}
				key={i}
				value={category.value}
				name={category.id}
				onClick={() => addQArray(id)}
				checked={id}
			>
				{category.name}
			</button>
		)
	})
	

	return (
		<div>
			Trivia Start
			{triviaCategoryCheckBoxes}
			<button onClick={() => console.log(qArray)}>blic</button>
		</div>
	)
}

export default TriviaStart
