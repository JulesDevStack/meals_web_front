const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

// comments are handwritten for my own needs and for my pair programmer - no ai <- Filip

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
        /* TODO find the real route - too lazy right now and not sure which one it is,
         or if i need to write it from scratch in back */
        const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(loginCredentialsDTO)
        });
        // TODO need to confirm if credentials match in the back end before I can get this response
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
            // TODO Error page
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
    console.log(email + "\n" + password) // for debugging, delete later
    const loginSuccess = await sendLoginRequest(email.value, password.value);
    // if it checks out, go to calendar here
    if (loginSuccess.status) {
        document.cookie = `token=${loginSuccess.data}`;
        console.log("Login successful")
        console.log(loginSuccess)
        // TODO GO TO CALENDAR HERE - need to do it
        //window.location.href = "calendar.html"
    }
}
);

