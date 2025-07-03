const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('.number-key');
const operatorKeys = document.querySelectorAll('.operator-key');
const clearButton = document.querySelector('#clear-key');
const equalsButton = document.querySelector('#equals-key');
const backButton = document.querySelector('#backspace-key');
 
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
        display.textContent = display.textContent === '0' ? key.textContent : display.textContent + key.textContent;
        if (display.textContent.length > 10) {
            display.textContent = display.textContent.slice(0, 10);
        }
        console.log(key.textContent);
    });
});
operatorKeys.forEach(key => {
    key.addEventListener('click', () => {
        let currentText = display.textContent.trim();
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
            display.textContent = tokens.join(' ') + ' '; // Join the tokens back into a string
        } else {
            display.textContent = currentText + ' ' + newOperator + ' '; // Append the new operator to the current text
        }
    });
});


clearButton.addEventListener('click', () => {
    display.textContent = '0';
});
equalsButton.addEventListener('click', () => {
    const expression = display.textContent.trim();

    try {
        const result = math.evaluate(expression); // uses math.js to evaluate safely
        display.textContent = result.toString();
    } catch (e) {
        display.textContent = 'Error';
    }
});
backButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1); //remove the last character

    // If the display is empty after backspace, set it to '0'
    if (display.textContent === '') {
        display.textContent = '0';
    }
});
