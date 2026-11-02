const form = document.querySelector(".workshop-form");

const name = document.querySelector("#name");
const category = document.querySelector("#category");
const startTime = document.querySelector("#start-time");
const endTime = document.querySelector("#end-time");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const capacity = document.querySelector("#capacity");
const description = document.querySelector("#description");


function combineDateAndTime(date, time) {
    return `${date}T${time}:00.000Z`;
}


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (name.value.trim().length < 3) {
        alert("The name must contain at least 3 characters");
        name.focus();
        return;
    }

    if (category.value.trim() === "") {
        alert("Please enter a category");
        category.focus();
        return;
    }
    if (!startDate.value || !startTime.value || !endDate.value || !endTime.value) {
        alert("Please select both start and end dates and times");
        return;
    }

    const start = new Date(combineDateAndTime(startDate.value, startTime.value));
    const end = new Date(combineDateAndTime(endDate.value, endTime.value));

    if (end <= start) {
        alert("The end date and time must be later than the start date and time");
        endTime.focus();
        return;
    }

    if (capacity.value === "" || Number(capacity.value) < 1) {
        alert("The capacity must be greater than 0");
        capacity.focus();
        return;
    }

    if (description.value.trim().length < 10) {
        alert("The description must contain at least 10 characters");
        description.focus();
        return;
    }

    // Prepare the data
    const workshop = {
        name: name.value.trim(),
        categoryID: category.value,
        startTime: combineDateAndTime(startDate.value, startTime.value),
        endTime: combineDateAndTime(endDate.value, endTime.value),
        maxCapacity: Number(capacity.value),
        description: description.value.trim()
    };
    console.log("Workshop data:", workshop);
    console.log("JSON sent:", JSON.stringify(workshop));
    try {
        // Send the data to the API
        const response = await fetch("http://localhost:8081/workshops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workshop)
        });

        // Check the server response
        if (!response.ok) {
            throw new Error("Error while creating the workshop");
        }

        const result = await response.json();
        console.log("Server response:", result);

        alert("Workshop created successfully!");


        // Reset the form
        form.reset();

    } catch (error) {
        console.error(error);
        alert("Unable to create the workshop.");
    }

});




//recuperer les categories 
async function loadCategories() {
    try {
        const response = await fetch("http://localhost:8081/categories");

        if (!response.ok) {
            throw new Error("Unable to load categories");
        }

        const categories = await response.json();

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;

            document.querySelector("#category").appendChild(option);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

loadCategories();