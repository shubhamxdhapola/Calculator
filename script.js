const inputDisplay = document.querySelector('.display-for-input');
const outputDisplay = document.querySelector('.display-for-output');
const themeSwitchBtn = document.querySelector('.theme-switch');
const calculator = document.querySelector('.calculator')

let expression = '';
const operators = ['+', '-', '*', '/',];

let enableLightMode = () => localStorage.setItem('dark-mode','inactive')
let enableDarkMode = () => localStorage.setItem('dark-mode','active')

themeSwitchBtn.addEventListener('click', switchTheme);

function switchTheme() {
    calculator.classList.toggle('light-theme')
    calculator.classList.contains('light-theme') ? enableLightMode() : enableDarkMode();
}

window.onload = () =>  {
    let darkMode = localStorage.getItem('dark-mode');
    darkMode == 'active' 
        ? calculator.classList.remove('light-theme') 
        : calculator.classList.add('light-theme');
}

function isOperator(input) {
    return operators.includes(input);
}

function endsWithOperator(expr) {
    return isOperator(expr.slice(-1));
}

function clearDisplay() {
    inputDisplay.innerText = '';
    outputDisplay.innerText = '';
    expression = '';
}

function calculate() {

    try {
        const result = eval(expression); 
        outputDisplay.innerText = result;
    } 
    catch (error) {
        outputDisplay.innerText = 'Error';
    }
}
        
function validateInput(input) {
    
    if (isOperator(input) && 
        endsWithOperator(expression)) {
            expression = expression.slice(0, -1);
            inputDisplay.innerText = inputDisplay.innerText.slice(0, -1);
    }

    if (input === '.') {
        const lastNumber = expression.split(/[+\-*/]/).pop();
        if (lastNumber.includes('.')) return; 
    }

    if(expression.startsWith('0') && 
        !isNaN(expression[1])) expression = expression.slice(1);

    if (input === '*') {
        inputDisplay.innerText += '×';
        expression += '*';

    } else if (input === '/') {
        inputDisplay.innerText += '÷';
        expression += '/';

    } else {
        inputDisplay.innerText += input;
        expression += input;
    }
    
    if (expression.match(/^[/+*]/)) clearDisplay();

    if (!isNaN(input) && 
        operators.some(op => expression.includes(op))) calculate();
    else outputDisplay.innerText = '';
}
    
function equal() {

    if (!endsWithOperator(expression) && 
    operators.some(op => expression.includes(op)) &&
    !expression.endsWith('.')) {
        inputDisplay.innerText = outputDisplay.innerText;
        expression = outputDisplay.innerText;
        outputDisplay.innerText = '';
    }
}

function backspace() {

    expression = expression.slice(0, -1);
    inputDisplay.innerText = inputDisplay.innerText.slice(0, -1);

    if (endsWithOperator(expression) || 
        !operators.some(op => expression.includes(op)) ||
        expression.endsWith('.')) outputDisplay.innerText = ''

    else calculate(); 

}
