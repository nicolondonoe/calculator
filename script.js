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

