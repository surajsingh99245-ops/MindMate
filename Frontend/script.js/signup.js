document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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

        if (data.success) {
            alert("Account created successfully!");
            window.location.href = "login.html";
        } else {
            alert(data.error || "Signup failed");
        }
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});