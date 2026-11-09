import {getJWT} from "../tools.js"

const name = document.querySelector("#name")
const category = document.querySelector("#category")
const startTime = document.querySelector("#hour-start")
const endTime = document.querySelector("#hour-end")
const startDate = document.querySelector("#day-start")
const endDate = document.querySelector("#day-end")
const maxCapacity = document.querySelector("#capacity")
const description = document.querySelector("#description-details")
const participantsList = document.querySelector("#participants-list")
const btnUpdate = document.querySelector("#btn-update");
const btnCancel = document.getElementById("btn-cancel")
const btnDelete = document.getElementById("btn-delete")
const workshopID = new URLSearchParams(window.location.search).get("id");

let currentCategoryID = null;
let currentTotalSubscribers = 0;


btnCancel.addEventListener('click', e => {
	e.preventDefault()
	window.location.pathname = "calendar/calendar.html"
})

btnDelete.addEventListener('click', async e => {
	e.preventDefault()
	const response = await fetch(
		'http://172.33.1.250:8081/workshops/' + workshopID,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getJWT()}`
			}
		}
	);

	if (!response.ok) {
		window.alert(`Erreur HTTP : ${response.status}`)
	}

	window.location.pathname = "calendar/calendar.html"
})

async function getWorkshopByID() {
	try {
		const response = await fetch(
			'http://172.33.1.250:8081/workshops/' + workshopID,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${getJWT()}`
				}
			}
		);

		if (!response.ok) {
			window.alert(`Erreur HTTP : ${response.status}`)
		}

		const data = await response.json();
		displayParticipants(data.reservations ?? []);

		const workshop = data.workshopDTO ?? data;
		currentCategoryID = workshop.categoryID;
		currentTotalSubscribers = workshop.totalSubscribers;

		await getCategories(workshop.categoryID);

		name.value = workshop.name ?? "";
		description.value = workshop.description ?? "";
		maxCapacity.value = workshop.maxCapacity ?? "";

		const start = new Date(workshop.startTime);
		const end = new Date(workshop.endTime);

		startTime.value = start.toTimeString().slice(0, 5);
		endTime.value = end.toTimeString().slice(0, 5);

		startDate.value = [
			start.getFullYear(),
			String(start.getMonth() + 1).padStart(2, "0"),
			String(start.getDate()).padStart(2, "0")
		].join("-");

		endDate.value = [
			end.getFullYear(),
			String(end.getMonth() + 1).padStart(2, "0"),
			String(end.getDate()).padStart(2, "0")
		].join("-");

	} catch (error) {
		console.error("Erreur lors de la récupération :", error);
	}
}

async function getCategories(categoryID) {
	try {
		const response = await fetch("http://172.33.1.250:8081/workshops/cate",
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${getJWT()}`
				}
			});

		if (!response.ok) {
			// throw new Error("Impossible de récupérer les catégories");
			window.alert("fetch categories impossible")
		}

		const categories = await response.json();

		// category.innerHTML = "";

		categories.forEach(cat => {
			const option = document.createElement("option");
			option.value = cat.id;
			option.textContent = cat.name;
			category.appendChild(option);
		});

		category.value = categoryID

	} catch (error) {
		console.error("Erreur catégories :", error);
	}
}

async function cancelReservation(reservationID, participantElement) {
	const token = getJWT();

	try {
		const response = await fetch(
			`http://172.33.1.250:8081/reservations/cancel/${reservationID}`,
			{
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			const error = await response.text();
			console.error("Erreur lors de l'annulation :", error);
			return;
		}

		// Retirer visuellement le participant
		participantElement.remove();

	} catch (error) {
		console.error("Erreur :", error);
	}
}

async function UpdateWorkshopByID() {

	const start = new Date(`${startDate.value}T${startTime.value}:00`);
	const end = new Date(`${endDate.value}T${endTime.value}:00`);

	const workshopData = {
		name: name.value,
		startTime: start.toISOString(),
		endTime: end.toISOString(),
		maxCapacity: Number(maxCapacity.value),
		totalSubscribers: currentTotalSubscribers,
		description: description.value,
		categoryID: category.value
	};

	const response = await fetch(
		"http://172.33.1.250:8081/workshops/" + workshopID,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getJWT()}`
			},
			body: JSON.stringify(workshopData)
		}
	);
	if (!response.ok) {
		const error = await response.text();
		console.error("Erreur lors de la modification :", error);
		return;
	} else {
		window.alert("Atelier modifié avec succès")
		window.location.pathname = "calendar/calendar.html"
	}

}

btnUpdate.addEventListener("click", (event) => {
	event.preventDefault();
	UpdateWorkshopByID();
});

function displayParticipants(reservations) {

	participantsList.innerHTML = "";

	reservations
		.filter(reservation => reservation.status !== "annulée")
		.forEach(reservation => {

			const participantElement = document.createElement("div");
			participantElement.classList.add("participant-item");

			const userName = document.createElement("span");
			userName.textContent = reservation.userName;

			const deleteButton = document.createElement("button");
			deleteButton.type = "button";
			deleteButton.classList.add("participant-delete");
			deleteButton.textContent = "×";

			deleteButton.addEventListener("click", async e => {
				// e.preventDefault()
				// console.log("coicou")
				await cancelReservation(reservation.id, participantElement);
			});

			participantElement.append(userName, deleteButton);

			participantsList.appendChild(participantElement);
		});
}

await getWorkshopByID();