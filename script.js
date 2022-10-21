//Global Variables
let calcData = {
    allUserIn: [],
    allUserInType: [],
    equationDisplay: "",
    var1: "", 
    opp1: "",
    var2: "",
    opp2: "",
    result: "",
};

function add(a,b) {
    let result = a+b;
    return result.toString();
}
function subtract(a,b) {
    let result = a-b;
    return result.toString();
}
function multiply(a,b) {
    let result = a*b;
    return result.toString();
}
function divide(a,b) {
    let result = a/b;
    return result.toString();
}

function operate(num1,num2,opp) {
    switch (opp) {
        case '+':
            calcData.result = add(num1,num2);
            break;
        case '-':
            calcData.result = subtract(num1,num2);
            break;
        case 'x':
            calcData.result = multiply(num1,num2);
            break;
        case '/':
            calcData.result = divide(num1,num2);
            break;
    }
    resetEq(); //all variables cleared except opp2
    calcData.var1 = calcData.result;
    calcData.result = "";
    calcData.equationDisplay += calcData.var1;
    //need if case for 2nd opperator 
    if (calcData.opp2) { //if opp2 exists 
        //switch opp2 to opp1 and reset opp1
        calcData.opp1 = calcData.opp2;
        calcData.opp2 = "";
        calcData.equationDisplay += calcData.opp1;
    }
    updateDisplay();
}

function resetEq() {
    calcData.allUserIn = [];
    calcData.allUserInType = [];
    calcData.equationDisplay = "";
    calcData.var1 = "";
    calcData.opp1 = "";
    calcData.var2 = "";
}

function updateDisplay() {
    //updates display to reflect equationDisplay variable from calcData object
    //either result if operate has populated the result or unsolved equation
    if (calcData.result !== "") {
        displayElement.textContent = parseFloat(calcData.result).toLocaleString('en');
        //should call update display and create var 1 as the result 
    } else {
        if (calcData.equationDisplay !== "") {
            if (calcData.var2 !== "") {
                displayElement.textContent = `${parseFloat(calcData.var1).toLocaleString('en')} ${calcData.opp1} ${parseFloat(calcData.var2).toLocaleString('en')}` ;
            } else {
                displayElement.textContent = `${parseFloat(calcData.var1).toLocaleString('en')} ${calcData.opp1}`;
            }
        } else {
            displayElement.textContent = "0";
        }
    }
}

function updateEq(tempCharacter,varSelected) {
    //updates variable with new characters based on type of variable type specified as a string
    calcData[varSelected] += tempCharacter;
    calcData.equationDisplay += tempCharacter;
    calcData.allUserInType.push(varSelected);
    updateDisplay();
}

function removeLast() {
    let lastClickType = calcData.allUserInType[calcData.allUserIn.length-1] 
    if (calcData.allUserIn.length !== 0) {
        calcData[lastClickType] = calcData[lastClickType].slice(0,-1); //remove from last stored variable
        calcData.equationDisplay = calcData.equationDisplay.slice(0,-1); //remove from equation display variable
        calcData.allUserIn.pop(); //remove character from user inputs
        calcData.allUserInType.pop(); //remove from user input type variable
    }
    updateDisplay();
}

function styleIn(e) {
    e.stopPropagation();
    document.getElementById("select-ball").classList = e.target.id;
    document.getElementById("body").classList = e.target.id;
}

function numIn(e) {
    e.stopPropagation();
    //add each srcElement clicked to an array in CalcData
    calcData.allUserIn.push(e.srcElement);
    let numIn = e.target.textContent;
    if (calcData.opp1 !== "") {
        //expects numbers to be entered before opperators, if opp DNE var1 if opp exists var 2
        updateEq(numIn,"var2");
    } else {
        updateEq(numIn,"var1");
    }
}

function oppIn(e) {
    e.stopPropagation();
    //add each srcElement clicked to an array in CalcData
    calcData.allUserIn.push(e.srcElement);
    let oppIn = e.target.textContent;


    if (calcData.opp1 === "" && calcData.var1 !== "") {
        //if opp DNE but var1 exists populates opp
        updateEq(oppIn,"opp1");
    } else if (calcData.opp1 !== "" && calcData.var2 !== "") {
        //else executes eq with current variables and sets up new equation with result as var 1 and new opp
        updateEq(oppIn,"opp2"); //adds new click as opp2 variable 
        operate(Number(calcData.var1), Number(calcData.var2), calcData.opp1); //calls operate with opp1 and variables 
    }
}

function equalsIn(e) {
    e.stopPropagation();
    //add each srcElement clicked to an array in CalcData
    calcData.allUserIn.push(e.srcElement);
    let eqIn = e.target.textContent;
    if (calcData.opp1 !== "" && calcData.var2 !== "") {
        //if all variables needed have been populated calls operate w/ variables,
        //updates display, and resets the eq except result variable which is displayed
        operate(Number(calcData.var1), Number(calcData.var2), calcData.opp1);
    }
}

function delIn(e) {
    e.stopPropagation();
    // calcData.allUserIn.pop(); //removing backspace entry
    removeLast();
}

function clearIn(e) {
    e.stopPropagation();
    resetEq();
    calcData.result = "";
    updateDisplay();
}

function decIn(e) {
    e.stopPropagation();
    let decIn = e.target.textContent;
    if (calcData.opp1) {
        //decimal to var2
        if (!calcData.var2.includes(".") ) {
            updateEq(decIn,"var2")
        }
    } else {
        //decimal to var 1
        if (!calcData.var1.includes(".")) {
            updateEq(decIn,"var1")
        }
    }
}

const getDisplayNumber = (number) => {
    let floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "0"
    return number.toLocaleString("en");
}

//DISPLAY WINDOW 
let displayOutput = "";
const displayElement = document.querySelector(".calc-window");

//BUTTONS
const numsAll = document.querySelectorAll(".btn-num");
numsAll.forEach(individualBtn => individualBtn.addEventListener("click",numIn));

const oppsAll = document.querySelectorAll(".btn-opp");
oppsAll.forEach(individualBtn => individualBtn.addEventListener("click",oppIn));

const equalsBtn = document.querySelector(".btn-equals");
equalsBtn.addEventListener("click",equalsIn);

const delBtn = document.querySelector(".btn-del");
delBtn.addEventListener("click",delIn);

const clearBtn = document.querySelector(".btn-clear");
clearBtn.addEventListener("click",clearIn);

const decimalBtn = document.querySelector(".btn-dec");
decimalBtn.addEventListener("click",decIn);
 
const styleBtns = document.querySelectorAll(".style-select");
styleBtns.forEach(individualBtn => individualBtn.addEventListener("click",styleIn));




