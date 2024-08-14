/* Just an alert and making sure the alert only shows once per device */
if (!localStorage.getItem('alertShown')) {
    alert("By using Soute, you agree to the terms and conditions.");
    localStorage.setItem('alertShown', 'true');
}

function checkMathOperation() {
    // Ask the user for their age
    let userAge = prompt("Enter your age:");
    userAge = parseInt(userAge);

    // Ask the user for two numbers
    let firstNumber = parseInt(prompt("Enter the first number:"));
    let secondNumber = parseInt(prompt("Enter the second number:"));

    // Ask the user if they want to add or subtract the numbers
    let mathOperation = prompt("Do you want to add or subtract the numbers? (Enter '+' for addition or '-' for subtraction)");

    let operationResult;
    if (mathOperation === "+") {
        operationResult = firstNumber + secondNumber;
    } else if (mathOperation === "-") {
        operationResult = firstNumber - secondNumber;
    } else {
        operationResult = "Invalid operation!";
    }

    let outputMessage;
    if (userAge >= 18) {
        outputMessage = `User is an adult. The result of the operation is: ${operationResult}`;
    } else {
        outputMessage = `User is not an adult. The result of the operation is: ${operationResult}`;
    }

    // Output to console
    console.log(outputMessage);

    // Output to the browser screen
    document.getElementById("output").innerText = outputMessage;
}

/* Text Boxes stuff for the notes */
function addTextBox() {
    const textBoxContainer = document.getElementById('text-box-container');
    const newTextBox = document.createElement('input');
    newTextBox.type = 'text';
    newTextBox.className = 'note-box';
    newTextBox.style.width = '100%';
    newTextBox.placeholder = 'Enter your note here...';
    textBoxContainer.appendChild(newTextBox);
}

function saveTextBoxes() {
    const textBoxElements = document.getElementsByClassName('note-box');
    let textBoxValues = [];
    for (let textBoxIndex = 0; textBoxIndex < textBoxElements.length; textBoxIndex++) {
        textBoxValues.push(textBoxElements[textBoxIndex].value);
    }
    localStorage.setItem('textBoxValues', JSON.stringify(textBoxValues));
    alert('Text boxes saved!');
}

function loadTextBoxes() {
    const savedTextBoxValues = JSON.parse(localStorage.getItem('textBoxValues'));
    if (savedTextBoxValues) {
        const textBoxContainer = document.getElementById('text-box-container');
        textBoxContainer.innerHTML = '';
        savedTextBoxValues.forEach(textValue => {
            const newTextBox = document.createElement('input');
            newTextBox.type = 'text';
            newTextBox.className = 'note-box';
            newTextBox.style.width = '100%';
            newTextBox.value = textValue;
            newTextBox.placeholder = 'Enter your note here...';
            textBoxContainer.appendChild(newTextBox);
        });
    }
}

window.onload = loadTextBoxes;