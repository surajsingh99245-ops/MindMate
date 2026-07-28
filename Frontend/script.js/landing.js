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

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const userInput = document.getElementById('userInput');
    const micBtn = document.getElementById('micBtn');

    // Configuration
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // English language

    // When recording starts
    recognition.onstart = () => {
        micBtn.classList.add('listening');
    };

    // When speech is recognized
    recognition.onresult = (event) => {
        let transcript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        // Add the recognized text to the input box
        userInput.value = transcript.trim();
        userInput.focus();
    };

    // When recording ends
    recognition.onend = () => {
        micBtn.classList.remove('listening');
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        micBtn.classList.remove('listening');

        if (event.error === 'network') {
            alert('Network error. Please check your connection.');
        } else if (event.error === 'no-speech') {
            alert('No speech detected. Please try again.');
        }
    };

    // Mic button click handler
    micBtn.addEventListener('click', () => {
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            userInput.value = ''; // Clear previous text
            recognition.start();
        }
    });
} else {
    // If Speech Recognition is not supported
    const micBtn = document.getElementById('micBtn');
    micBtn.disabled = true;
    micBtn.title = 'Speech Recognition not supported in your browser';
    micBtn.style.opacity = '0.5';
}
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chips = document.querySelectorAll(".chip");

// Create message bubble
function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className = `message ${sender}-message`;

    message.innerHTML = `
      <div class="message-avatar">
    ${sender === "ai"
            ? `<img src="Image Asset/robot.png" alt="MindMate">`
            : `<i class="fa-solid fa-user"></i>`
        }
</div>

       <div class="message-content">
    ${marked.parse(text)}
</div>
    `;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {

    const typing = document.createElement("div");

    typing.className = "message ai-message typing-indicator";

    typing.innerHTML = `
        <div class="message-avatar">
            <img src="Image Asset/robot.png" alt="MindMate AI">
        </div>

        <div class="message-content typing-content">

            <span></span>
            <span></span>
            <span></span>

        </div>
    `;

    chatMessages.appendChild(typing);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typing;

}

// Send message
async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";
    userInput.placeholder = "";
    try {
        let typingIndicator = showTypingIndicator();
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
        typingIndicator.remove();
        chatMessages.scrollTo({

            top: chatMessages.scrollHeight,

            behavior: "smooth"

        });
        if (response.ok && data.success) {

            addMessage(data.reply, "ai");

        } else {

            if (response.status === 429) {

                addMessage(
                    "⚠️ MindMate has reached its free daily AI limit.\n\nPlease try again in about a minute or use a new Gemini API key.",
                    "ai"
                );

            } else {

                addMessage(
                    "⚠️ Sorry, something went wrong while contacting MindMate. Please try again.",
                    "ai"
                );

            }

        }
    } catch (err) {

        console.error("ERROR:", err);
        document.querySelector(".typing-indicator")?.remove();
        addMessage(
            "⚠️ Unable to connect to MindMate. Please check your internet connection and try again.",
            "ai"
        );

    }
}
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});
chips.forEach((chip) => {

    chip.addEventListener("click", () => {

        userInput.value = chip.innerText;

        sendMessage();

    });

});