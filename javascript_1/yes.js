/* Just an alert and making sure the alert only shows once per device */
if (!localStorage.getItem('alertShown')) {
    alert("By using Noteify, you agree to the terms and conditions.");
    localStorage.setItem('alertShown', 'true');
  }


  /* Just a math integration to hit DAE requirements until I find a better idea */
let userAge = 18;
    if (userAge >= 18) {
        console.log("User is an adult.");
    } else {
        console.log("User is not an adult.");
}


function checkAge() {
    let userAge = prompt("Enter your age:");
    userAge = parseInt(userAge);
  
    let outputMessage;
    if (userAge >= 18) {
      outputMessage = "User is an adult.";
    } else {
      outputMessage = "User is not an adult.";
    }
  
    // Output to console
    console.log(outputMessage);
  
    // Output to the browser screen
    document.getElementById("output").innerText = outputMessage;
  }
  
/* Text Boxes stuff for the notes I guess */
function addTextBox() {
  const container = document.getElementById('text-box-container');
  const newTextBox = document.createElement('input');
  newTextBox.type = 'text';
  newTextBox.className = 'note-box';
  newTextBox.style.width = '100%';
  newTextBox.placeholder = 'Enter your note here...';
  container.appendChild(newTextBox);
}

function saveTextBoxes() {
  const textBoxes = document.getElementsByClassName('note-box');
  let texts = [];
  for (let i = 0; i < textBoxes.length; i++) {
      texts.push(textBoxes[i].value);
  }
  localStorage.setItem('textBoxes', JSON.stringify(texts));
  alert('Text boxes saved!');
}

function loadTextBoxes() {
  const texts = JSON.parse(localStorage.getItem('textBoxes'));
  if (texts) {
      const container = document.getElementById('text-box-container');
      container.innerHTML = '';
      texts.forEach(text => {
          const newTextBox = document.createElement('input');
          newTextBox.type = 'text';
          newTextBox.className = 'note-box';
          newTextBox.style.width = '100%';
          newTextBox.value = text;
          newTextBox.placeholder = 'Enter your note here...';
          container.appendChild(newTextBox);
      });
  }
}

window.onload = loadTextBoxes;