import React from 'react'
import logo from './logo.svg'
import './App.css'
function printNumbersTill (n) {
	let res = ''
	for (let i = 0; i < n; i++) {
		res += ' ' + (i+1)
	}
	return res
}

function App () {
	const a = 3
	const b = 4
	return (
		<div className="App">
			<header className="App-header">
				<h1>StayAtHome exercises</h1>
			</header>
			<main>
				<h2>Add two numbers</h2>
				Hallo and welcome. Hamy to inform you that {a} + {b} is equal to {a + b}
				<h2>Loop 1-20</h2>
				{printNumbersTill(20)}

			</main>
		</div>
	)
}

export default App
