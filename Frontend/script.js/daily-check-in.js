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

// =====================================================================
// DAILY CHECK-IN — NEW CODE ADDED BELOW
// Everything above this line is unchanged from the original file.
// =====================================================================

(function initDailyCheckIn() {

    const checkinForm = document.getElementById("checkinForm");

    // If this page doesn't have the check-in form, do nothing.
    if (!checkinForm) return;

    const username = localStorage.getItem("username");

    const checkinSuccess = document.getElementById("checkinSuccess");
    const submitBtn = document.getElementById("submitCheckin");

    // ---- Mood ----
    const moodButtons = document.querySelectorAll(".mood-option");
    let selectedMood = null; // { mood: "Happy", value: 4 }

    moodButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            moodButtons.forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedMood = {
                mood: btn.dataset.mood,
                value: Number(btn.dataset.value)
            };
        });
    });

    // ---- Stress slider ----
    const stressInput = document.getElementById("stressLevel");
    const stressValue = document.getElementById("stressValue");

    if (stressInput && stressValue) {
        stressInput.addEventListener("input", () => {
            stressValue.textContent = `${stressInput.value} / 5`;
        });
    }

    // ---- Energy slider ----
    const energyInput = document.getElementById("energyLevel");
    const energyValue = document.getElementById("energyValue");

    if (energyInput && energyValue) {
        energyInput.addEventListener("input", () => {
            energyValue.textContent = `${energyInput.value} / 5`;
        });
    }

    // ---- Sleep quality ----
    const sleepButtons = document.querySelectorAll(".sleep-option");
    let selectedSleep = null; // { sleep: "Good", value: 3 }

    sleepButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            sleepButtons.forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedSleep = {
                sleep: btn.dataset.sleep,
                value: Number(btn.dataset.value)
            };
        });
    });

    // ---- Emotions (max 3) ----
    const emotionButtons = document.querySelectorAll(".emotion-option");
    const emotionLimit = document.getElementById("emotionLimit");
    const MAX_EMOTIONS = 3;
    let selectedEmotions = [];

    function updateEmotionLimitText() {
        if (emotionLimit) {
            emotionLimit.textContent = `${selectedEmotions.length} / ${MAX_EMOTIONS} selected`;
        }
    }

    emotionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const emotion = btn.dataset.emotion;
            const alreadySelected = btn.classList.contains("selected");

            if (alreadySelected) {
                btn.classList.remove("selected");
                selectedEmotions = selectedEmotions.filter((e) => e !== emotion);
            } else {
                if (selectedEmotions.length >= MAX_EMOTIONS) {
                    return; // limit reached, ignore further clicks
                }
                btn.classList.add("selected");
                selectedEmotions.push(emotion);
            }

            updateEmotionLimitText();
        });
    });

    // ---- Reflection character count ----
    const reflectionInput = document.getElementById("reflection");
    const characterCount = document.getElementById("characterCount");

    if (reflectionInput && characterCount) {
        reflectionInput.addEventListener("input", () => {
            characterCount.textContent = `${reflectionInput.value.length} / 500`;
        });
    }

    // ---- Helpers ----
    function showCompletedState() {
        checkinForm.style.display = "none";
        if (checkinSuccess) {
            checkinSuccess.classList.add("show");
        }
    }

    function showAlert(message) {
        // Simple, non-blocking feedback. Swap for a nicer toast if you have one.
        alert(message);
    }

    // ---- On load: check if today's check-in already exists ----
    async function loadTodayStatus() {
        if (!username) return;

        try {
            const res = await fetch(`http://localhost:3000/daily-checkin/today/${encodeURIComponent(username)}`)
            const data = await res.json();

            if (res.ok && data.checkedInToday) {
                showCompletedState();
            }
        } catch (err) {
            console.error("Failed to check today's check-in status:", err);
            // Fail silently here — worst case the user just sees the form.
        }
    }

    // ---- Submit ----
    checkinForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!username) {
            showAlert("You need to be logged in to submit a check-in.");
            return;
        }

        if (!selectedMood) {
            showAlert("Please select your mood.");
            return;
        }

        if (!selectedSleep) {
            showAlert("Please select your sleep quality.");
            return;
        }

        const payload = {
            username,
            mood: selectedMood.mood,
            moodValue: selectedMood.value,
            stressLevel: Number(stressInput.value),
            energyLevel: Number(energyInput.value),
            sleepQuality: selectedSleep.sleep,
            sleepValue: selectedSleep.value,
            selectedEmotions,
            reflection: reflectionInput ? reflectionInput.value.trim() : null
        };

        try {
            submitBtn.disabled = true;
            submitBtn.classList.add("loading");

            const res = await fetch("http://localhost:3000/daily-checkin",  {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                const message =
                    (data.errors && data.errors.join("\n")) ||
                    data.message ||
                    "Something went wrong. Please try again.";
                showAlert(message);
                return;
            }

            showCompletedState();

        } catch (err) {
            console.error("Failed to submit check-in:", err);
            showAlert("Network error. Please check your connection and try again.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
        }
    });

    loadTodayStatus();

})();