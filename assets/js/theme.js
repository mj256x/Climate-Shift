const themeBtn = document.querySelector('.theme-btn');
const moonSVG = `<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>`;
const sunSVG = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;

function applyTheme(isDark) {
    const toggle = (selector, className) => {
        const el = document.querySelector(selector);
        if (el) el.classList.toggle(className, isDark);
    };
    const toggleAll = (selector, className) => {
        document.querySelectorAll(selector).forEach(el => el.classList.toggle(className, isDark));
    };
    toggle('nav', 'dark-navbar-footer');
    toggle('.collapsed-navbar', 'dark-navbar-footer');
    toggle('.navbar-collapse-btn', 'dark-mode-text');
    toggle('footer', 'dark-navbar-footer');
    toggle('.navbar-brand-title', 'dark-mode-text');
    toggleAll('.nav-link a', 'dark-mode-text');
    toggleAll('.footer-text', 'dark-mode-text');
    toggle('body', 'dark-body');
    toggle('.content-title', 'dark-mode-text');
    toggle('.content-description', 'dark-mode-text');
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.backgroundImage = isDark
            ? 'url(assets/images/c.webp)'
            : 'url(assets/images/c-light.webp)';
    }
    document.querySelectorAll('.hero-card').forEach(card => {
        card.classList.toggle('dark-card', isDark);
        const info = card.querySelector('.card-info');
        if (info) info.classList.toggle('dark-mode-text', isDark);
    });
    toggle('.signals-brief', 'dark-mode-text');
    document.querySelectorAll('.signal-card').forEach(card => {
        card.classList.toggle('dark-card', isDark);
        const title = card.querySelector('.signal-card-title');
        if (title) title.classList.toggle('dark-mode-text', isDark);
        const desc = card.querySelector('.signal-card-description');
        if (desc) desc.classList.toggle('dark-mode-text', isDark);
    });
    toggle('.why-info', 'dark-mode-text');
    toggle('.why-section', 'dark-navbar-footer');
    toggle('.why-section svg', 'dark-mode-svg');
    toggle('.take-action-hero .hero-title', 'dark-mode-text');
    toggle('.take-action-hero .hero-description', 'dark-mode-text');
    toggle('.take-action-checklist', 'dark-card');
    toggle('.take-action-now', 'dark-card');
    toggle('.take-action-now div h1', 'dark-mode-text');
    toggle('.take-action-now div p', 'dark-mode-text');
    toggle('.take-action-checklist .card-title', 'dark-mode-text');
    toggle('.action-path', 'dark-mode-text');
    toggleAll('.action-steps .action-step span', 'dark-mode-text');
    toggleAll('.take-action-checklist .checklist-item', 'dark-mode-text');
    toggleAll('.take-action-checklist svg', 'dark-mode-light-svg');
    toggleAll('.svg-circle', 'dark-mode-svg-circle');
    toggle('main.weather-page', 'dark-body');
    toggle('main.weather-page', 'dark-mode-text');
    document.querySelectorAll('main.weather-page .text-black-50').forEach(el => {
        el.classList.toggle('text-white-50', isDark);
    });
    document.querySelectorAll('main.weather-page .weather-card').forEach(el => {
        el.classList.toggle('dark-card', isDark);
    });
    if (themeBtn) themeBtn.innerHTML = isDark ? sunSVG : moonSVG;
}

if (themeBtn) {
    themeBtn.addEventListener('click', function () {
        const isDark = localStorage.getItem('theme') !== 'dark';
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

let savedTheme = localStorage.getItem('theme');
if (!savedTheme) {
    savedTheme = 'light';
    localStorage.setItem('theme', 'light');
}

if (savedTheme === 'dark') {
    applyTheme(true);
}
