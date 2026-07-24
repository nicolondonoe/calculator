let firstNumber, secondNumber;
let firstNumberString = '', secondNumberString = '';
let operator;
let result;

const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const screenDisplay = document.querySelector("div.display");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const dotButton = document.querySelector("#dot");
const backspaceButton = document.querySelector("#backspace");

let equalButtonPressed = false;
let currentNumber = '';
let keyPressed = '';

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
    currentNumber = 'first';
  }
  else if (operator !== undefined && equalButtonPressed === false) {
    updateSecondNumber(e);
    currentNumber = 'second';
  }
}


function updateFirstNumber(e) {
  // Check if the input comes from button or keyboard
  if (e.key) {
    if (e.key === '.') {
      if (!firstNumberString.includes('.')) {
        firstNumberString += e.key;
        screenDisplay.textContent = firstNumberString;
        firstNumber = Number(firstNumberString);
      }
    } else {
      firstNumberString += e.key;
      screenDisplay.textContent = firstNumberString;
      firstNumber = Number(firstNumberString);
    }
  }
  
  else {
    if (getNumberByButton(e) === '.') {
      if (!firstNumberString.includes('.')) {
        firstNumberString += getNumberByButton(e);
        screenDisplay.textContent = firstNumberString;
        firstNumber = Number(firstNumberString);
      }
    } else {
      firstNumberString += getNumberByButton(e);
      screenDisplay.textContent = firstNumberString;
      firstNumber = Number(firstNumberString);
    }
  }

}

function updateSecondNumber(e) {
  if (e.key) {
    if (e.key === '.') {
      if (!secondNumberString.includes('.')) {
        secondNumberString += e.key;
        screenDisplay.textContent = secondNumberString;
        secondNumber = Number(secondNumberString);
      }
    } else {
      secondNumberString += e.key;
      screenDisplay.textContent = secondNumberString;
      secondNumber = Number(secondNumberString);
    }
  } 

  else {
    if (getNumberByButton(e) === '.') {
      if (!secondNumberString.includes('.')) {
        secondNumberString += getNumberByButton(e);
        screenDisplay.textContent = secondNumberString;
        secondNumber = Number(secondNumberString);
      }
    } else {
      secondNumberString += getNumberByButton(e);
      screenDisplay.textContent = secondNumberString;
      secondNumber = Number(secondNumberString);
    }
  }

}

function getNumberByButton(e) {
  return (e.target.textContent);
}

function getOperatorByButton(e) {
  operator = e.target.textContent;
  return operator;
}

function operatorUse(e) {
  if (e.key) {
    if (secondNumber === undefined) {
      operator = e.key;
    }
    if (secondNumber !== undefined) {
      calculate();
      operator = e.key;
    }
  }
  else {
    if (secondNumber === undefined) {
      getOperatorByButton(e);
    }
    if (secondNumber !== undefined) {
      calculate();
      getOperatorByButton(e);
    }
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
  const decimalPlaces = 0;
  // Check if decimals exist
  if (splitNumber[1]) {
    const decimalNumbers = splitNumber[1];
    const decimalPlaces = decimalNumbers.length;
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

function backspace() {
  // console.log("exec")
  let strLength;
  if (currentNumber === 'first') {
    strLength = firstNumberString.length;
    firstNumberString = firstNumberString.slice(0, strLength-1);
    screenDisplay.textContent = firstNumberString;
    firstNumber = Number(firstNumberString);
  }

  else if (currentNumber === 'second') {
    strLength = secondNumberString.length;
    secondNumberString = secondNumberString.slice(0, strLength-1);
    screenDisplay.textContent = secondNumberString;
    secondNumber = Number(secondNumberString);
  }
}

function getKeyPressed(e) {
  keyPressed = e.key;
}


// Event listeners
numberButtons.forEach(button => 
  button.addEventListener("click", (e) => updateNumbers(e)));
  
  operatorButtons.forEach(button =>
    button.addEventListener("click", (e) => operatorUse(e)));

equalButton.addEventListener("click", (e) => calculate());

clearButton.addEventListener("click", (e) => clearMemory());

backspaceButton.addEventListener("click", () => backspace());

document.addEventListener("keydown", (e) =>  {
  if (/[0-9.]/.test(e.key)) {
    updateNumbers(e);
  }

  else if (/[/*+-]/.test(e.key)) {
    operatorUse(e);
  }

  else if (e.key === "Enter") {
    calculate();
  }

  else if (e.key === "Delete") {
    clearMemory();
  }

  else if (e.key === "Backspace") {
    backspace();
  }

});

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => btn.blur());
});








