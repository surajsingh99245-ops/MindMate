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



// ================= DAILY CHECK-IN =================

// Check-in form
const checkinForm = document.getElementById("checkinForm");


// ==================================================
// MOOD SELECTION
// ==================================================

const moodOptions = document.querySelectorAll(".mood-option");

// This stores the selected mood
let selectedMood = null;

moodOptions.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove selected state from all mood buttons
        moodOptions.forEach((option) => {

            option.classList.remove("selected");

        });

        // Add selected state to clicked button
        button.classList.add("selected");

        // Store mood data
        selectedMood = {

            label: button.dataset.mood,

            score: Number(button.dataset.value)

        };

        // Testing
        console.log("Selected Mood:", selectedMood);

    });

});


// ==================================================
// STRESS & ENERGY
// ==================================================

const stressSlider = document.getElementById("stressLevel");
const energySlider = document.getElementById("energyLevel");

const stressValue = document.getElementById("stressValue");
const energyValue = document.getElementById("energyValue");


// Store current values
let selectedStressLevel = Number(stressSlider.value);

let selectedEnergyLevel = Number(energySlider.value);


// ==================================================
// STRESS LEVEL
// ==================================================

stressSlider.addEventListener("input", () => {

    selectedStressLevel = Number(stressSlider.value);

    stressValue.textContent =
        `${selectedStressLevel} / 5`;

    // Testing
    console.log(
        "Stress Level:",
        selectedStressLevel
    );

});


// ==================================================
// ENERGY LEVEL
// ==================================================

energySlider.addEventListener("input", () => {

    selectedEnergyLevel = Number(energySlider.value);

    energyValue.textContent =
        `${selectedEnergyLevel} / 5`;

    // Testing
    console.log(
        "Energy Level:",
        selectedEnergyLevel
    );

});


// ==================================================
// SLEEP QUALITY
// ==================================================

const sleepOptions = document.querySelectorAll(".sleep-option");

let selectedSleep = null;


sleepOptions.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove previous selection
        sleepOptions.forEach((option) => {

            option.classList.remove("selected");

        });


        // Select clicked option
        button.classList.add("selected");


        // Store backend-friendly data
        selectedSleep = {

            label: button.dataset.sleep,

            score: Number(button.dataset.value)

        };


        // Testing
        console.log("Sleep Quality:", selectedSleep);

    });

});


// ==================================================
// TODAY'S EMOTIONS
// ==================================================

const emotionOptions =
    document.querySelectorAll(".emotion-option");

const emotionLimit =
    document.getElementById("emotionLimit");

let selectedEmotions = [];

const MAX_EMOTIONS = 3;


emotionOptions.forEach((button) => {

    button.addEventListener("click", () => {

        const emotion = button.dataset.emotion;


        // If already selected → remove it
        if (selectedEmotions.includes(emotion)) {

            selectedEmotions =
                selectedEmotions.filter(
                    (item) => item !== emotion
                );

            button.classList.remove("selected");

        }

        // Otherwise → add it
        else {

            // Don't allow more than 3
            if (selectedEmotions.length >= MAX_EMOTIONS) {

                return;

            }

            selectedEmotions.push(emotion);

            button.classList.add("selected");

        }


        // Update counter
        emotionLimit.textContent =
            `${selectedEmotions.length} / ${MAX_EMOTIONS} selected`;


        // Testing
        console.log(
            "Selected Emotions:",
            selectedEmotions
        );

    });

});


// ==================================================
// DAILY REFLECTION
// ==================================================

const reflection =
    document.getElementById("reflection");

const characterCount =
    document.getElementById("characterCount");


let reflectionText = "";


reflection.addEventListener("input", () => {

    reflectionText = reflection.value.trim();

    characterCount.textContent =
        `${reflection.value.length} / 500`;

    console.log(
        "Reflection:",
        reflectionText
    );

});


// ==================================================
// SUBMIT DAILY CHECK-IN
// ==================================================

checkinForm.addEventListener("submit", (e) => {

    e.preventDefault();


    // ================= VALIDATION =================

    if (!selectedMood) {

        alert("Please select your mood.");

        return;

    }

    if (!selectedSleep) {

        alert("Please select your sleep quality.");

        return;

    }

    if (selectedEmotions.length === 0) {

        alert("Please select at least one emotion.");

        return;

    }


    // ================= CREATE CHECK-IN DATA =================

    const checkinData = {

        mood: {
            label: selectedMood.label,
            score: selectedMood.score
        },

        stressLevel: selectedStressLevel,

        energyLevel: selectedEnergyLevel,

        sleepQuality: {
            label: selectedSleep.label,
            score: selectedSleep.score
        },

        emotions: selectedEmotions,

        reflection: reflectionText

    };


    // ================= TEST DATA =================

    console.log("Daily Check-In Data:");
    console.log(checkinData);


    // ================= SUCCESS STATE =================

    const checkinSuccess =
        document.getElementById("checkinSuccess");

    const checkinHeader =
        document.getElementById("checkinHeader");


    // Reset the actual form
    checkinForm.reset();


    // Remove Mood selection
    moodOptions.forEach((option) => {

        option.classList.remove("selected");

    });


    // Remove Sleep selection
    sleepOptions.forEach((option) => {

        option.classList.remove("selected");

    });


    // Remove Emotion selections
    emotionOptions.forEach((option) => {

        option.classList.remove("selected");

    });


    // Reset JavaScript variables
    selectedMood = null;

    selectedStressLevel = 3;

    selectedEnergyLevel = 3;

    selectedSleep = null;

    selectedEmotions = [];

    reflectionText = "";


    // Reset visible values
    stressValue.textContent = "3 / 5";

    energyValue.textContent = "3 / 5";

    emotionLimit.textContent = "0 / 3 selected";

    characterCount.textContent = "0 / 500";


    // Hide form and heading
    checkinForm.style.display = "none";

    checkinHeader.style.display = "none";


    // Show completed screen
    checkinSuccess.classList.add("show");


    // Scroll to completed message
    checkinSuccess.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});