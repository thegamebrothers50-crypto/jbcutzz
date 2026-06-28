let selected = null;

const times = [
  "15:00","15:30","16:00","16:30","17:00","17:30","18:00"
];

function renderSlots() {
  const box = document.getElementById("slots");
  box.innerHTML = "";

  times.forEach(t => {
    const d = document.createElement("div");
    d.className = "slot";
    d.innerText = t;

    d.onclick = () => {
      document.querySelectorAll(".slot").forEach(s => s.classList.remove("active"));
      d.classList.add("active");
      selected = t;
    };

    box.appendChild(d);
  });
}

renderSlots();

function book() {
  const date = document.getElementById("date").value;
  const name = document.getElementById("name").value;

  if(!date || !name || !selected) return alert("Fill all fields");

  let data = JSON.parse(localStorage.getItem("bookings") || "[]");

  data.push({date, time:selected, name});

  localStorage.setItem("bookings", JSON.stringify(data));

  alert("Booked!");
}

function login() {
  const pass = document.getElementById("adminPass").value;

  if(pass === "pro123") {
    document.getElementById("adminPanel").classList.remove("hidden");
    load();
  }
}

function load() {
  const box = document.getElementById("bookings");
  const data = JSON.parse(localStorage.getItem("bookings") || "[]");

  box.innerHTML = "";

  data.forEach((b,i) => {
    box.innerHTML += `
      <div class="slot">
        ${b.date} | ${b.time} | ${b.name}
        <button onclick="del(${i})">delete</button>
      </div>
    `;
  });
}

function del(i) {
  let data = JSON.parse(localStorage.getItem("bookings"));
  data.splice(i,1);
  localStorage.setItem("bookings", JSON.stringify(data));
  load();
}