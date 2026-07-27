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