const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

// password check
const checkPassword = (password) => {
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);
}
// fetch function 
async function sendLoginRequest(email, password) {
    let loginCredentialsDTO = {email: email, password: password};
    try {
        const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(loginCredentialsDTO)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
            // TODO Error page ---> José
        }
        return {status: response.ok, data: await response.json()};
    } catch (error) {
        console.error("Credentials not valid");
        alert("Credentials not valid");
        return
    }
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (email.value.trim() === "") {
        alert("Please enter your email.");
        return
    }
    if (!checkPassword(password.value)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
        return
    }
    // add fetch here
    const loginSuccess = await sendLoginRequest(email.value, password.value);
    // if it checks out, go to calendar
    if (loginSuccess.status) {
        document.cookie = `token=${loginSuccess.data.token}`;
        
        // for debugging
        console.log("Login successful, return:");
        console.log(loginSuccess);
        console.log("token:");
        console.log(loginSuccess.data.token);
        console.log("cookie:");
        console.log(document.cookie);

        // go to calendar
        window.location.href = "calendar.html"
    }
}
);

