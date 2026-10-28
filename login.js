const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");


form.addEventListener("submit", function (event) {

    if (email.value.trim() === "") {
        event.preventDefault(); // annule le dechargement de la page
        alert("Veuillez saisir votre email");
    }

    if (password.value.length < 8) {
        event.preventDefault();
        alert("Le mot de passe doit contenir au moins 8 caractères");
    }

});