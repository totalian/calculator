const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equals = document.querySelector('#equals')
// const addButton = document.querySelector('#add')
// const subtractButton = document.querySelector('#subtract')
// const multiplyButton = document.querySelector('#multiply')
// const divideButton = document.querySelector('#divide')
const equalsButton = document.querySelector('#equals')
const setDisplay = value => display.innerHTML = value
const setEvents = () => {
    numbers.forEach(number => number.addEventListener('click', event => addToDisplay(event.target.textContent)))
    operations.forEach(operation => operation.addEventListener('click', (e) => operationMode(e)))
    equals.addEventListener('click', () => equate())
}
let mode

function addToDisplay(number){
    if(mode=="standard"){
        let currentDisplay = display.innerHTML
        if(currentDisplay.length < 8){
            currentDisplay == 0 ? newDisplay = number : newDisplay = currentDisplay + number
            setDisplay(newDisplay)
        }
    }
    else if(mode == "overwrite"){
        setDisplay(number)
    }
    mode = "standard"
}

function operationMode(e){
    [total,newValue,operation] = memory
    let capture = display.innerHTML
    memory = [total,capture,operation]
    display.innerHTML = evaluate()
    mode = "overwrite"
    let newOperation
    switch(e.target.innerHTML){
        case "+":
            newOperation = add
            break
        case "-":
            newOperation = subtract
            break
        case "x":
            newOperation = multiply
            break
        case "/":
            newOperation = divide
            break
    }
    [total,newValue,operation] = memory
    memory = [total,newValue,newOperation]
}

function evaluate(){
    [total,newValue,operation] = memory
    let values = [total,newValue]
    total = operation(values)
    newValue = 0
    memory = [total,newValue,add]
    return total
}

function equate(){
    [total,newValue,operation] = memory
    let capture = display.innerHTML
    memory = [total,capture,operation]
    display.innerHTML = evaluate()
    mode = "overwrite"
    memory = [0,null,add]
}


function add(values){
    [value1,value2] = values
    return parseFloat(value1) + parseFloat(value2)
}

function subtract(values){
    [value1,value2] = values
    return parseFloat(value1) - parseFloat(value2)
}

function multiply(values){
    [value1,value2] = values
    return parseFloat(value1) * parseFloat(value2)
}

function divide(values){
    [value1,value2] = values
    return parseFloat(value1) / parseFloat(value2)
}

window.onload = (() => {
    setDisplay(0)
    setEvents()
    mode = "standard"
    memory = [0,null,add]
})