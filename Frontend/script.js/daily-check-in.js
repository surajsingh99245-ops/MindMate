const profile = document.querySelector(".profile");
const profileBtn = document.querySelector(".profile-btn");
const loggedUser = document.getElementById("loggedUser");

if (loggedUser) {
    loggedUser.textContent = localStorage.getItem("username");
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
    });
}