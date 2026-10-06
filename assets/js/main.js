function checkActivePage() {
    let navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (window.location.href === link.querySelector('a').href) {
            link.classList.add('active');
        }
        else {
            link.classList.remove('active');
        }
    });
}

function toggleNavbar() {
    const collapsedBtn = document.querySelector('.navbar-collapse-btn');
    if (collapsedBtn) {
        let isClicked = collapsedBtn.getAttribute('data-active') === 'true';
        if (!isClicked) {
            document.querySelector('.collapsed-navbar').classList.add('show');
            collapsedBtn.setAttribute('data-active', 'true')

        }
        else {
            document.querySelector('.collapsed-navbar').classList.remove('show');
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

document.addEventListener('DOMContentLoaded', () => {
    checkActivePage();
    document.querySelector('.navbar-collapse-btn').addEventListener('click', toggleNavbar);
    document.getElementById('copy-link')?.addEventListener('click', copyLink);
});