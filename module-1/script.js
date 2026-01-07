const display = document.getElementById('display');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(op) {
    // Avoid multiple operators in a row
    if (display.value && !isOperator(display.value[display.value.length - 1])) {
        display.value += op;
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Evaluate the expression
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        e.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
