
getWorkshop()

function getHourFromDate(date) {
	return new Date(date).toLocaleTimeString('fr-FR', {
		hour: '2-digit'
	})
}

function getWorkshop() {

	fetch('http://localhost:8081/workshops')
		.then(response => response.json())
		.then((workshops) => {
			const workshopsDTO = workshops.map(workshop => {
				let startHour = getHourFromDate(workshop.startTime)
				let endHour = getHourFromDate(workshop.endTime)

				return {
					title: workshop.name,
					subtitle: workshop.categoryName,
					description: workshop.description,
					time: `${startHour} - ${endHour}`,
					date: new Date(workshop.startTime).toLocaleDateString('fr-FR'),
					availableSpots: workshop.availableSpot,
					maxCapacity: workshop.maxCapacity
				}
			});
			buildCalendar(workshopsDTO)
		})
}

function buildCalendar(workshops) {
	const groupedWorkshops = Object.values(
		Object.groupBy(workshops, workshop => workshop.date)
	);

	const daysColumn = document.querySelectorAll('#calendar .day .day_body');

	daysColumn.forEach((column, key) => {
		groupedWorkshops[key].forEach((workshop) => {
			let workshopElement = createWorkshop({
				title: workshop.title,
				subtitle: workshop.subtitle,
				description: workshop.description,
				time: workshop.time,
				date: workshop.date,
				availableSpots: workshop.availableSpots,
				maxCapacity: workshop.maxCapacity
			})
			column.appendChild(workshopElement)
		})
	})

	assignEvent()
}

function assignEvent() {
	let expandCardCTAs = document.querySelectorAll('.workshop .workshop_expand');
	let cancelCardCTAs = document.querySelectorAll('.workshop .workshop_cta_cancel');
	let detailCardCTAs = document.querySelectorAll('.workshop a');
	let cards = document.querySelectorAll('.workshop');

	cancelCardCTAs.forEach(button => {
		button.addEventListener('mouseenter', (e) => {
			let card = e.target.parentElement.parentElement
			card.classList.toggle('danger')
		})
		button.addEventListener('mouseleave', (e) => {
			let card = e.target.parentElement.parentElement
			card.classList.toggle('danger')
		})
	})

	detailCardCTAs.forEach(button => {
		button.addEventListener('mouseenter', (e) => {
			let card = e.target.parentElement
			card.classList.toggle('success')
		})
		button.addEventListener('mouseleave', (e) => {
			let card = e.target.parentElement
			card.classList.toggle('success')
		})
	})

	expandCardCTAs.forEach((button, key) => {
		button.addEventListener('click', (e) => {
			cards.forEach(card => card.classList.remove('active'))
			let card = e.target.parentElement.parentElement.parentElement
			card.classList.toggle('active')
		})
	})

}

function createWorkshop({
	title,
	subtitle,
	description,
	time,
	date,
	availableSpots,
	maxCapacity
}) {
	const article = document.createElement("article");
	article.classList.add("workshop");

	const content = document.createElement("div");
	content.classList.add("workshop_content");

	const titleElement = document.createElement("p");
	titleElement.classList.add("workshop_title");
	titleElement.textContent = title;

	const subtitleElement = document.createElement("p");
	subtitleElement.classList.add("workshop_subtitle");
	subtitleElement.textContent = subtitle;

	const descriptionElement = document.createElement("p");
	descriptionElement.classList.add("workshop_description");
	descriptionElement.textContent = description;

	const body = document.createElement("div");
	body.classList.add("workshop_body");

	const timeElement = document.createElement("p");
	timeElement.textContent = time;

	const dateElement = document.createElement("p");
	dateElement.textContent = date;

	body.append(timeElement, dateElement);

	const spots = document.createElement("p");
	spots.classList.add("workshop_spots");

	const availableSpotsElement = document.createElement("span");
	availableSpotsElement.classList.add("workshop_availableSpot");
	availableSpotsElement.textContent = availableSpots;

	const maxCapacityElement = document.createElement("span");
	maxCapacityElement.classList.add("workshop_maxCapacity");
	maxCapacityElement.textContent = maxCapacity;

	spots.append(
		availableSpotsElement,
		document.createTextNode(" / "),
		maxCapacityElement,
		document.createTextNode(" spots available")
	);

	const cancelButton = document.createElement("button");
	cancelButton.classList.add("workshop_cta_cancel");
	cancelButton.textContent = "Cancel";

	const expandButton = document.createElement("button");
	expandButton.classList.add("workshop_expand");

	const expandIcon = document.createElement("img");
	expandIcon.src = "/images/chevron_handdraw.svg";
	expandIcon.alt = "unfold card to see details";

	expandButton.append(expandIcon);

	const detailLink = document.createElement("a");
	detailLink.classList.add("workshop_cta_detail");
	detailLink.href = "#";
	detailLink.textContent = "Details";

	content.append(
		titleElement,
		subtitleElement,
		descriptionElement,
		body,
		spots,
		cancelButton,
		expandButton
	);

	article.append(content, detailLink);

	return article;
}
