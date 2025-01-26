// Load navbar
async function loadNavbar() {
    try {
        const navbar = document.getElementById("navbar-placeholder");
        const response = await fetch("/navbar.html");
        const navbarHTML = await response.text();
        navbar.innerHTML = navbarHTML;

        const navLinks = document.querySelectorAll(".nav-link");
        const currentPath = window.location.pathname;
        for (let i=0; i<navLinks.length; i++) {
            if (navLinks[i].getAttribute('href') == currentPath) {
                navLinks[i].classList.add("active");
            };
        };
    } catch(e) {
        console.error("Error loading navbar: ", e);
    }
};
loadNavbar();