const toggleTheme = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
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

document.addEventListener('DOMContentLoaded', updateIcon);