// Load navbar
async function loadNavbar() {
    try {

        // Emphasise the current page
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

        // Load user's saved theme if applicable
        const theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme);
        } else {
            setTheme("auto");
        };

        // Switch to light mode
        document.getElementById("light-toggle").addEventListener("click", function() {
            setTheme("light-mode");
        });

        // Switch to dark mode
        document.getElementById("dark-toggle").addEventListener("click", function() {
            setTheme("dark-mode");
        });

        // Switch to auto mode
        document.getElementById("auto-toggle").addEventListener("click", function() {
            setTheme("auto-mode");
        });

    } catch(e) {
        console.error("Error loading navbar: ", e);
    };
};
loadNavbar();

// Theme switcher
function setTheme(theme) {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    document.getElementById("light-toggle").classList.remove("active");
    document.getElementById("dark-toggle").classList.remove("active");
    document.getElementById("auto-toggle").classList.remove("active");
    document.getElementById(theme.split("-")[0] + "-toggle").classList.add("active");

    if (theme == "auto-mode") {
        console.log("need to implement");
    }
}