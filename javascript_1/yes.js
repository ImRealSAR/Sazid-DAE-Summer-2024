// Display alert only once per device
if (!localStorage.getItem('alertShown')) {
    alert("By using Soute, you agree to the terms and conditions.");
    localStorage.setItem('alertShown', 'true');
}

// Function to check and perform a math operation based on user input
function checkMathOperation() {
    let userAge = parseInt(prompt("Enter your age:"));
    let firstNumber = parseInt(prompt("Enter the first number:"));
    let secondNumber = parseInt(prompt("Enter the second number:"));
    let mathOperation = prompt("Do you want to add or subtract the numbers? (Enter '+' for addition or '-' for subtraction)");

    let operationResult;
    if (mathOperation === "+") {
        operationResult = firstNumber + secondNumber;
    } else if (mathOperation === "-") {
        operationResult = firstNumber - secondNumber;
    } else {
        operationResult = "Invalid operation!";
    }

    let outputMessage = userAge >= 18 
        ? `User is an adult. The result of the operation is: ${operationResult}` 
        : `User is not an adult. The result of the operation is: ${operationResult}`;

    console.log(outputMessage);
    document.getElementById("output").innerText = outputMessage;
}

// Import Firestore functions
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();

// Function to add a new text box for notes
function addTextBox() {
    const textBoxContainer = document.getElementById('text-box-container');
    const newTextBox = document.createElement('input');
    newTextBox.type = 'text';
    newTextBox.className = 'note-box';
    newTextBox.style.width = '100%';
    newTextBox.placeholder = 'Enter your note here...';
    textBoxContainer.appendChild(newTextBox);
}

// Function to save text boxes data to both localStorage and Firebase
async function saveTextBoxes() {
    const textBoxElements = document.getElementsByClassName('note-box');
    let textBoxValues = Array.from(textBoxElements).map(textBox => textBox.value);

    // Save to localStorage
    localStorage.setItem('textBoxValues', JSON.stringify(textBoxValues));
    alert('Text boxes saved locally!');

    // Save to Firebase
    try {
        await setDoc(doc(db, 'userNotes', 'notes'), {
            textBoxValues: textBoxValues,
            timestamp: new Date()
        });
        alert('Text boxes saved to Firebase!');
    } catch (error) {
        console.error('Error saving text boxes to Firebase: ', error);
    }
}

// Function to load text boxes data from Firebase and localStorage
async function loadTextBoxes() {
    try {
        const docRef = doc(db, 'userNotes', 'notes');
        const docSnap = await getDoc(docRef);

        let savedTextBoxValues;
        if (docSnap.exists()) {
            savedTextBoxValues = docSnap.data().textBoxValues;
        } else {
            savedTextBoxValues = JSON.parse(localStorage.getItem('textBoxValues')) || [];
        }

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
    } catch (error) {
        console.error('Error loading text boxes from Firebase: ', error);
    }
}

// Load text boxes when the window loads
window.onload = loadTextBoxes;