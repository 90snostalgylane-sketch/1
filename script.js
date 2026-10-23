
const properties = [
  {
   

  id: 1,
  deal: "eladó",
  type: "Lakás",
  city: "Budapest",
  price: 45000000,
  area: 45,
  rooms: 2,
  title: "Eladó 45 m²-es felújított lakás saját kerttel és kocsibeállóval",
  description: `Eladó egy 45 m²-es, teljesen felújított lakás saját, kizárólagos kertrésszel és privát kocsibeállóval, ügyvédi megosztásos épületben.

Az épület első lakása közvetlen utcai bejárattal rendelkezik, így a lakás és a kert privát módon használható. Minden közmű külön mérőórával rendelkezik, nincs almérős rendszer.

A lakás teljes körű felújításon esett át: új nyílászárók, villamos-, víz- és csatornahálózat, új hideg- és melegburkolatok, szaniterek és konyhabútor készültek.

A lakóközösség összetartó és barátságos. A környék infrastruktúrája kiváló, a Határ úti metró körülbelül 10 perc alatt elérhető.

Ideális első lakásnak, kisebb családnak vagy befektetésnek. A 3%-os hitel lehetősége az aktuális feltételek és az ingatlan jogosultságának függvényében ellenőrizendő.`,
  features: [
    "45 m² alapterület",
    "2 szoba – ellenőrizendő",
    "Teljes körű felújítás",
    "Saját, kizárólagos kertrész",
    "Privát kocsibeálló",
    "Külön közműmérőórák",
    "Közvetlen utcai bejárat",
    "Határ úti metró kb. 10 percre"
  ],
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
  ]
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
    description: "Modern hangulatú, napfényes lakás praktikus elrendezéssel. Jó választás lehet első otthonnak, pároknak vagy befektetési célra. A pontos műszaki és társasházi információkat érdeklődés esetén lehet egyeztetni.",
    features: ["63 m² alapterület", "2 szoba", "Felújított hangulat", "Praktikus elrendezés"],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80"
    ]
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
    description: "Kényelmes, modern hangulatú lakás két szobával. A bemutató leírás a valós hirdetési adatokkal és a bérleti feltételekkel később pontosítható.",
    features: ["54 m² alapterület", "2 szoba", "Modern belső tér", "Havi bérleti díj"],
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80"
    ]
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
    description: "Tágas családi ház, amely megfelelő alapot kínálhat egy kényelmes otthon kialakításához. A környezet és az ingatlan részletes bemutatása személyes egyeztetéskor történhet. Az alábbi képek illusztrációk, nem igazoltan az ingatlanról készültek.",
    features: ["105 m² alapterület", "4 szoba", "Családi házas kialakítás", "Személyes megtekintés egyeztethető"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: 5,
    deal: "eladó",
    type: "Ház",
    city: "Gyál",
    price: 10000,
    area: 45,
    rooms: 2,
    title: "Ház Gyálon – bemutató adatlap",
    description: "Ez egy technikai mintaadatlap a galéria és a részletes leírás kipróbálásához. Élesítés előtt töltsd fel a valós árat, adatokat, leírást és a saját ingatlanfotókat.",
    features: ["45 m² alapterület", "2 szoba", "Mintaadat", "Valós adatokra cserélendő"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];

const grid = document.getElementById("listingGrid");
const emptyState = document.getElementById("emptyState");
const searchForm = document.getElementById("searchForm");

const formatPrice = property =>
  property.price.toLocaleString("hu-HU") +
  " Ft" +
  (property.deal === "kiadó" ? "/hó" : "");

function render(items) {
  grid.innerHTML = "";
  emptyState.hidden = items.length > 0;

  items.forEach(property => {
    const card = document.createElement("article");
    card.className = "property-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", property.title + " – részletek");

    card.innerHTML = `
      <div class="property-image">
        <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
        <span class="deal-badge">${property.deal}</span>
      </div>
      <div class="property-body">
        <p class="property-price">${formatPrice(property)}</p>
        <h3 class="property-title">${property.title}</h3>
        <p class="property-city">⌖ ${property.city} · ${property.type}</p>
        <div class="property-specs">
          <span>⌂ ${property.area} m²</span>
          <span>▦ ${property.rooms} szoba</span>
        </div>
        <span class="property-more">Részletek és fotók <span>↗</span></span>
      </div>
    `;

    card.addEventListener("click", () => openDetails(property));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetails(property);
      }
    });

    grid.appendChild(card);
  });
}

// Az adatlapot automatikusan létrehozzuk.
const modal = document.createElement("div");
modal.className = "property-modal";
modal.id = "propertyModal";
modal.hidden = true;
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("aria-label", "Ingatlan részletei");

modal.innerHTML = `
  <div class="property-modal-backdrop" data-close-modal></div>
  <div class="property-modal-panel">
    <button class="property-modal-close" type="button"
      aria-label="Adatlap bezárása">×</button>
    <div id="detailContent"></div>
  </div>
`;
document.body.appendChild(modal);

const detailContent = document.getElementById("detailContent");
const closeButton = modal.querySelector(".property-modal-close");
let previousFocus = null;

function openDetails(property) {
  previousFocus = document.activeElement;

  detailContent.innerHTML = `
    <div class="detail-gallery">
      <div class="detail-main-image">
        <img id="detailMainImage"
          src="${property.images[0]}"
          alt="${property.title}">
        <span class="deal-badge">${property.deal}</span>
        <span class="gallery-counter" id="galleryCounter">
          1 / ${property.images.length}
        </span>
      </div>
      <div class="detail-thumbnails" aria-label="Ingatlanfotók">
        ${property.images.map((image, index) => `
          <button class="detail-thumb ${index === 0 ? "active" : ""}"
            type="button"
            data-image-index="${index}"
            aria-label="${index + 1}. fotó megjelenítése">
            <img src="${image}" alt="" loading="lazy">
          </button>
        `).join("")}
      </div>
    </div>

    <div class="detail-body">
      <p class="section-kicker">NORBI AZ INGATLANOS · INGATLANAJÁNLAT</p>
      <p class="detail-price">${formatPrice(property)}</p>
      <h2 class="detail-title">${property.title}</h2>
      <p class="detail-location">⌖ ${property.city} · ${property.type}</p>

      <div class="detail-stats">
        <div><strong>${property.area} m²</strong><span>Alapterület</span></div>
        <div><strong>${property.rooms}</strong><span>Szoba</span></div>
        <div><strong>${property.deal === "kiadó" ? "Kiadó" : "Eladó"}</strong><span>Ügylet típusa</span></div>
      </div>

      <h3 class="detail-heading">Az ingatlan bemutatása</h3>
      <p class="detail-description">${property.description}</p>

      <h3 class="detail-heading">Főbb jellemzők</h3>
      <ul class="detail-features">
        ${property.features.map(feature => `<li>${feature}</li>`).join("")}
      </ul>

      <div class="detail-contact">
        <h3>Érdekli ez az ingatlan?</h3>
        <p>Kérjen további információt, vagy egyeztessen megtekintést!</p>
        <a class="button button-gold full-button"
          href="tel:+36703646078">Telefonálok: +36 70 364 6078 <span>↗</span></a>
        <a class="button button-dark full-button detail-email"
          href="mailto:norbiazingatlanos@gmail.com?subject=${encodeURIComponent("Érdeklődés: " + property.title)}&body=${encodeURIComponent("Kedves Norbi!\\n\\nÉrdeklődöm az alábbi ingatlan iránt: " + property.title + "\\nElhelyezkedés: " + property.city + "\\nÁr: " + formatPrice(property) + "\\n\\nKérem, vegye fel velem a kapcsolatot.")}">
          Érdeklődés e-mailben <span>↗</span>
        </a>
      </div>
    </div>
  `;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();

  const mainImage = document.getElementById("detailMainImage");
  const counter = document.getElementById("galleryCounter");
  const thumbnails = detailContent.querySelectorAll(".detail-thumb");

  thumbnails.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.imageIndex);
      mainImage.src = property.images[index];
      mainImage.alt = property.title + " – " + (index + 1) + ". fotó";
      counter.textContent = `${index + 1} / ${property.images.length}`;

      thumbnails.forEach(thumb => thumb.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function closeDetails() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

closeButton.addEventListener("click", closeDetails);

modal.addEventListener("click", event => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeDetails();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) {
    closeDetails();
  }
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const deal = document.getElementById("filterDeal").value;
  const type = document.getElementById("filterType").value;
  const city = document.getElementById("filterCity").value
    .trim()
    .toLocaleLowerCase("hu-HU");
  const maxValue = document.getElementById("filterMax").value;
  const max = maxValue === "" ? Infinity : Number(maxValue);

  const filtered = properties.filter(property =>
    (deal === "all" || property.deal === deal) &&
    (type === "all" || property.type === type ||
      (type === "Családi ház" && property.type === "Ház")) &&
    (!city || property.city.toLocaleLowerCase("hu-HU").includes(city)) &&
    property.price <= max
  );

  render(filtered);
  document.getElementById("ingatlanok").scrollIntoView({ behavior: "smooth" });
});

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

render(properties);
