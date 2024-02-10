


function operation (x, operator, y){
    let a = Number(x)
    let b = Number(y)
    if (operator == '+'){
        return a + b;
    }
    else if (operator == '-'){
        return a - b;
    }
    else if (operator == 'x'){
        return a * b;
    }
    else if ( operator == '/'){
        return a / b;
    }
    else if (operator == '^'){
        return Math.pow(a,b);
    }
    else{
        return undefined;
    }

}

function isOperator(char){
    return(char == '+' || char == '-' || char == '/' || char == 'x' || char == '^')
}

// an array to store the variables
 let variablesArray = [];
 // flag for the decimal point
 let isDecimalClicked = false;
 // the display text
 let variables = document.getElementById("text");
 let displayResult = document.getElementById("result");
 let errorText = document.getElementById("error-text")


// to display the numbers when buttons clicked
let numbersbuttons = document.querySelector('.calc-buttons')

// calculator functions and logic
numbersbuttons.addEventListener('click', function(event){
      //clear error text
      errorText.innerHTML = ""

   
    // To avoid the elements to getting out of the calculator display
    if (variables.textContent.length > 9){
        variables.innerHTML = ""
        errorText.textContent = "come on man that is out of my reach"
    }
    // display numbers
    else if(event.target.classList.contains('num')){
        // if a numbers is clicked and there is a result
        if(displayResult.textContent.length != 0){
            variables.innerHTML ="";
            displayResult.innerHTML = "";
            variablesArray = [];
        }
       // let lastElement = variablesArray[variablesArray.length - 1]
        variables.textContent += event.target.textContent
        
       
    }
    // a special condition for the decimal point so it is used one time for a number
    else if(event.target.classList.contains('decimal-point') && isDecimalClicked == false){
        if(displayResult.textContent.length != 0){
            variables.innerHTML ="";
            displayResult.innerHTML = "";
            variablesArray = [];
        }
        variables.textContent += event.target.textContent;
        isDecimalClicked = true;
    }
    // delete the last element 
    else if(event.target.classList.contains('delete')){
       // if delete is clicked and there is a result
       if(displayResult.textContent.length != 0){
            displayResult.innerHTML = "";
            variablesArray = variablesArray.slice(0,-1);
        }
        // if an operator is deleted empty the array
        let lastElement = variables.textContent[variables.textContent.length - 1];
        if(isOperator(lastElement)){
            variablesArray = [];
        }
       variables.textContent = variables.textContent.slice(0,-1);
        
        
    }
    // clear the calculator
    else if (event.target.classList.contains('clear')){
        variables.innerHTML ="";
        displayResult.innerHTML = "";
        variablesArray = [];
    }

    // if operator is clicked 
    else if (event.target.classList.contains('operator')){
        // set the flag to false so it can be used again
        isDecimalClicked = false
        // If the user want to use the result and make more operations
        if(displayResult.textContent.length != 0){
            variables.textContent = displayResult.textContent;
            displayResult.innerHTML = "";
            variablesArray = [];
        }
         // if more than one operator before equal is clicked
        else if(variablesArray.length == 2){
            let subArray = variables.textContent.split(variablesArray[1])
            variablesArray.push(subArray[1])
            let result = operation(variablesArray[0], variablesArray[1], variablesArray[2]);
            variables.textContent = result;
            variablesArray = [];
        }
        
        // push the variables to the array
        variablesArray.push(variables.textContent);
        variablesArray.push(event.target.textContent)
        variables.textContent += event.target.textContent
        
    }
    else if (event.target.classList.contains('equal-sign')){
        // set the flag to false so it can be used again
        isDecimalClicked = false
        // calculate the result if there is 2 elements or more
        if(variablesArray.length == 2){
            let subArray = variables.textContent.split(variablesArray[1])
            variablesArray.push(subArray[1])
            let result = operation(variablesArray[0], variablesArray[1], variablesArray[2]);
            
            // display the result and round the decimal to the nearest 2 
            if (result % 1 !== 0)
                result = result.toFixed(2);
            displayResult.textContent = result;
        }

        
    }

});
