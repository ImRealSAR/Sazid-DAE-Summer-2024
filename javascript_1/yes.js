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
  
