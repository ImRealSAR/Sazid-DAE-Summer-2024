const toggleTheme = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        document.body.classList.add('light-mode'); // default theme
    }
    updateIcon();
});

toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    updateIcon();
});

function updateIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌙';
        themeIcon.classList.remove('sun-icon');
        themeIcon.classList.add('moon-icon');
    } else {
        themeIcon.textContent = '☀️';
        themeIcon.classList.remove('moon-icon');
        themeIcon.classList.add('sun-icon');
    }
}