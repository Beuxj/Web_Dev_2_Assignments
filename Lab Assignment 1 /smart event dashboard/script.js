var titleInput = document.getElementById("title");
var dateInput = document.getElementById("date");
var categoryInput = document.getElementById("category");
var descriptionInput = document.getElementById("description");

var addEventBtn = document.getElementById("addEventBtn");
var eventsContainer = document.getElementById("eventsContainer");
var clearBtn = document.getElementById("clearBtn");
var sampleBtn = document.getElementById("sampleBtn");

var keyDisplay = document.getElementById("keyDisplay");

addEventBtn.addEventListener("click", function () {

    if (
        titleInput.value === "" ||
        dateInput.value === "" ||
        categoryInput.value === "" ||
        descriptionInput.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    addEventCard(
        titleInput.value,
        dateInput.value,
        categoryInput.value,
        descriptionInput.value
    );

    titleInput.value = "";
    dateInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";
});

function addEventCard(title, date, category, description) {

    var card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
        <button class="delete-btn">X</button>
        <h3>${title}</h3>
        <span>${date} - ${category}</span>
        <p>${description}</p>
    `;

    eventsContainer.appendChild(card);
}

eventsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }
});

clearBtn.addEventListener("click", function () {
    eventsContainer.innerHTML = "";
});

sampleBtn.addEventListener("click", function () {
    addEventCard(
        "Web Development Conference",
        "2026-02-15",
        "Conference",
        "Annual conference on modern web technologies."
    );

    addEventCard(
        "JavaScript Workshop",
        "2026-02-20",
        "Workshop",
        "Hands-on JavaScript learning session."
    );
});

document.addEventListener("keydown", function (event) {
    keyDisplay.textContent = "You Pressed: " + event.key;
});
