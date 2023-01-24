const calc = document.querySelector('.calculator');
const screenDiv = document.getElementById('input-screen');
const resDiv = document.getElementById('screen-result');
let num1, num2, operator;
let flagEqual = false;
let res = '';
let inputString = '';
calc.addEventListener('click',inputButton);
document.addEventListener('keydown',inputKey);


function inputButton(e) {
    if(['0','1','2','3','4','5','6','7','8','9','.'].indexOf(e.target.innerText) >= 0) {
        // if user types a number after having typed "=", this is considered a reset
        if ((e.target.innerText === '.') && inputString.includes('.')) return;
        if (flagEqual) reset();
        inputString = inputString + e.target.innerText ;
    } else if (['+','-','÷','x'].indexOf(e.target.innerText) >= 0) {
        //if this is the first number input
        if (!operator) {
            num1 = (!res) ? inputString : res;
        //if this is not the first number input
        } else {
            num2 = inputString.slice(inputString.indexOf(operator)+1);
            num1 = operate(operator, num1, num2);
            res = num1;
        }
        operator = e.target.innerText;
        inputString = num1 + operator;
        if (flagEqual) flagEqual = false;
    } else if (e.target.innerText === 'AC') {
        reset();
    } else  if(e.target.innerText === '=') {
        equal();
    } else if (e.target.innerText === '√') {
        res = (!res)? operate('√', inputString) : operate('√', res) ;
    } else if (e.target.innerText === '%') {
        equal();
        res = (!res)? operate('%', inputString) : operate('%', res) ;
    }
     screenDiv.innerText = inputString;
     resDiv.innerText = res;
}




function inputKey(e) {
    if(['0','1','2','3','4','5','6','7','8','9','.'].indexOf(e.key) >= 0) {
        // if user types a number after having typed "=", this is considered a reset
        if ((e.key === '.') && inputString.includes('.')) return;
        if (flagEqual) reset();2
        inputString = inputString + e.key;
    } else if (['+','-','/','*'].indexOf(e.key) >= 0) {
        //if this is the first number input
        if (!operator) {
            num1 = (!res) ? inputString : res;
        //if this is not the first number input
        } else {

            num2 = inputString.slice(inputString.indexOf(operator)+1);
            num1 = operate(operator, num1, num2);
            res = num1;
        }
        if (e.key === '/') operator = '÷';
        else if (e.key === '*') operator = 'x';
        else operator = e.key;
        inputString = num1 + operator;
        if (flagEqual) flagEqual = false;
    } else if (e.key === 'Backspace') {
        reset();
    } else  if(e.key === '=' || e.key === 'Enter') {
        equal();
    } else if (e.key === 'v') {
        res = (!res)? operate('√', inputString) : operate('√', res) ;
    } else if (e.target.innerText === '%') {
        equal();
        res = (!res)? operate('%', inputString) : operate('%', res) ;
    }
     screenDiv.innerText = inputString;
     resDiv.innerText = res;
}


function equal() {
    if (!operator) {
        res = inputString;
    }
    else {
        num2 = inputString.slice(inputString.indexOf(operator)+1);
        res = operate(operator, num1 ?? 0, num2);
    }
    flagEqual = true;

}

function reset() {
    num1 = null;
    num2 = null;
    operator = '';
    res = null;
    inputString = '';
    screenDiv.innerText = '';
    resDiv.innerText = '';
    flagEqual = false;
}

function add(a,b) {
    return (((a * 10**7 + b * 10**7) / 10**7).toString().length > 10) ? ((a * 10**7 + b * 10**7) / 10**7).toString().slice(0,12) : ((a * 10**7 + b * 10**7) / 10**7);
}

function substract(a,b) {
    return (((a * 10**7 - b * 10**7) / 10**7).toString().length > 10) ? ((a * 10**7 - b * 10**7) / 10**7).toString().slice(0,12) : ((a * 10**7 - b * 10**7) / 10**7);
}

function multiply(a,b) {
    return ((a * b).toString().length > 10) ? (a * b).toString().slice(0,12) : (a * b);
}

function divide(a,b) {
    if (b==0) return 'ERROR';
    else return ((a / b).toString().length > 10) ? (a / b).toString().slice(0,12) : (a / b);
};

function operate(operator, num1, num2) {
    if (operator ==="+") return add(num1,num2);
    else if (operator === "-") return substract(num1, num2);
    else if (operator === "x") return multiply(num1, num2);
    else if (operator === "÷") return divide(num1, num2);
    else if (operator === "√") return squareRoot(num1);
    else if (operator === "%") return percent(num1);
    else return 'ERROR';
}

function squareRoot(num) {
    return ((num**(0.5)).toString().length > 10) ? (num**(0.5)).toString().slice(0,12) : num**(0.5);
}

function percent(num) {
    return ((num*(0.01)).toString().length > 10) ? (num*(0.01)).toString().slice(0,12) : num*(0.01);
}