const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.number')
const setDisplay = value => display.innerHTML = value
const setEvents = () => {
    numbers.forEach(number => number.addEventListener('click', event => addToDisplay(event.target.textContent)))
}

function addToDisplay(number){
    let currentDisplay = display.innerHTML
    currentDisplay == 0 ? newDisplay = number : newDisplay = currentDisplay + number
    setDisplay(newDisplay)
}

function multiply(x,y){
    Number(x) * Number(y)
}

window.onload = (() => {
    setDisplay(0)
    setEvents()
})