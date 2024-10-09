const inputDisplay = document.querySelector('.display-for-input');
const outputDisplay = document.querySelector('.display-for-output');
const themeSwitchBtn = document.querySelector('.theme-switch');
const rootElement  = document.documentElement;

let expression = '';
const operators = ['+', '-', '*', '/',];

themeSwitchBtn.addEventListener('click', switchTheme);

function switchTheme() {
    themeSwitchBtn.classList.toggle('light')
    themeSwitchBtn.classList.contains('light') ? enableLightMode() : enableDarkMode();
}
    
function enableDarkMode() {

    themeSwitchBtn.firstElementChild.style.display = 'none'
    themeSwitchBtn.lastElementChild.style.display = 'block'
    themeSwitchBtn.style.color = '#fff';
    themeSwitchBtn.style.backgroundColor = '#303136';
    rootElement.style.setProperty('--calculator-color', '#17181A');
    rootElement.style.setProperty('--display-text-color', '#fff');
    rootElement.style.setProperty('--numbers-btn-color','#303136');
    rootElement.style.setProperty('--numbers-text-color', '#fff')
    rootElement.style.setProperty('--numbers-btn-active-color', '#2b2b2b')
}

function enableLightMode() {
    
    themeSwitchBtn.firstElementChild.style.display = 'block'
    themeSwitchBtn.lastElementChild.style.display = 'none'
    themeSwitchBtn.style.color = 'black'
    themeSwitchBtn.style.backgroundColor = '#fff'
    rootElement.style.setProperty('--calculator-color', '#f2f2f2');
    rootElement.style.setProperty('--display-text-color', '#333');
    rootElement.style.setProperty('--numbers-btn-color','#f7f7f7');
    rootElement.style.setProperty('--numbers-text-color', '#333')
    rootElement.style.setProperty('--numbers-btn-active-color', '#eeecec')
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
