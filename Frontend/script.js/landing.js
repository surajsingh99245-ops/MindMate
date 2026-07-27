const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

// Toggle Menu
menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    if (mobileMenu.classList.contains("active")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});

// Close menu when a link is clicked
mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuBtn.textContent = "☰";

    });

});

// Close menu when clicking outside
document.addEventListener("click", (e) => {

    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedMenuBtn = menuBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedMenuBtn && mobileMenu.classList.contains("active")) {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuBtn.textContent = "☰";

    }

});