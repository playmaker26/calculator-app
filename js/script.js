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
currentInput: '',
previousInput: '',
operator: null,
overwrite: false,
lastInputType: '',
isFirstInput: true,
result: null
};

/*function displayCalculation(value) {
const calculatorDisplay = document.querySelector('#display');
let operatorButton = document.querySelectorAll('[data-operator]');
calculatorDisplay.value += value;
}
displayCalculation();

function operationSetUp(operation) {
   const calculatorDisplay = document.querySelector('#display'); 
   let num1 = null;
   let operator = null;

   if(num1 === null) {
    num1 = parseFloat(calculatorDisplay.value);
   }
   operator = operation;
   calculatorDisplay.value;
}
operationSetUp();


function results(){
     const calculatorDisplay = document.querySelector('#display'); 
   let num1 = null;
   let operator = null;  
   let result;

   if(num1 === null || operator === null){
    return;
   }

   const num2 = parseFloat(calculatorDisplay.value);

   switch(operator) {
    case '√': result = Math.sqrt(num2); 
    break;
    case '%': result = num1 / 100;
    break;
    case '±': result = -num1;
    break;
    case 'a/b': result = 1 / num1;
    break;
    case 'π': result = Math.PI;
    break;
    case '×': result = num1 * num2;
    break;
    case '÷': result = num1 / num2;
    break;
    case '+': result = num1 + num2;
    break;
    case '-': result = num1 - num2;
    break;
   }
   calculatorDisplay.value = result;
   num1 = null;
   operator = null;
}
results();*/

function appendNumber() {
    let number = document.querySelectorAll('[data-number]');
    let display = document.querySelector('#display');

    number.forEach(num => {
        num.addEventListener('click', () => {
            display.value = num;
            updateDisplay();
        });
    });
}
appendNumber();

function setEquation(op) {
    let operator = document.querySelectorAll('[ data-operator]');
     let display = document.querySelector('#display');
     let firstOperand = null;
     let operation = null;

     operator.forEach(operators => {
        operators.addEventListener('click', () => {
            if(firstOperand === null) {
                firstOperand = parseFloat(display);
            }else {
                calculate();
            }

            operation = op;
            display.value = '';
            updateDisplay();
        });
     });
}
setEquation();

function calculate() {
   let display = document.querySelector('#display'); 
   let equal = document.querySelector('.equal');
    let firstOperand = null;
     let operation = null;

     equal.addEventListener('click', () => {
        if(operation && firstOperand !== null) {
            let secondOperand = parseFloat(display);

            switch(operation) {
                case '√': 
                display = Math.sqrt(firstOperand);
                break;
                case '%':
                    display = firstOperand / 100;
                    break;
                    case '±':
                        display = -firstOperand;
                        break;
                        case 'a/b':
                            display = 1 / firstOperand;
                            break;
                            case 'π': 
                            display = Math.PI;
                            break;
                            case '×':
                                display = firstOperand * secondOperand;
                                break;
                                case '÷':
                                    display = firstOperand / secondOperand;
                                    break;
                                    case '+':
                                        display = firstOperand + secondOperand;
                                        break;
                                        case '-': 
                                        display = firstOperand - secondOperand
                                        break;
            }
        };
        updateDisplay();
     });
}

function clearDisplay() {
    let clear = document.querySelector('.clear');
    let allClear = document.querySelector('.all-clear');
     let display = document.querySelector('#display');
      let firstOperand = null;
      let operation = null;

      clear.addEventListener('click', () => {
        display.value = '';
        firstOperand = null;
        operation = null
      });

      allClear.addEventListener('click', () => {
        display.value = '';
        firstOperand = null;
        operation = null
      });
}

function updateDisplay() {
     let display = document.querySelector('#display');
     display.value = display;
}

