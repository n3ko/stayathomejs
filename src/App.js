import React, { useState, useRef } from 'react'
import './App.scss'
import { printNumbersTill, getGreetingTo, printValues } from './basic'
import { useUnsplash, luxNumsSplit } from './hooks'


function Image ({ data, size }) {
	return <>
		{data && data.urls &&
			<img src={data.urls[size || "thumb"]} alt={data.alt_description} />
		}
	</>
}
const idsOfCaruselImages =[
	'a5lFTUmohGw', 'Y8QpNeHFGno', 'm7YpOZhtkBg', 'KMGQ36bIL50'
]

function Carusel ({data}) {
	const [current, setCurrent] = useState(0)
	return <>
		<nav><ul>
			{ data.map( (d,k) =>
				<li
				 key={d.id}
				 onClick={ current === k ? null : () => setCurrent(k) }
				 className={ current === k ? "active" : "null"}
				>
					<Image data={d} />
				</li>
			) }
		</ul></nav>
		
		<Image data={data[current]} size="regular"/>
	</>
}

function Luxor ({ luxNums, setLuxNums, selected, setSelected }) {
  const _luxNums = useRef();

	return <>
		{ luxNums.length ?
		luxNums.map( (sec,k) => <section key={k} >
			{sec.map( (col,k) => <div key={k} className="panel" style={{float: 'left'}}>
			{col[0] ? <ul>{ 
				col.map( (n,l) =>
				<li key={l}
					className={ [ selected[n] ? "sel" : null, (typeof n === 'number')  ].join(" ") }
					onClick={ () => (typeof n === 'number') && setSelected(prev => ({ ...prev, [n]: selected[n]?0:1 }))  }>{n}</li>
				)}</ul> : null
			}
			</div>)
			}
		</section>)
		:
		<form onSubmit={(e) => {
			e.preventDefault();
			setLuxNums(luxNumsSplit(_luxNums.current.value))
		}
	}>
		<textarea
			name="luxnums"
			ref={_luxNums}
			cols="30" rows="10"
			placeholder="Paste the numbers here"
			>	
		</textarea>
		<button type="submit">Submit</button>
		</form>
  	}
		{ luxNums.length ? <>
		<div className="br"></div>
		<button onClick={() => setLuxNums([])} >Reset Numbers</button>
		<button onClick={() => setSelected([])} >Reset Circles</button>
		</>
		: null }
		</>
}

function App () {
	const a = 3
	const b = 4
	const [activeTab, setActiveTab] = useState(1)
	const data = useUnsplash({ ids: idsOfCaruselImages })
	const [luxNums, setLuxNums ] = useState(luxNumsSplit(
`
    9
    3
    8
    2

    27
    22
    30
    25

    38
    37
    31
    36

    56
    52
    49
    48

    74
    75
    63
    71

    10
    14
    8
    3

    30
    27
    21
    22

    37
    38
    33
    31

    49
    53
    56
    52

    63
    71
    75
    74
		`
	))
	const [selected, setSelected ] = useState({})

	console.log(luxNums)
	return (
		<div className="App">
			<header className="App-header">
				<nav>
					<ul>
						<li onClick={ () => setActiveTab(1) }>Luxor</li>
		{//						<li onClick={ () => setActiveTab(2) }>Carusel</li>
		//				<li onClick={ () => setActiveTab(3) }>Basic</li>
		}
					</ul>
				</nav>
			</header>
			{ activeTab === 3 &&
			<main id="Tab1">
				<section>
					<h2>Add two numbers</h2>
					Hallo and welcome. Hamy to inform you that {a} + {b} is equal to {a + b}
				</section><section>
					<h2>Loop 1-20</h2>
					{printNumbersTill(20)}
				</section><section>
					<h2>Loop 1-15</h2>
					{printNumbersTill(15)}
				</section><section>
					<h2>Greeting</h2>
					<p>{getGreetingTo('Mark')}</p>
				</section><section>
					<h2>Exercise 1</h2>
					{printValues([0, 3, 6, 7, 9])}
				</section><section>
					<h2>Exercise 2</h2>
					{printValues([10, 20, 30, 50, 12])}
				</section>
			</main>
			}
			{ activeTab === 2 &&
					<main id='Tab2'>
						<Carusel data={ data }/>
					</main>
			}
			{ activeTab === 1 &&
					<main id='Tab3'>
						<Luxor { ...({ luxNums, setLuxNums, selected, setSelected }) } />
					</main>
			}

		</div>
	)
}

export default App
