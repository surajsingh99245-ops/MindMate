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

// ================= PROFILE DROPDOWN =================

const checkinProfile =
    document.querySelector(".profile-checkin");

const checkinProfileBtn =
    document.querySelector(".profile-btn-checkin");


if (checkinProfile && checkinProfileBtn) {

    checkinProfileBtn.addEventListener("click", function (e) {

        e.preventDefault();

        e.stopPropagation();

        checkinProfile.classList.toggle("active");

        console.log("Profile clicked");

    });


    document.addEventListener("click", function (e) {

        if (!checkinProfile.contains(e.target)) {

            checkinProfile.classList.remove("active");

        }

    });

}