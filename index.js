const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('.number-key');
const operatorKeys = document.querySelectorAll('.operator-key');
const clearButton = document.querySelector('#clear-key');
const equalsButton = document.querySelector('#equals-key');
const backButton = document.querySelector('#backspace-key');
const decimalKey = document.querySelector('.decimal-key');
const darkModeButton = document.querySelector('#dark-mode-btn');

let isResultDisplayed = false;

// function operate(operator, a, b) {
//     switch (operator) {
//         case '+':
//             return add(a, b);
//         case '-':
//             return subtract(a, b);
//         case '*':
//             return multiply(a, b);
//         case '/':
//             return divide(a, b);
//         case '%':
//             return modulo(a, b);
//         case '^':
//             return power(a, b);
//         default:
//             return null;
//     }
// }
// function add(a, b) {
//     return a + b;
// }   
// function subtract(a, b) {
//     return a - b;
// }
// function multiply(a, b) {
//     return a * b;
// }
// function divide(a, b) {
//     if (b === 0) {
//         return null; // Handle division by zero
//     }
//     return a / b;
// }
// function modulo(a, b) {
//     return a % b;
// }
// function power(a, b) {
//     return Math.pow(a, b);
// }

let clickSound = new Audio('sounds/calculatorclick.wav');

numberKeys.forEach(key => {
    key.addEventListener('click', () => {
        clickSound.play();
        if (isResultDisplayed) {
            display.value = ''; // Clear display if a result was previously shown
            isResultDisplayed = false; // Reset the flag
        }
        if (display.value === '0' && key.textContent !== '.') {
            display.value = ''; // Clear display if it is '0' and a number key is pressed
        }
        if (display.value.length >= 20) {
            return; // Prevent further input if display is already at max length
        }
        display.value = display.value === '0' ? key.textContent : display.value + key.textContent;

    });
});
decimalKey.addEventListener('click', () => {
    clickSound.play();
    if (isResultDisplayed) {
        display.value = ''; // Clear display if a result was previously shown
        isResultDisplayed = false; // Reset the flag
    }
    if (display.value === '') {
        display.value = '0'; // If display is empty, start with '0'
    }
    if (display.value === '0') {
        display.value = '0.'; // If display is '0', replace it with '0.'
        return;
    }
    const currentText = display.value.trim();
    const tokens = currentText.split(/[\s\+\-\*\/\%\^]+/); // Split by operators
    const lastNumber = tokens[tokens.length - 1];

    const lastChar = currentText.slice(-1);
    const isOperator = ['+', '-', '*', '/', '%', '^'].includes(lastChar);
    if (isOperator) return;

    if (!lastNumber.includes('.') || lastNumber === '') {
        display.value += '.';
    }
});
operatorKeys.forEach(key => {
    key.addEventListener('click', () => {
        clickSound.play();
        let currentText = display.value.trim();
        const tokens = currentText.split(' ');
        console.log(tokens);
        const newOperator = key.textContent; //assign the current clicked operator to a variable
        const isLastTokenOperator = ['+', '-', '*', '/', '%', '^'].includes(tokens[tokens.length - 1]); // Check if the last token is an operator
        console.log(`Current text: ${currentText}, New operator: ${newOperator}, Is last token operator: ${isLastTokenOperator}`);

        if (currentText === '') {
            return; // If display is empty, do nothing
        }

        if (isLastTokenOperator) {
            tokens[tokens.length - 1] = newOperator; // replace the last operator with the newly clicked one
            display.value = tokens.join(' ') + ' '; // Join the tokens back into a string
        } else {
            display.value = currentText + ' ' + newOperator + ' '; // Append the new operator to the current text
        }
    });
});


clearButton.addEventListener('click', () => {
    clickSound.play();
    display.value = '0';
});
equalsButton.addEventListener('click', () => {
    clickSound.play();
    isResultDisplayed = true;
  
    const expression = display.value.trim();

    try {
        const result = math.evaluate(expression); // uses math.js to evaluate safely
        if (typeof result === 'number' && !Number.isInteger(result)) {
            display.value = result.toFixed(2); // limits to 2 decimal places
        } else {
            display.value = result.toString(); // show whole number as-is
        }
    } catch (e) {
        display.value = 'Error';
    }
});
backButton.addEventListener('click', () => {
    clickSound.play();
    display.value = display.value.slice(0, -1); //remove the last character

    // If the display is empty after backspace, set it to '0'
    if (display.value === '') {
        display.value = '0';
    }
});

darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeButton.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-toggle-off');
        icon.classList.add('fa-toggle-on');
        darkModeButton.style.color = '#eee'; // Dark mode background color
    } else {
        icon.classList.remove('fa-toggle-on');
        icon.classList.add('fa-toggle-off');
        darkModeButton.style.color = '#333';
    }
});