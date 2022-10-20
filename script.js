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
        case '*':
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
        displayElement.textContent = calcData.result;
        //should call update display and create var 1 as the result 
    } else {
        displayElement.textContent = calcData.equationDisplay;
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
        console.log("Back Works")
        calcData[lastClickType] = calcData[lastClickType].slice(0,-1); //remove from last stored variable
        calcData.equationDisplay = calcData.equationDisplay.slice(0,-1); //remove from equation display variable
        calcData.allUserIn.pop(); //remove character from user inputs
        calcData.allUserInType.pop(); //remove from user input type variable
    }
    updateDisplay();
}

function sort() {
    let tempUserInEle = calcData.allUserIn[calcData.allUserIn.length-1]; //selects temp element from latest click event selected by user
    //checks 1st class of selected element to differentiates type of button selected and determines action
    switch (tempUserInEle.className.split(" ")[0]) { 
        case "num":
            if (calcData.opp1 !== "") {
                //expects numbers to be entered before opperators, if opp DNE var1 if opp exists var 2
                updateEq(tempUserInEle.textContent,"var2");
            } else {
                updateEq(tempUserInEle.textContent,"var1");
            }
            break;
        case "opp":
            if (calcData.opp1 === "" && calcData.var1 !== "") {
                //if opp DNE but var1 exists populates opp
                updateEq(tempUserInEle.textContent,"opp1");
            } else if (calcData.opp1 !== "" && calcData.var2 !== "") {
                //else executes eq with current variables and sets up new equation with result as var 1 and new opp
                updateEq(tempUserInEle.textContent,"opp2"); //adds new click as opp2 variable 
                operate(Number(calcData.var1), Number(calcData.var2), calcData.opp1); //calls operate with opp1 and variables 
            }
            break;
        case "eq":
            if (calcData.opp1 !== "" && calcData.var2 !== "") {
                //if all variables needed have been populated calls operate w/ variables,
                //updates display, and resets the eq except result variable which is displayed
                operate(Number(calcData.var1), Number(calcData.var2), calcData.opp1);
            }
            break;
        case "back":
            //calls remove last when pressed
            calcData.allUserIn.pop(); //removing backspace entry
            removeLast();
            break;
        case "clear":
            //clears all variables and updates display
            resetEq();
            calcData.result = "";
            updateDisplay();
            break;
        case "dec":
            if (calcData.opp1) {
                //decimal to var2
                if (!calcData.var2.includes(".") ) {
                    console.log("Hello2")
                    updateEq(tempUserInEle.textContent,"var2")
                }
            } else {
                //decimal to var 1
                if (!calcData.var1.includes(".")) {
                    console.log("Hello1")
                    updateEq(tempUserInEle.textContent,"var1")
                }
            }
            break;
    }
}

function userIn(e) {
    e.stopPropagation();
    calcData.allUserIn.push(e.srcElement);//adds each srcElement clicked to an array in CalcData
    sort() //calls sort to sort through the click type 
    console.log(calcData);
}

function styleIn(e) {
    e.stopPropagation();
    console.log(e.target.id);
    document.getElementById("select-ball").classList = e.target.id;
    document.getElementById("body").classList = e.target.id;
}

//DISPLAY WINDOW 
let displayOutput = "";
const displayElement = document.querySelector(".window");

//BUTTONS
const btnsAll = document.querySelectorAll(".btn");
btnsAll.forEach(individualBtn => individualBtn.addEventListener("click",userIn));
 
const styleBtns = document.querySelectorAll(".style-select");
styleBtns.forEach(individualBtn => individualBtn.addEventListener("click",styleIn));




