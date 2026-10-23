const properties = [
  {
    id: 1,
    deal: "eladó",
    type: "Lakás",
    city: "Budapest",
    price: 100000,
    area: 118,
    rooms: 3,
    title: "Lakás Budapesten",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    deal: "eladó",
    type: "Lakás",
    city: "Budapest, XVIII. kerület",
    price: 52900000,
    area: 63,
    rooms: 2,
    title: "Felújított, napfényes lakás",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    deal: "kiadó",
    type: "Lakás",
    city: "Gyál",
    price: 220000,
    area: 54,
    rooms: 2,
    title: "Modern lakás jó elhelyezkedéssel",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    deal: "eladó",
    type: "Családi ház",
    city: "Vecsés",
    price: 79900000,
    area: 105,
    rooms: 4,
    title: "Családi ház Vecsésen",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    deal: "eladó",
    type: "Ház",
    city: "Gyál",
    price: 10000,
    area: 45,
    rooms: 2,
    title: "Családi ház Gyálon",
    image: "https://www.lakaskultura.hu/ingatlanpiac/nagymeretu-lakasok-lehetosegei/"
  },
];

const grid = document.getElementById("listingGrid");

function render(items) {
  grid.innerHTML = "";
  document.getElementById("emptyState").hidden = items.length !== 0;

  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "property-card";
    card.innerHTML = `
      <div class="property-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="deal-badge">${p.deal}</span>
      </div>
      <div class="property-body">
        <p class="property-price">${p.price.toLocaleString("hu-HU")} Ft${p.deal === "kiadó" ? "/hó" : ""}</p>
        <h3 class="property-title">${p.title}</h3>
        <p class="property-city">⌖ ${p.city} · ${p.type}</p>
        <div class="property-specs">
          <span>⌂ ${p.area} m²</span>
          <span>▦ ${p.rooms} szoba</span>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

render(properties);

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const deal = document.getElementById("filterDeal").value;
  const type = document.getElementById("filterType").value;
  const city = document.getElementById("filterCity").value.trim().toLocaleLowerCase("hu-HU");
  const max = Number(document.getElementById("filterMax").value) || Infinity;

  render(properties.filter(p =>
    (deal === "all" || p.deal === deal) &&
    (type === "all" || p.type === type) &&
    (!city || p.city.toLocaleLowerCase("hu-HU").includes(city)) &&
    p.price <= max
  ));

  document.getElementById("ingatlanok").scrollIntoView({ behavior: "smooth" });
});

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
