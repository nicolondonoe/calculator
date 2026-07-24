let firstNumber, secondNumber;
let operator;
let result;
let numberButtons = document.querySelectorAll("button.number");
let operatorButtons = document.querySelectorAll("button.operator");
let screenDisplay = document.querySelector("div.display");
let equalButton = document.querySelector("#equal");





// Operation functions
function add(a, b) {
  return a+b;
}

function substract(a, b) {
  return a-b;
}

function multiply(a, b) {
  return a*b;
}

function divide(a, b) {
  if (b === 0) {
    return undefined;
  }
  return a/b;
}

function operate (operator, a, b) {
  if (operator === '+') {
    return add(a, b);
  }
  else if (operator === '-') {
    return substract(a, b);
  }
  else if (operator === '*') {
    return multiply(a, b);
  }
  else if (operator === '/') {
    return divide(a, b);
  }
}

// Interface functions
function updateNumbers(e) {
  if (firstNumber === undefined) {
    updateFirstNumber(e);
  }
  else if (secondNumber === undefined) {
    updateSecondNumber(e);
  }
}

function updateFirstNumber(e) {
  firstNumber = getNumber(e);
  screenDisplay.textContent = firstNumber;
}

function updateSecondNumber(e) {
  secondNumber = getNumber(e);
  screenDisplay.textContent = secondNumber;
}

function getNumber(e) {
  return Number(e.target.textContent);
}

function getOperator(e) {
  operator = e.target.textContent;
  return operator;
}

function calculate() {
  if (operator === '+') {
    result = add(firstNumber, secondNumber);
    firstNumber = result;
    secondNumber = undefined;
    displayResult(result);
  }
  else if (operator === '-') {
    result = substract(firstNumber, secondNumber);
    firstNumber = result;
    secondNumber = undefined;
    displayResult(result);
  }
  else if (operator === '*') {
    result = multiply(firstNumber, secondNumber);
    firstNumber = result;
    secondNumber = undefined;
    displayResult(result);
  }
  else if (operator === '/') {
    result = divide(firstNumber, secondNumber);
    firstNumber = result;
    secondNumber = undefined;
    displayResult(result);
  }
}

function displayResult(result) {
  screenDisplay.textContent = result;
}

numberButtons.forEach(button => 
  button.addEventListener("click", (e) => updateNumbers(e)));

operatorButtons.forEach(button =>
  button.addEventListener("click", (e) => getOperator(e)));

equalButton.addEventListener("click", (e) => calculate());








