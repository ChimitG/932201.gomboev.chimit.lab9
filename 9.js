const signs = ['+', '-', '*', '/'];
var span = document.querySelector('span');
const btnsContainer = document.querySelector('.btns_table');
const input = document.querySelector('input');

btnsContainer.addEventListener('click', ($event) => {
    const el = $event.target;
    if (el.tagName === 'BUTTON') {
        const newSymbol = el.textContent;
        const inputVal = input.value;
        if(signs.includes(newSymbol)){
            input.style.color = 'rgba(109, 109, 109, 0.5)';
        }
        else{
            input.style.color = 'rgba(0, 0, 0, 1)';
        }
        if (hasUnallowed(inputVal)) input.value = '';
        calc(inputVal, newSymbol);
    }
});
    
const hasUnallowed = (inputVal) => {
   return !((inputVal).match(/[0-9%\/*\-+=]/) || inputVal === '');
};

const calc = (inputVal, newSymbol) => {
    if (newSymbol === "=") {
        result(inputVal);
    }
    else if (newSymbol === '<-') {
        input.value = inputVal.substring(0, inputVal.length - 1);
        if(isLastSign){
            input.style.color = 'rgba(0, 0, 0, 1)';
        }
    }
    else if (newSymbol === 'C') {
        input.value = '';
    }
    else if (newSymbol === '.') {
        Dot(inputVal);
    }
    else {
        signs.includes(newSymbol) ? Sign(inputVal, newSymbol) : input.value += newSymbol;
    }
}

const result = (inputVal) => {
    if (isLastSign(inputVal) || isLastDot(inputVal)) {
        input.value = inputVal.substring(0, inputVal.length - 1);
    }
    if (inputVal.includes("/0")){
        input.value ="0";
    }
    else input.value = eval(input.value);
};

const Sign = (inputVal, newSymbol) => {
    if (isFirstSign(inputVal) && newSymbol !== '-') {
        input.value = input.value;
    } else if (isLastSign(inputVal) || isLastDot(inputVal)) {
        input.value = inputVal.substring(0, inputVal.length - 1) + newSymbol;
    }
    else {
        input.value += newSymbol;
    }
};

const Dot = (inputVal) => {
    if (input.value === ''){
        input.value +="0";
    }

    let dotsCount = 0;

    for (let i = inputVal.length - 1; i >= 0; i--) {
        if (inputVal[i] === '.') {
            dotsCount++;
        }

        if (signs.includes(inputVal[i])) {
            break;
        }
    }
    
    if (dotsCount !== 0) {
        input.value = input.value;
    } else {
        input.value += '.';
    }
};

const isFirstSign = (inputVal) => {
    return inputVal.length === 0;
};

const isLastSign = (inputVal) => {
    const lastSymbol = inputVal.slice(inputVal.length - 1, inputVal.length);
    return signs.includes(lastSymbol);
};

const isLastDot = (inputVal) => {
    const lastSymbol = inputVal.slice(inputVal.length - 1, inputVal.length);
    return '.' === lastSymbol;
};