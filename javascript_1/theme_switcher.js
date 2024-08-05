// Select the button and the body
const toggleThemeButton = document.getElementById('theme_switcher');
const body = document.body;

// Function to apply the theme
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
}

// Load the saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Add an event listener to the button to handle the theme toggle
toggleThemeButton.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});