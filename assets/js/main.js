let navLinks = document.querySelectorAll('.nav-link');
function checkActivePage() {
    let currentUrl = window.location.href;
    navLinks.forEach(link => {
        let anchor = link.querySelector('a');
        if (!anchor) return;
        let linkHref = anchor.getAttribute('href');
        if (linkHref === '/' || linkHref === 'index.html' || linkHref === './index.html') {
            if (currentUrl.endsWith('/') || currentUrl.endsWith('index.html')) {
                link.classList.add('active');
                return;
            }
        }
        if (linkHref !== '/' && currentUrl.endsWith(linkHref)) {
            link.classList.add('active');
        } else if (linkHref !== '/' && !currentUrl.endsWith(linkHref)) {
            link.classList.remove('active');
        }
    });
}

const collapsedBtn = document.querySelector('.navbar-collapse-btn');
const collapsedNav = document.querySelector('.collapsed-navbar');
function toggleNavbar() {
    if (collapsedBtn) {
        let isClicked = collapsedBtn.getAttribute('data-active') === 'true';
        if (!isClicked) {
            collapsedNav.classList.add('show');
            collapsedBtn.setAttribute('data-active', 'true');

        }
        else {
            collapsedNav.classList.remove('show');
            collapsedBtn.setAttribute('data-active', 'false');
        }
    }
}

function copyLink() {
    const siteURL = 'https://mj256x.github.io/Climate-Shift/';
    navigator.clipboard.writeText(siteURL);
    document.getElementById('btn-text').innerText = 'Link Copied!';
    document.querySelector('.alert').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 2000);
}

document.addEventListener('click', (e) => {
    if (!collapsedNav.contains(e.target) && !collapsedBtn.contains(e.target) && collapsedNav.classList.contains('show')) {
        collapsedNav.classList.remove('show');
        collapsedBtn.setAttribute('data-active', 'false');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    checkActivePage();
    document.querySelector('.navbar-collapse-btn').addEventListener('click', toggleNavbar);
    document.getElementById('copy-link')?.addEventListener('click', copyLink);
});