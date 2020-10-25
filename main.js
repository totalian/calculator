const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const setDisplay = value => display.innerHTML = value
const setEvents = () => {
    numbers.forEach(number => number.addEventListener('click', event => addToDisplay(event.target.textContent)))
    operations.forEach(operation => operation.addEventListener('click', () => operationMode()))
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

function operationMode(){
    [total,newValue,operation] = memory
    if(!newValue){
        memory = [total, display.innerHTML, add]
    }
    display.innerHTML = evaluate()
    mode = "overwrite"
}

function evaluate(){
    [total,newValue,operation] = memory
    let values = [total,newValue]
    total = operation(values)
    newValue = 0
    memory = [total,newValue,add]
    return total
}


function add(values){
    [value1,value2] = values
    return parseFloat(value1) + parseFloat(value2)
}

function subtract(values){
    [value1,value2] = values
    return value1 - value2
}

function multiply(values){
    [value1,value2] = values
    return value1 * value2
}

function divide(values){
    [value1,value2] = values
    return value1 / value2
}

window.onload = (() => {
    setDisplay(0)
    setEvents()
    mode = "standard"
    memory = [0,null,add]
})