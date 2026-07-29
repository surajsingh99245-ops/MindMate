const heroText = document.getElementById("heroText");
const chatHome = document.getElementById("chatHome");

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

if (profileBtn && profile) {
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profile.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!profile.contains(e.target)) {
            profile.classList.remove("active");
        }
    });
}

// ================= AI CHAT =================

const messages = document.querySelector(".messages");
const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");

if (messages && input && sendBtn) {

    function addMessage(text, sender) {
        const message = document.createElement("div");

        message.className = sender === "user" ? "user-message" : "ai-message";

        message.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage() {

        const message = input.value.trim();

        if (message === "") return;

        // Show user's message
        addMessage(message, "user");

        if (heroText && !heroText.classList.contains("hidden")) {
            heroText.classList.add("hidden");
        }

        if (chatHome) chatHome.classList.add("chat-started");

        input.value = "";

        let typingIndicator;

        try {
            typingIndicator = showTypingIndicator();

            const username = localStorage.getItem("username");

            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    message: message
                })
            });

            const data = await response.json();

            typingIndicator.remove();

            addMessage(data.reply, "ai");

        } catch (error) {

            console.error(error);

            if (typingIndicator) {
                typingIndicator.remove();
            }

            addMessage("Sorry, something went wrong.", "ai");

        }

    }

    function showTypingIndicator() {

        const typing = document.createElement("div");

        typing.className = "ai-message typing-indicator";

        typing.innerHTML = `
            <div class="message-content">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        messages.appendChild(typing);

        messages.scrollTop = messages.scrollHeight;

        return typing;

    }

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}

const micBtn = document.querySelector(".mic-btn");

if (micBtn) {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;

        micBtn.addEventListener("click", () => {

            recognition.start();

            micBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;

        });

        recognition.onresult = (event) => {

            input.value = event.results[0][0].transcript;

        };

        recognition.onend = () => {

            micBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;

        };

    } else {

        micBtn.style.display = "none";

    }

}