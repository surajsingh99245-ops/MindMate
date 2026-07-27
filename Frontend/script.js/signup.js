document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !username || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "login.html";
        } else {
            alert(data.error || "Signup failed");
        }

    } catch (error) {
        console.error(error);
        alert("Cannot connect to the server.");
    }
});