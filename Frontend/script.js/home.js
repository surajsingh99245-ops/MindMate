const profile = document.querySelector(".profile");
const profileBtn = document.querySelector(".profile-btn");

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    profile.classList.toggle("active");

});

document.addEventListener("click", (e) => {

    if (!profile.contains(e.target)) {

        profile.classList.remove("active");

    }

});