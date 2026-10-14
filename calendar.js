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
	expandIcon.src = "images/chevron_handdraw.svg";
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

let workshops = [
	// --- 15 October (2 events) ---
	{
		title: "Sushi Masterclass",
		subtitle: "Tokyo Street Food",
		description: "Learn the delicate art of making perfect sushi rolls from scratch with our master chef.",
		time: "18h - 21h",
		date: "15 October",
		availableSpots: 5,
		maxCapacity: 15,
		detailUrl: "show.html?id=2"
	},
	{
		title: "Wine & Cheese Pairing",
		subtitle: "French Terroir",
		description: "Discover how to pair artisanal cheeses with fine wines in this interactive tasting session.",
		time: "20h - 22h",
		date: "15 October",
		availableSpots: 12,
		maxCapacity: 30,
		detailUrl: "show.html?id=3"
	},

	// --- 16 October (1 event) ---
	{
		title: "Vegetarian Pizza",
		subtitle: "Gourmet Street Eats",
		description: "Discover our homemade pizza workshop. Learn how to prepare delicious vegetarian pizzas with fresh ingredients.",
		time: "19h - 22h",
		date: "16 October",
		availableSpots: 19,
		maxCapacity: 25,
		detailUrl: "show.html?id=1"
	},

	// --- 17 October (3 events) ---
	{
		title: "Morning Bakery Basics",
		subtitle: "Baking Workshop",
		description: "Start your weekend right by baking fresh croissants and pain au chocolat.",
		time: "09h - 12h",
		date: "17 October",
		availableSpots: 2,
		maxCapacity: 10,
		detailUrl: "show.html?id=4"
	},
	{
		title: "Authentic Thai Curry",
		subtitle: "Spices & Flavors",
		description: "Cook a fragrant and spicy green Thai curry using traditional pestle and mortar techniques.",
		time: "14h - 17h",
		date: "17 October",
		availableSpots: 8,
		maxCapacity: 16,
		detailUrl: "show.html?id=5"
	},
	{
		title: "Craft Cocktail Mixology",
		subtitle: "Nightlife Skills",
		description: "Shake, stir, and sip! Master three classic cocktails and invent your own signature drink.",
		time: "20h - 23h",
		date: "17 October",
		availableSpots: 20,
		maxCapacity: 20,
		detailUrl: "show.html?id=6"
	},

	// --- 18 October (2 events) ---
	{
		title: "Sunday Brunch Classics",
		subtitle: "Weekend Vibes",
		description: "Master the art of poached eggs, hollandaise sauce, and fluffy American pancakes.",
		time: "10h - 13h",
		date: "18 October",
		availableSpots: 4,
		maxCapacity: 12,
		detailUrl: "show.html?id=7"
	},
	{
		title: "Fresh Italian Pasta",
		subtitle: "Nonna's Kitchen",
		description: "Learn to knead and roll fresh pasta dough to make perfect tagliatelle and ravioli.",
		time: "18h - 21h",
		date: "18 October",
		availableSpots: 14,
		maxCapacity: 18,
		detailUrl: "show.html?id=8"
	},

	// --- 19 October (1 event) ---
	{
		title: "Vegan Burger Lab",
		subtitle: "Plant-Based Goodness",
		description: "Build the ultimate plant-based burger with homemade patties and secret vegan sauces.",
		time: "19h - 22h",
		date: "19 October",
		availableSpots: 7,
		maxCapacity: 20,
		detailUrl: "show.html?id=9"
	},

	// --- 20 October (3 events) ---
	{
		title: "Latte Art Workshop",
		subtitle: "Coffee Culture",
		description: "Pour the perfect rosetta and heart shapes with guidance from a professional barista.",
		time: "10h - 12h",
		date: "20 October",
		availableSpots: 0,
		maxCapacity: 8,
		detailUrl: "show.html?id=10"
	},
	{
		title: "Mexican Tacos & Salsas",
		subtitle: "Fiesta Flavors",
		description: "Press your own corn tortillas and prepare three authentic salsas from scratch.",
		time: "15h - 18h",
		date: "20 October",
		availableSpots: 11,
		maxCapacity: 20,
		detailUrl: "show.html?id=11"
	},
	{
		title: "Tapas and Sangria",
		subtitle: "Spanish Evenings",
		description: "A fun evening making traditional Spanish tapas like patatas bravas paired with fruity sangria.",
		time: "19h - 22h",
		date: "20 October",
		availableSpots: 22,
		maxCapacity: 30,
		detailUrl: "show.html?id=12"
	},

	// --- 21 October (2 events) ---
	{
		title: "Macaron Masterclass",
		subtitle: "French Patisserie",
		description: "Demystify the famous French macaron. Learn piping techniques and ganache fillings.",
		time: "14h - 17h",
		date: "21 October",
		availableSpots: 6,
		maxCapacity: 14,
		detailUrl: "show.html?id=13"
	},
	{
		title: "Indian Street Food",
		subtitle: "Spice Route",
		description: "Cook crispy samosas and spicy chaat in this vibrant and aromatic workshop.",
		time: "19h - 22h",
		date: "21 October",
		availableSpots: 15,
		maxCapacity: 25,
		detailUrl: "show.html?id=14"
	},

	// --- 22 October (2 events) ---
	{
		title: "Seafood Prep Basics",
		subtitle: "Ocean Catch",
		description: "Learn how to clean, fillet, and perfectly sear fresh local fish and scallops.",
		time: "18h - 21h",
		date: "22 October",
		availableSpots: 9,
		maxCapacity: 12,
		detailUrl: "show.html?id=15"
	},
	{
		title: "Artisanal Bread Baking",
		subtitle: "Sourdough Secrets",
		description: "Understand fermentation, scoring, and baking techniques for the perfect sourdough loaf.",
		time: "19h - 22h",
		date: "22 October",
		availableSpots: 3,
		maxCapacity: 15,
		detailUrl: "show.html?id=16"
	}
]

const groupedWorkshops = Object.values(
	Object.groupBy(workshops, workshop => workshop.date)
);

console.log(groupedWorkshops)

const daysColumn = document.querySelectorAll('#calendar .day .day_body');
console.log(daysColumn)

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

let expandCardCTAs = document.querySelectorAll('.workshop .workshop_expand');
let cancelCardCTAs = document.querySelectorAll('.workshop .workshop_cta_cancel');
let detailCardCTAs = document.querySelectorAll('.workshop a');


cancelCardCTAs.forEach(button => {
	console.log(button)
	button.addEventListener('mouseenter', (e) => {
		console.log(e)
		let card = e.target.parentElement.parentElement
		card.classList.toggle('danger')
	})
	button.addEventListener('mouseleave', (e) => {
		console.log(e)
		let card = e.target.parentElement.parentElement
		card.classList.toggle('danger')
	})
})

detailCardCTAs.forEach(button => {
	button.addEventListener('mouseenter', (e) => {
		console.log(e)
		let card = e.target.parentElement
		card.classList.toggle('success')
	})
	button.addEventListener('mouseleave', (e) => {
		console.log(e)
		let card = e.target.parentElement
		card.classList.toggle('success')
	})
})

expandCardCTAs.forEach(button => {
	button.addEventListener('click', (e) => {
		let card = e.target.parentElement.parentElement.parentElement
		card.classList.toggle('active')
	})
})

