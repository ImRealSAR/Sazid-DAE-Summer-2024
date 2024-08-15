// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, deleteUser } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js"; // Import Firebase Storage
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHCuWQE5DgQBxT5rYh97j2KO6GAOqbCrs",
    authDomain: "soute-sardev.firebaseapp.com",
    projectId: "soute-sardev",
    storageBucket: "soute-sardev.appspot.com",
    messagingSenderId: "761868083764",
    appId: "1:761868083764:web:05d6473183b78a318da061",
    measurementId: "G-3WWKCGYE0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const analytics = getAnalytics(app);

// Function to log message to console and display as an alert
function logAndAlert(message) {
    console.log(message);
    alert(message);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signUp').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                logAndAlert('User signed up: ' + userCredential.user.email);
                sendVerificationEmail(userCredential.user); // Send verification email
            })
            .catch((error) => {
                logAndAlert('Sign-up error: ' + error.message);
            });
    });

    document.getElementById('signIn').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                logAndAlert('User signed in: ' + userCredential.user.email);
            })
            .catch((error) => {
                logAndAlert('Sign-in error: ' + error.message);
            });
    });
});

/* Email verification system  */
import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Function to send email verification
function sendVerificationEmail(user) {
    sendEmailVerification(user)
        .then(() => {
            logAndAlert('Verification email sent.');
        })
        .catch((error) => {
            logAndAlert('Error sending verification email: ' + error.message);
        });
}

/* Delete account system */
import { deleteUser } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Function to delete user account
document.getElementById('deleteAccount').addEventListener('click', () => {
    const user = auth.currentUser;
    deleteUser(user)
        .then(() => {
            logAndAlert('User account deleted.');
        })
        .catch((error) => {
            logAndAlert('Error deleting user account: ' + error.message);
        });
});

/* View User Profile system */
// Function to display user profile
document.getElementById('showProfile').addEventListener('click', () => {
    const user = auth.currentUser;
    if (user) {
        logAndAlert('User email: ' + user.email);
    } else {
        logAndAlert('No user is signed in.');
    }
});

/* Upload a File to Firebase Storage */
async function uploadFile(file) {
    const storageRef = ref(storage, 'uploads/' + file.name); // Create a reference to 'uploads/fileName'
    try {
        const snapshot = await uploadBytes(storageRef, file); // Upload the file
        console.log('Uploaded a file!', snapshot);
        const downloadURL = await getDownloadURL(storageRef); // Get the download URL
        console.log('File available at', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Upload failed', error);
    }
}

// Usage example
document.getElementById('uploadButton').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file).then((url) => {
            console.log('File uploaded successfully. Download URL:', url);
        });
    }
});

/* Download a File from Firebase Storage */
async function downloadFile(filePath) {
    const storageRef = ref(storage, filePath); // Create a reference to the file
    try {
        const downloadURL = await getDownloadURL(storageRef); // Get the download URL
        console.log('File available at', downloadURL);
        // You can now use the URL to display the file or download it
    } catch (error) {
        console.error('Download failed', error);
    }
}

// Usage example
downloadFile('uploads/example.jpg');
