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
// ================= AI CHAT =================

const messages = document.querySelector(".messages");
const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");

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

    input.value = "";

    try {

       const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        addMessage(data.reply, "ai");

    } catch (error) {

        console.error(error);

        addMessage("Sorry, something went wrong.", "ai");

    }

}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});