const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");



form.addEventListener("submit", function (event) {
   
    if (email.value.trim() === "") {
         event.preventDefault();
        alert("Please enter your email.");
    }
    const checkPassword = (password) => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);
    }

    if (!checkPassword(password.value)) {
        event.preventDefault();
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
    }
}
);

