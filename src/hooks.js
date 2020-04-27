import { useState, useEffect } from 'react'
import axios from 'axios'

function useUnsplash ({ ids }) {
	const [data, setData] = useState([])
	useEffect(() => {
		let cancel = false
		async function fetchData () {
			const result = await Promise.all(ids.map(async id => {
				const res = await axios(
					`https://api.unsplash.com/photos/${id}`,
					{ headers: { Authorization: 'Client-ID J162oUYuwAtO_PUiYAUH1mqNDUaCaI6o5e9yw9s81eA' } })
				console.log( res.data )
				return res.data
			}))

			// console.log(result.data)
			if (!cancel) {
				setData(result)
			}
		}
		fetchData()
		return () => { cancel = true }
	}, [ids])

	return data
}

function luxNumsSplit(e) {
	let a = e.split(/\n\n/).map(a=>a.split(/\n/).map(Number).filter(a=>a) ).filter(a => a[0] !== 0)
	let st= []
	if (a[0][4]) {
		for (let i=0; a[0][i*4]; i++) {
			a.push(a[0].slice(i*4, (i+1)*4))
		}	
		a.shift()
	}
	console.log(a)
	for (let i=0; a[i*5]; i++) {
		st.push(a.slice(i*5, (i+1)*5).map( (a,k) => [...(a.slice(0, 1+(2*k%3) % 4)), '🍀', ...(a.slice(1+(2*k%3) % 4) )]) )
	}

	return st
}

export { useUnsplash, luxNumsSplit }