// Import Firestore functions
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();

// Save text boxes data to Firebase
async function saveTextBoxes() {
    const textBoxElements = document.getElementsByClassName('note-box');
    let textBoxValues = [];
    for (let textBoxIndex = 0; textBoxIndex < textBoxElements.length; textBoxIndex++) {
        textBoxValues.push(textBoxElements[textBoxIndex].value);
    }

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

// Load text boxes data from Firebase
async function loadTextBoxes() {
    try {
        const docRef = doc(db, 'userNotes', 'notes');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const savedTextBoxValues = docSnap.data().textBoxValues;
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
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error loading text boxes from Firebase: ', error);
    }
}

window.onload = loadTextBoxes;
