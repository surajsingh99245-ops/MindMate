const profile = document.querySelector(".profile-checkin");
const profileBtn = document.querySelector(".profile-btn-checkin");

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    profile.classList.toggle("active");

});

document.addEventListener("click", (e) => {

    if (!profile.contains(e.target)) {

        profile.classList.remove("active");

    }

});