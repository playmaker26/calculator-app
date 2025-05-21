const buttons = {
    squareRoot: {
    name: 'square root',
    value: '√',
    operation: (x) => Math.sqrt(x),
    type: 'operator'
    },
    percent: {
        name: 'percent',
        value: '%',
        operation: (x) => x / 100,
        type: 'operator'
    },
    negative: {
        name: 'negative',
        value: '±',
        operation: (x) => -x,
        type: 'operator'
    },
    fraction: {
        name: 'fraction',
        value: 'a/b',
        operation: (x) => 1 / x,
        type: 'operator'
    },
   pi: {
    name: 'pi',
    value: 'π',
    operation: () => Math.PI,
    type: 'operator'
   },
   seven: {
    name: 'seven',
    value: '7',
    type: 'number',
operation: null
   },
   eight: {
    name: 'eight',
    value: '8',
    type: 'number',
operation: null
   },
   nine: {
    name: 'nine',
    value: '9',
    type: 'number',
operation: null
   },
   multiply: {
    name: 'multiply',
    value: '×',
    operation: (a, b) => a * b,
    type: 'operator'
   },
   divide: {
    name: 'divide',
    value: '÷',
    operation: (a, b) => a / b,
    type: 'operator'
},
four: {
    name: 'four',
    value: '4',
    type: 'number',
operation: null
},
five: {
    name: 'five',
    value: '5',
    type: 'number',
operation: null
},
six: {
    name: 'six',
    value: '6',
    type: 'number',
operation: null
},
addition: {
    name: 'addition',
    value: '+',
    operation: (a, b) => a + b,
    type: 'operator'
},
subtraction: {
    name: 'subtraction',
    value: '-',
    operation: (a, b) => a - b,
    type: 'operator'
},
one: {
    name: 'one',
    value: '1',
    type: 'number',
operation: null
},
two: {
    name: 'two',
    value: '2',
    type: 'number',
operation: null
},
three: {
    name: 'three',
    value: '3',
 type: 'number',
operation: null
},
clear: {
    name: 'clear',
    value: 'C',
    action: 'clear-entry',
    type: 'action'
},
clearAll: {
    name: 'clear-all',
    value: 'AC',
    action: 'clear-all',
    type: 'action'
},
zero: {
name: 'zero',
value: '0',
type: 'number',
operation: null
},
decimal: {
    name: 'decimal',
    value: '.',
    operation: null,
    type: 'number'
},
equal: {
    name: 'equal',
    value: '=',
    action: 'evaluate',
    type: 'action'
}
};

const calculatorState = {
firstOperand: null,
currentOperator: null,
awaitingSecondOperand: false,
expression: ''
};



function appendNumber() {
  let buttonNumber = document.querySelectorAll('[data-number]');
  let display = document.querySelector('#display');

  buttonNumber.forEach(number => {
    number.addEventListener('click', () => {
      const value = number.textContent;
      if (value === '.' && display.value.includes('.')) return;

      if (calculatorState.awaitingSecondOperand) {
        display.value = (value === '.') ? '0.' : value;
        calculatorState.expression += ` ${buttons[calculatorState.currentOperator].value} ${display.value}`;
        calculatorState.awaitingSecondOperand = false;
      } else {
        display.value += value;
        calculatorState.expression += value;
      }
    });
  });
}


function setEquation() {
  const operatorButtons = document.querySelectorAll('[data-operator]');
  const display = document.querySelector('#display');

  operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
      const inputValue = parseFloat(display.value);
      if (isNaN(inputValue)) return;

      if (calculatorState.firstOperand === null) {
        calculatorState.firstOperand = inputValue;
        calculatorState.expression = display.value;
      } else if (!calculatorState.awaitingSecondOperand) {
        const result = performCalculation(
          calculatorState.currentOperator,
          calculatorState.firstOperand,
          inputValue
        );
        display.value = result;
        calculatorState.firstOperand = result;
        calculatorState.expression = result.toString();
      }

      calculatorState.currentOperator = operator.getAttribute('data-operator');
      calculatorState.awaitingSecondOperand = true;
    });
  });
}

function performCalculation(operatorKey, first, second) {
const operator = buttons[operatorKey];

if(!operator || typeof operator.operation !== 'function') return second;

if(operator.operation.length === 1) return operator.operation(first);

return operator.operation(first, second);
}

function calculate() {
  let display = document.querySelector('#display');
  let equal = document.querySelector('.equal');

  equal.addEventListener('click', () => {
    const secondOperand = parseFloat(display.value);

    if (
      calculatorState.currentOperator &&
      calculatorState.firstOperand !== null &&
      !isNaN(secondOperand)
    ) {
      const result = performCalculation(
        calculatorState.currentOperator,
        calculatorState.firstOperand,
        secondOperand
      );

      calculatorState.expression += ` = ${result}`;
      display.value = calculatorState.expression;

      calculatorState.firstOperand = result;
      calculatorState.currentOperator = null;
      calculatorState.awaitingSecondOperand = false;
      calculatorState.expression = result.toString(); // carry forward
    }
  });
}


function clearDisplay() {
const clear = document.querySelector('.clear');
const allClear = document.querySelector('.all-clear');
const display = document.querySelector('#display');

clear.addEventListener('click', () => {
    display.value = '';
    calculatorState.expression = '';
});

allClear.addEventListener('click', () => {
    display.value = '';
    calculatorState.firstOperand = null;
    calculatorState.currentOperator = null;
    calculatorState.awaitingSecondOperand = false;
    calculatorState.expression = '';
});
}

function initializeCalculator() {
appendNumber();
setEquation();
calculate();
clearDisplay();
}
initializeCalculator();
