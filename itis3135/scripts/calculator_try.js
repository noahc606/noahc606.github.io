/*
    Functions that get/mutate elements
*/
function eById(elementId) {
    return document.getElementById(elementId);
}

function create(elementName) {
    return document.createElement(elementName);
}

function addText(element, text) {
    element.appendChild( document.createTextNode(text) );
}

let display1 = "0";
let display2 = "0";

function overflowPreventsInput() {
    if( display2.includes("Overflow") || display2.includes("Infinity") || display2.includes("NaN") ) {
        display1 = "0";
        display2 = "Overflow";

        return true;
    }
    return false;
}

function clearInputs() {
    display1 = "0";
    display2 = "0";
}

function pushButton(button) {
    let input1 = eById("display1");
    let input2 = eById("display2");
    
    switch(button) {
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
        case '.': {
            if (overflowPreventsInput()) {
                break;
            }

            let equalsIndex = display1.lastIndexOf("=");
            if( equalsIndex==display1.length-1 ) {
                clearInputs();
            }

            if( display2=="0" ) {
                display2 = "";
                if(button=='.') {
                    display2 = "0.";
                }
            }
            
            if( display2.includes(".") && button=='.' ) {
                break;
            }

            display2 = display2+button;
        } break;

        // '⌫': represents backspace
        case '⌫': {
            if( display2.indexOf("Overflow")!=-1 ) {
                clearInputs();
            }
            
            let size = display2.length;
            if( size>0 ) {
                display2 = display2.substring(0, size-1);
            }

            if( size==1 ) {
                display2 = "0";
            }
        } break;
        case 'C': {
            clearInputs();
        } break;

        // '$': represents switch between negative/positive
        case '$': {
            let num = Number(display2);
            display2 = ""+-num;
        } break;

        case '+': 
        case '-': 
        case '*': 
        case '/': {
            if (overflowPreventsInput()) {
                break;
            }

            let equalsIndex = display1.lastIndexOf("=");
            if( equalsIndex==display1.length-1 ) {
                display1 = display2+button;
                display2 = "0";
            } else {
                if(display1=="0") { display1 = ""; }
                display1 += display2+button;
                display2 = "";    
            }
        } break;

        case '=': {
            if (overflowPreventsInput()) {
                break;
            }

            let equalsIndex = display1.lastIndexOf("=");
            if( equalsIndex!=display1.length-1 ) {
                if(display1=="0") { display1 = ""; }
                display1 += display2;
    
                let res = Number(eval(display1)).toPrecision(9);
                let resNoZeroes = "0";

                if(Number(res)!=0) {
                    resNoZeroes = res.toString();

                    while( Number(res)==Number(resNoZeroes.substring(0, resNoZeroes.length-1)) ) {
                        resNoZeroes = resNoZeroes.substring(0, resNoZeroes.length-1);
                    }
                }

                
                display1 += "=";
                display2 = resNoZeroes;
            }
        } break;
    }

    if( display1=="" || display1=="-" ) {
        display1 = "0";
    }
    if( display2=="" || display2=="-" ) {
        display2 = "0";
    }

    if(display2.length>14) {
        display1 = "0";
        display2 = "Overflow";
        input1.textContent = "0";
        input2.textContent = "Overflow";
    } else {
        input1.textContent = display1;
        input2.textContent = display2;
    }
}