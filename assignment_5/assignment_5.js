function mathUtility() {
    function power(base, exponent) {
        if(exponent  === 0) {
            return 1;
        }else if(base === 0) {
            return 'Base cannot be 0. Please enter another integer';
        }else {
            return Math.pow(base, exponent);
        }
    }
    function squareRoot(num) {
        return Math.sqrt(num);
    }
    function fibonacci(n) {
        let seq = []; 
        if(n <= 0) {
            return seq;
        }
        else if(n === 1) {
            seq.push(0);
            return seq;
        }
        seq = [0,1];
        for(let i = 2; i < n; i++) {
            seq.push(seq[i - 1] + seq[i - 2]);
        }
        return seq;
    }
    return {
        power: power,
        squareRoot: squareRoot,
        fibonacci: fibonacci
    }
}

const math = mathUtility();
console.log(math.power(5,5));
console.log(math.power(5,0));
console.log(math.power(0,3));
console.log(math.squareRoot(121));
console.log(math.fibonacci(6));

//Calculator
function appendOnDisplay(value) {
    document.getElementById('result').value += value
}

function appendOperator(operator) {
    let currentResult = document.getElementById('result').value;
    var lastChar = currentResult[currentResult.length - 1];
    if(['+', '-', '*', '/', '%'].includes(lastChar)) {
        currentResult = currentResult.slice(0 ,-1);
    }
    document.getElementById('result').value = currentResult + operator;
}

function clearDisplay() { 
    document.getElementById('result').value = '';
}

function deleteEntry() {
    let currentResult = document.getElementById('result').value;
    document.getElementById('result').value = currentResult.slice(0, -1);
}

function calculateResult() {
    let currentValue = document.getElementById('result');
    let currentOperator = currentValue.value.match(/[^0-9]/g);
    if(currentOperator) {
        let operand = currentValue.value.split(currentOperator);
        let finalResult;
        if(currentOperator == '%') {
            finalResult = (operand[0]*operand[1])/100;
        }else if(currentOperator == '+') {
            finalResult = parseInt(operand[0]) + parseInt(operand[1]);
        }else if(currentOperator == '-') {
            finalResult = operand[0] - operand[1];
        }else if (currentOperator == '*') {
            finalResult = operand[0] * operand[1];
        } else if(currentOperator == '/') {
            finalResult = operand[0] / operand[1];
        }
        currentValue.value  = finalResult;
    }
}