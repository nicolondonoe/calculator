let firstNumber, secondNumber;
let firstNumberString = '', secondNumberString = '';
let operator;
let result;
let numberButtons = document.querySelectorAll("button.number");
let operatorButtons = document.querySelectorAll("button.operator");
let screenDisplay = document.querySelector("div.display");
let equalButton = document.querySelector("#equal");
let equalButtonPressed = false;
let clearButton = document.querySelector("#clear");
let dotButton = document.querySelector("#dot");


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
    return 'Math error';
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
  if (operator === undefined && result === undefined) {
    updateFirstNumber(e);
  }
  else if (operator !== undefined && equalButtonPressed === false) {
    updateSecondNumber(e);
  }
}

function updateFirstNumber(e) {
  firstNumberString += getNumber(e);
  screenDisplay.textContent = firstNumberString;
  firstNumber = Number(firstNumberString);
}

function updateSecondNumber(e) {
  secondNumberString += getNumber(e);
  screenDisplay.textContent = secondNumberString;
  secondNumber = Number(secondNumberString);
}

function getNumber(e) {
  return (e.target.textContent);
}

function getOperator(e) {
  operator = e.target.textContent;
  return operator;
}

function operatorUse(e) {
  if (secondNumber === undefined) {
    getOperator(e);
  }
  if (secondNumber !== undefined) {
    calculate();
    getOperator(e);
  }
}

function calculate() {
  if (firstNumber !== undefined && secondNumber !== undefined) {
    equalButtonPressed = true;
    if (operator === '+') {
      result = add(firstNumber, secondNumber);
      carryResult(result);
      displayResult(result);
    }
    else if (operator === '-') {
      result = substract(firstNumber, secondNumber);
      carryResult(result);
      displayResult(result);
    }
    else if (operator === '*') {
      result = multiply(firstNumber, secondNumber);
      carryResult(result);
      displayResult(result);
    }
    else if (operator === '/') {
      result = divide(firstNumber, secondNumber);
      carryResult(result);
      displayResult(result);
    }
  }
  else if ((firstNumber !== undefined && secondNumber == undefined) && operator === undefined) {
    result = firstNumber;
    carryResult(result);
    displayResult(result);
  }
}

function carryResult(result) {
  firstNumber = result;
  firstNumberString = result.toString();
  secondNumber = undefined;
  secondNumberString = '';
  operator = undefined;
  equalButtonPressed = false;
}

function numberOfDecimal(result) {
  const splitNumber = result.toString().split('.');
  // Check if decimals exist
  if (splitNumber[1]) {
    const decimalNumbers = splitNumber[1];
    const decimalPlaces = decimalNumbers.length;
  }
  else {
    decimalPlaces = 0;
  }
  return decimalPlaces;
}

function displayResult(result) {
  if (numberOfDecimal(result) > 10) {
    screenDisplay.textContent = result.toFixed(10);
  }
  else {
    screenDisplay.textContent = result;
  }
}

function clearMemory() {
  firstNumber = undefined;
  secondNumber = undefined;
  firstNumberString = '';
  secondNumberString = '';
  operator = undefined;
  result = undefined;
  equalButtonPressed = false;
  screenDisplay.textContent = '';
}

// Event listeners
numberButtons.forEach(button => 
  button.addEventListener("click", (e) => updateNumbers(e)));

operatorButtons.forEach(button =>
  button.addEventListener("click", (e) => operatorUse(e)));

equalButton.addEventListener("click", (e) => calculate());

clearButton.addEventListener("click", (e) => clearMemory());








