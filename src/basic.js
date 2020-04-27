function printNumbersTill (n) {
	let res = ''
	for (let i = 0; i < n; i++) {
		res += ' ' + (i + 1)
	}
	return res
}

function getGreetingTo (name) {
	return `Hello ${name}`
}

function printValues (array) {
	let res = ''
	array.forEach(value => {
		res += ' ' + value
	})
	return res
}

export { printNumbersTill, getGreetingTo, printValues }