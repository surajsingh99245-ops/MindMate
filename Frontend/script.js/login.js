document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message);
            window.location.href = "main.html";
        } else {
            alert(data.message || "Invalid username or password");
        }

    } catch (error) {
        console.error(error);
        alert("Cannot connect to the server.");
    }
});