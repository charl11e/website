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

        // Add event listeners for theme togglers

        // Switch to light mode
        document.getElementById("light-toggle").addEventListener("click", function() {
            setTheme("light");
        });

        // Switch to dark mode
        document.getElementById("dark-toggle").addEventListener("click", function() {
            setTheme("dark");
        });

        // Switch to auto mode
        document.getElementById("auto-toggle").addEventListener("click", function() {
            setTheme("auto");
        });

    } catch(e) {
        console.error("Error loading navbar: ", e);
    };
};

// Load user's saved theme
async function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        setTheme("auto");
    };
};

// Theme switcher
function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    document.getElementById("light-toggle").classList.remove("active");
    document.getElementById("dark-toggle").classList.remove("active");
    document.getElementById("auto-toggle").classList.remove("active");
    document.getElementById(theme + "-toggle").classList.add("active");

    if (theme == "auto") {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", "light");
        };
    };
};

// Detect when user changes theme if set to auto mode
function detectThemeChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem("theme") == "auto") {
            if (e.matches) {
                document.documentElement.setAttribute("data-bs-theme", "dark");
            } else {
                document.documentElement.setAttribute("data-bs-theme", "light");
            };
        };
    });
};

// Load project cards if applicable
async function loadProjects() {
    if (document.location.pathname == "/projects.html") {
        try {
            const projectCards = document.getElementById("project-cards");
            const projects = await getProjects();
            let projectHTML = "";
            for (const project of projects) {
                const tagsHTML = project.tags.map(tag => `<span class="badge">${tag}</span>`).join("");

                projectHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="/assets/${project.image}" class="card-img-top project-image" alt="${project.title}">
                        <div class="card-body project-card">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <a href="${project.link}" target="_blank"><i class="project-link bi bi-github"></i></a>
                            <div class="bottom-right">${tagsHTML}</div>
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

async function load() {
    try {
        await loadNavbar();
        await loadTheme();
        detectThemeChange();
        await loadProjects();
    }
    catch(e) {
        console.error("Error loading: ", e);
    };
}

load();