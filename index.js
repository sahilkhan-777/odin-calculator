const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('.number-key');
const operatorKeys = document.querySelectorAll('.operator-key');
const clearButton = document.querySelector('#clear-key');
const equalsButton = document.querySelector('#equals-key');
const backButton = document.querySelector('#backspace-key');
const decimalKey = document.querySelector('.decimal-key');
const darkModeButton = document.querySelector('#dark-mode-btn');

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


numberKeys.forEach(key => {
    key.addEventListener('click', () => {
        display.value = display.value === '0' ? key.textContent : display.value + key.textContent;
        if (display.value.length > 10) {
            display.value = display.value.slice(0, 10);
        }
        console.log(key.textContent);
    });
});
decimalKey.addEventListener('click', () => {
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
    display.value = '0';
});
equalsButton.addEventListener('click', () => {
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
    } else {
        icon.classList.remove('fa-toggle-on');
        icon.classList.add('fa-toggle-off');
    }
});