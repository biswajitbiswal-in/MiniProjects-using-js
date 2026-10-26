
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const date = document.getElementById("date");

function updateClock() {
    const now = new Date();

    hours.innerText = String(now.getHours()).padStart(2, "0");
    minutes.innerText = String(now.getMinutes()).padStart(2, "0");
    seconds.innerText = String(now.getSeconds()).padStart(2, "0");

    date.innerText = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).toUpperCase();
}

updateClock();

setInterval(updateClock, 1000);

