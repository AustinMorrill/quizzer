import React, { useState, useReducer, useEffect } from 'react';
import TriviaProvider from "../TriviaProvider"
import UserProvider from "../UserProviderHooks"
import Select from "react-select"
import Modal from "react-modal"
import Fade from "react-reveal/Fade"
import Spinner from "./Spinner"

const selectOptionsDifficulty = [
	{ value: 'easy', label: 'Easy' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'hard', label: 'Hard' },
	{ value: 'mixed', label: 'Mixed' },
]

const selectOptionsQuestions = [
	{ value: 5, label: 'Five'},
	{ value: 10, label: 'Ten'},
	{ value: 25, label: 'Twenty Five'},
	{ value: 50, label: 'Fifty'}
]

Modal.setAppElement("#root")

const triviaCategoriesState = [
				{
					id: 9,
					name: "General Knowledge",
					value: 'nine',
					checked: true
				},
				{
					id: 10,
					name: "Books",
					value: 'ten',
					checked: false
				},
				{
					id: 11,
					name: "Film",
					value: 'eleven',
					checked: false
				},
				{
					id: 12,
					name: "Music",
					value: 'twelve',
					checked: false
				},
				{
					id: 13,
					name: "Musicals & Theater",
					value: 'thirteen',
					checked: false
				},
				{
					id: 14,
					name: "Television",
					value: 'fourteen',
					checked: false
				},
				{
					id: 15,
					name: "Video Games",
					value: 'fifteen',
					checked: false
				},
				{
					id: 16,
					name: "Board Games",
					value: 'sixteen',
					checked: false
				},
				{
					id: 17,
					name: "Science & Nature",
					value: 'seventeen',
					checked: false
				},
				{
					id: 18,
					name: "Computers",
					value: 'eightteen',
					checked: false
				},
				{
					id: 19,
					name: "Math",
					value: 'nineteen',
					checked: false
				},
				{
					id: 20,
					name: "Mythology",
					value: 'twenty',
					checked: false
				},
				{
					id: 21,
					name: "Sports",
					value: 'twentyone',
					checked: false
				},
				{
					id: 22,
					name: "Geography",
					value: 'twentytwo',
					checked: false
				},
				{
					id: 23,
					name: "History",
					value: 'twentythree',
					checked: false
				},
				{
					id: 24,
					name: "Politics",
					value: 'twentyfour',
					checked: false
				},
				{
					id: 25,
					name: "Art",
					value: 'twentyfive',
					checked: false
				},
				{
					id: 26,
					name: "Celebrities",
					value: 'twentysix',
					checked: false
				},
				{
					id: 27,
					name: "Animals",
					value: 'twentyseven',
					checked: false
				},
				{
					id: 28,
					name: "Vehicles",
					value: 'twentyeight',
					checked: false
				},
				{
					id: 29,
					name: "Comics",
					value: 'twentynine',
					checked: false
				},
				{
					id: 30,
					name: "Gadgets",
					value: 'thirty',
					checked: false
				},
				{
					id: 31,
					name: "Anime & Manga",
					value: 'thirtyone',
					checked: false
				},
				{
					id: 32,
					name: "Cartoon & Animations",
					value: 'thirtytwo',
					checked: false
				},
				{
					id: 33,
					name: "All Categories",
					value: 'addall',
					checked: false
				}
			]


const categoryReducer = (state, action) => {
	switch (action.type) {
		case "ADD_CAT":
			return state.map(cat => {
				if (cat.id === action.id) {
					return { ...cat, checked: true}
				} else {
					return cat
				}
			})
		case "DEL_CAT":
			return state.map(cat => {
				if (cat.id === action.id) {
					return { ...cat, checked: false }
				} else {
					return cat
				}				
			})
		case "ADD_ALL_CAT":
			return state.map(cat => {
				return { ...cat, checked: true}
			})
		case "REM_ALL_CAT":
			return state.map(cat => {
				return { ...cat, checked: false}
			})
		default:
			throw new Error("Unexpected action")
	}
}

const TriviaStart = (props) => {
	const [categorysState, dispatch] = useReducer(categoryReducer, triviaCategoriesState)
	const triviaContext = React.useContext(TriviaProvider.context) 
	const userContext = React.useContext(UserProvider.context) 
	const [selectedOption, setSelectedOption] = useState({ value: "easy", label: "Easy" })
	const [selectOptionsQuestinsValue, setSelectOptionsQuestinsValue] = useState({value: 5, label: "Five"})
	const [gettingQuestions, setGettingQuestions] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)

	
	useEffect(()=>{
		triviaContext.setFinalAnswerArray([])
		setGettingQuestions(false)
	},[])

	const handleSubmit = async(e) => {
		e.preventDefault()
		openModal()
		setGettingQuestions(true)
		await triviaContext.getAllQuestions(
			selectOptionsQuestinsValue.value,
			selectedOption.value,
			!categorysState["24"].checked
				? categorysState.filter(cat => cat.checked === true).map((e, i) => e.id)
				: [] //return array with category ids based on categories selected
		)
		props.history.push("/trivia")
}

	const handleChange = cat => {
		dispatch({ 
			type: !cat.checked ? "ADD_CAT" : "DEL_CAT", 
			id: cat.id })
	}

  const openModal = () => {
    setModalIsOpen(true)
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

	//create mapped category buttons with reducer build in
	const categorys = categorysState.map(cat => {
			return cat.id === 33 ? (
				<button
					className={
						cat.checked
							? "tracking-tighter h-auto w-7/12 my-1 mx-1 text-xl lg:text-2xl md:w-3/12 md:flex-none lg:w-1/4 bg-tc text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow-inner-md transition-all outline-none"
							: "h-auto w-7/12 my-1 mx-1 text-xl lg:text-2xl md:w-3/12 md:flex-none lg:w-1/4 bg-tc-lightest hover:bg-tc-lighter text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none"
					}
					id={cat.id}
					key={cat.id}
					value={cat.value}
					type='button'
					onClick={() => {
						dispatch({ type: !cat.checked ? "ADD_ALL_CAT" : "REM_ALL_CAT" })
					}}
				>
					{cat.name}
				</button>
			) : (
				<button
					className={
						cat.checked
							? "tracking-tighter h-24 sm:h-20 w-32 my-1 mx-1 text-xl lg:text-2xl md:w-3/12 md:flex-none lg:w-1/4 bg-tc text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow-inner-md transition-all outline-none"
							: "h-24 sm:h-20 w-32 my-1 mx-1 text-xl lg:text-2xl md:w-3/12 md:flex-none lg:w-1/4 bg-tc-lightest hover:bg-tc-lighter text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none"
					}
					id={cat.id}
					key={cat.id}
					value={cat.value}
					type='button'
					onClick={e => {
						handleChange(cat)
					}}
				>
					{cat.name}
				</button>
			)
		})

	return (
		<div>
			<div className='container mx-auto w-screen flex flex-col items-center'>
				<Fade>
				<div className='w-11/12 md:text-lg lg:text-xl flex flex-col justify-center'>
					<form
						className='w-full flex flex-col justify-center text-center'
						onSubmit={handleSubmit}
					>
						<h1 className='text-2xl'>Welcome to Trivia {userContext.user["username"]}!</h1>
						<p className='text-xl'>
							To start a game please select which categories you would like to answer questions
							from, as well as difficulty and how many questions you would like to do. Afterwards
							we will so how well you did!
						</p>
						<div className='flex flex-wrap justify-center'>
							{categorys}
							{/* displayed mapped category buttons  */}
						</div>

						<div className='flex justify-center'>
							<Select
								className='w-2/5 m-1'
								value={selectedOption}
								onChange={selectedOption => setSelectedOption(selectedOption)}
								options={selectOptionsDifficulty}
								theme={theme => ({
									...theme,
									borderRadius: 2,
									colors: {
										...theme.colors,
										primary25: "#9bfbc9",
										primary: "#5beca3"
									},
									alignItems: "center",
									alignText: "center",
									":before": {
										outline: "none"
									}
								})}
							/>
							<Select
								className='w-2/5 m-1'
								value={selectOptionsQuestinsValue}
								onChange={selectOptionsQuestionsValue =>
									setSelectOptionsQuestinsValue(selectOptionsQuestionsValue)
								}
								options={selectOptionsQuestions}
								theme={theme => ({
									...theme,
									borderRadius: 2,
									colors: {
										...theme.colors,
										primary25: "#9bfbc9",
										primary: "#5beca3"
									},
									alignItems: "center",
									alignText: "center",
									":before": {
										outline: "none"
									}
								})}
							/>
						</div>
						<button
							className='flex-1 w-7/12 my-2 mx-1 self-center md:w-5/12 md:flex-none bg-tc-lightest hover:bg-tc-lighter text-gray-900 font-bold py-2 px-4 border border-gray-400 rounded shadow-md transition-all transition-duration-500 outline-none text-2xl mb-24 h-auto'
							type='Submit'
						>
							Start Game!
						</button>
						<Fade>
						<Modal

							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal()}
							style={{
								overlay: {
									backgroundColor: 'rgba(0,0,0,.75)'
								},
								content: {
									top: "40%",
									left: "10%",
									right: "10%",
									bottom: "auto",
									padding: "0",
									// transform: "translate(-50%, -50%)",
									margin: "0"
								}
							}}
							contentLabel='Loading Modal'
						>
							<div className='text-center justify-left items-left w-full h-full bg-tc-lightest text-gray-900 font-bold py-4 px-4 shadow-inner-md transition-all transition-duration-500 outline-none text-2xl cursor-wait'>
								<p>Retrieving Questions.... </p> 
								<Spinner /> 
								<p> Setting up game</p>
							</div>
						</Modal>
						</Fade>
					</form>
					<button type='button' onClick={() => triviaContext.setFinalAnswerArray} />
				</div>
				</Fade>
			</div>
		</div>
	)
}

export default TriviaStart
