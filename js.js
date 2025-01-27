// Load navbar
async function loadNavbar() {
    try {

        // Emphasise the current page
        const navbar = document.getElementById("navbar-placeholder");
        let response = await fetch("/navbar.html");
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

// Load project cards if applicable
async function loadProjects() {
    if (document.location.pathname == "/projects.html") {
        try {
            const projectCards = document.getElementById("project-cards");
            const projects = await getProjects();
            let projectHTML = "";
            console.log(projects);
            for (const project of projects) {
                const tagsHTML = project.tags.map(tag => `<span class="badge">${tag}</span>`).join("");

                projectHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="/assets/${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <a href="${project.link}" target="_blank"><i class="bi bi-github"></i></a>
                            <span class="bottom-right">${tagsHTML}</span>
                        </div>
                    </div>
                </div>`
            };
            projectCards.innerHTML = projectHTML;
        } catch (e) {
            console.error("Error loading project cards: ", e);
        }
    };
};
loadProjects();

// Theme switcher  // TODO: Need to implement different theme styling & implement auto detect user's settings
function setTheme(theme) {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    document.getElementById("light-toggle").classList.remove("active");
    document.getElementById("dark-toggle").classList.remove("active");
    document.getElementById("auto-toggle").classList.remove("active");
    document.getElementById(theme.split("-")[0] + "-toggle").classList.add("active");
};

// Get projects
async function getProjects() {
    try {
        let response = await fetch("/projects.json");
        const projects = await response.json();
        return projects;
    } catch(e) {
        console.error("Error fetching projects: ", e);
    }
};