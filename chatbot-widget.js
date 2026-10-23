
/* NORBI AZ INGATLANOS – érdeklődőgyűjtő chatbot */
(() => {
  "use strict";

  const EMAIL = "norbiazingatlanos@gmail.com";
  const ENDPOINT =
    "https://formsubmit.co/ajax/" + encodeURIComponent(EMAIL);

  // Ne hozzuk létre kétszer a chatbotot.
  if (document.getElementById("nc-launch")) return;

  const style = document.createElement("style");
  style.textContent = `
    #nc-launch {
      position:fixed;
      right:20px;
      bottom:20px;
      z-index:99999;
      border:0;
      border-radius:30px;
      padding:15px 20px;
      background:#b88d4b;
      color:#17130e;
      font-weight:bold;
      font-size:15px;
      cursor:pointer;
      box-shadow:0 5px 20px #0005;
    }

    #nc-panel {
      display:none;
      position:fixed;
      right:20px;
      bottom:82px;
      z-index:99999;
      width:min(380px,calc(100vw - 24px));
      height:min(640px,calc(100dvh - 110px));
      min-height:400px;
      background:#17191d;
      color:#f8f5ef;
      border:1px solid #b88d4b;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 10px 40px #0006;
      flex-direction:column;
      font-family:Arial,sans-serif;
    }

    #nc-panel.nc-open {
      display:flex;
    }

    .nc-head {
      padding:15px;
      background:#26242a;
      display:flex;
      align-items:center;
      gap:10px;
    }

    .nc-head strong {
      flex:1;
      font-size:15px;
    }

    #nc-close {
      background:none;
      border:0;
      color:white;
      font-size:26px;
      cursor:pointer;
    }

    #nc-messages {
      flex:1;
      overflow-y:auto;
      padding:13px;
      display:flex;
      flex-direction:column;
      gap:9px;
    }

    .nc-msg {
      max-width:88%;
      padding:10px 12px;
      border-radius:12px;
      font-size:14px;
      line-height:1.45;
      overflow-wrap:anywhere;
      white-space:pre-wrap;
    }

    .nc-bot {
      align-self:flex-start;
      background:#2c2d32;
      color:white;
    }

    .nc-user {
      align-self:flex-end;
      background:#b88d4b;
      color:#17130e;
    }

    #nc-controls {
      padding:12px;
      border-top:1px solid #ffffff22;
      display:flex;
      flex-direction:column;
      gap:9px;
      max-height:55%;
      overflow-y:auto;
    }

    .nc-options {
      display:flex;
      flex-wrap:wrap;
      gap:7px;
    }

    .nc-option {
      background:#202126;
      color:#f1d6a6;
      border:1px solid #b88d4b;
      border-radius:20px;
      padding:9px 12px;
      cursor:pointer;
    }

    #nc-controls label {
      font-size:12px;
      color:#ddd;
      display:flex;
      flex-direction:column;
      gap:4px;
    }

    #nc-controls input,
    #nc-controls select,
    #nc-controls textarea {
      box-sizing:border-box;
      width:100%;
      padding:10px;
      border:1px solid #555;
      border-radius:7px;
      background:#101115;
      color:white;
      font-size:14px;
    }

    #nc-controls textarea {
      min-height:55px;
    }

    .nc-submit {
      background:#b88d4b;
      color:#17130e;
      border:0;
      border-radius:8px;
      padding:12px;
      font-weight:bold;
      cursor:pointer;
    }

    .nc-submit:disabled {
      opacity:.6;
      cursor:wait;
    }

    .nc-consent {
      display:flex!important;
      flex-direction:row!important;
      align-items:flex-start;
      gap:8px;
    }

    .nc-consent input {
      width:auto!important;
      margin-top:3px;
    }

    .nc-status,
    .nc-small {
      font-size:11px;
      line-height:1.4;
      color:#e5c994;
    }

    .nc-small {
      color:#aaa;
      margin:0;
    }

    @media(max-width:480px) {
      #nc-launch {
        right:12px;
        bottom:12px;
      }

      #nc-panel {
        right:8px;
        bottom:70px;
        width:calc(100vw - 16px);
        height:calc(100dvh - 90px);
        min-height:300px;
      }
    }
  `;

  document.head.appendChild(style);

  // Chatbot megnyitógombja.
  const launcher = document.createElement("button");
  launcher.id = "nc-launch";
  launcher.type = "button";
  launcher.textContent = "💬 Segíthetek?";
  launcher.setAttribute("aria-expanded", "false");

  // Chatablak.
  const panel = document.createElement("section");
  panel.id = "nc-panel";
  panel.setAttribute("aria-label", "Norbi ingatlanos chatbot");

  panel.innerHTML = `
    <div class="nc-head">
      <strong>⌂ Norbi ingatlanasszisztense</strong>
      <button id="nc-close" type="button"
        aria-label="Bezárás">×</button>
    </div>
    <div id="nc-messages" aria-live="polite"></div>
    <div id="nc-controls"></div>
  `;

  document.body.append(launcher, panel);

  const messages = panel.querySelector("#nc-messages");
  const controls = panel.querySelector("#nc-controls");
  const lead = {};

  let started = false;
  let sent = false;

  function say(text, who = "bot") {
    const div = document.createElement("div");
    div.className = "nc-msg nc-" + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function clearControls() {
    controls.replaceChildren();
  }

  function showOptions(items, callback) {
    clearControls();

    const box = document.createElement("div");
    box.className = "nc-options";

    items.forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nc-option";
      button.textContent = item;

      button.addEventListener("click", () => {
        if (sent) return;
        say(item, "user");
        callback(item);
      });

      box.appendChild(button);
    });

    controls.appendChild(box);
  }

  function makeForm(html) {
    clearControls();

    const form = document.createElement("form");
    form.innerHTML = html;
    controls.appendChild(form);

    const firstInput = form.querySelector("input");
    if (firstInput) firstInput.focus();

    return form;
  }

  function start() {
    if (started) return;

    started = true;

    say("Szia! 👋 Norbi ingatlanasszisztense vagyok.");
    say("Miben segíthetek?");

    showOptions([
      "Ingatlant keresek",
      "Eladnám / kiadnám az ingatlanomat"
    ], answer => {
      lead.erdeklodes = answer;
      askType();
    });
  }

  function askType() {
    say("Milyen ingatlan érdekel?");

    showOptions([
      "Lakás",
      "Családi ház",
      "Telek",
      "Garázs",
      "Más / még nem tudom"
    ], answer => {
      lead.tipus = answer;
      askLocation();
    });
  }

  function askLocation() {
    say("Melyik településen vagy környéken?");

    const form = makeForm(`
      <label>Település vagy környék
        <input name="helyszin" maxlength="120"
          required placeholder="Pl. Vecsés, Gyál">
      </label>
      <button class="nc-submit" type="submit">Tovább</button>
    `);

    form.addEventListener("submit", event => {
      event.preventDefault();

      const value = form.querySelector(
        '[name="helyszin"]'
      ).value.trim();

      if (!value) return;

      lead.helyszin = value;
      say(value, "user");
      askBudget();
    });
  }

  function askBudget() {
    say("Mekkora a tervezett keret vagy havi bérleti díj?");

    const form = makeForm(`
      <label>Tervezett keret
        <input name="keret" maxlength="120"
          placeholder="Pl. 45 millió Ft">
      </label>
      <button class="nc-submit" type="submit">Tovább</button>
      <button class="nc-option" type="button" id="nc-skip">
        Kihagyom
      </button>
    `);

    function next(skip = false) {
      lead.keret = skip
        ? "Nincs megadva"
        : (
          form.querySelector('[name="keret"]').value.trim()
          || "Nincs megadva"
        );

      say(lead.keret, "user");
      askContact();
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      next();
    });

    form.querySelector("#nc-skip").addEventListener(
      "click",
      () => next(true)
    );
  }

  function askContact() {
    say(
      "Köszönöm! Add meg az elérhetőségeidet, " +
      "hogy Norbi felvehesse veled a kapcsolatot."
    );

    const form = makeForm(`
      <label>Név
        <input name="nev" autocomplete="name"
          maxlength="120" required>
      </label>

      <label>Telefonszám
        <input name="telefon" type="tel"
          autocomplete="tel" maxlength="40"
          required placeholder="+36 ...">
      </label>

      <label>E-mail-cím (nem kötelező)
        <input name="email" type="email"
          autocomplete="email" maxlength="160">
      </label>

      <label>Hogyan keressen?
        <select name="kapcsolat">
          <option>Telefonon</option>
          <option>E-mailben</option>
          <option>Mindegyik megfelelő</option>
        </select>
      </label>

      <label>Üzenet (nem kötelező)
        <textarea name="uzenet" maxlength="1000"></textarea>
      </label>

      <label class="nc-consent">
        <input name="consent" type="checkbox" required>
        <span>
          Hozzájárulok az adataim kezeléséhez a megkeresésem
          megválaszolása céljából.
        </span>
      </label>

      <button class="nc-submit" type="submit">
        Érdeklődés elküldése
      </button>

      <p class="nc-small">
        Az adatkezelési tájékoztató linkjét közzététel előtt add hozzá.
      </p>

      <div class="nc-status" role="status"></div>
    `);

    form.addEventListener("submit", submitLead);
  }

  async function submitLead(event) {
    event.preventDefault();

    if (sent) return;

    const form = event.currentTarget;
    const status = form.querySelector(".nc-status");
    const button = form.querySelector(".nc-submit");

    const value = name => {
      const field = form.querySelector(`[name="${name}"]`);
      return field ? field.value.trim() : "";
    };

    if (
      !value("nev") ||
      !value("telefon") ||
      !form.elements.consent.checked
    ) {
      status.textContent =
        "Add meg a nevedet és telefonszámodat, " +
        "és fogadd el a hozzájárulást.";
      return;
    }

    if (
      form.elements.kapcsolat.value === "E-mailben" &&
      !value("email")
    ) {
      status.textContent =
        "E-mailes kapcsolathoz add meg az e-mail-címedet.";
      return;
    }

    const payload = {
      _subject: "Új érdeklődő – NORBI AZ INGATLANOS",
      _template: "table",
      "Érdeklődés": lead.erdeklodes || "",
      "Ingatlan típusa": lead.tipus || "",
      "Helyszín": lead.helyszin || "",
      "Keret": lead.keret || "Nincs megadva",
      "Név": value("nev"),
      "Telefonszám": value("telefon"),
      "E-mail": value("email") || "Nincs megadva",
      "Kapcsolat módja": form.elements.kapcsolat.value,
      "Üzenet": value("uzenet") || "Nincs külön üzenet"
    };

    button.disabled = true;
    button.textContent = "Küldés…";
    status.textContent = "Küldés folyamatban…";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error("A küldés nem sikerült");
      }

      sent = true;

      say(
        "Köszönöm! Az érdeklődés továbbítását elindítottuk. " +
        "Norbi a megadott elérhetőségen kereshet."
      );

      clearControls();

      const again = document.createElement("button");
      again.type = "button";
      again.className = "nc-submit";
      again.textContent = "Új érdeklődés";

      again.addEventListener("click", () => {
        messages.replaceChildren();

        Object.keys(lead).forEach(key => {
          delete lead[key];
        });

        started = false;
        sent = false;
        start();
      });

      controls.appendChild(again);

    } catch (error) {
      status.textContent =
        "Nem sikerült elküldeni az érdeklődést. " +
        "Próbáld újra, vagy írj közvetlenül ide: " + EMAIL;

      button.disabled = false;
      button.textContent = "Újrapróbálom";
    }
  }

  // Chatablak megnyitása és bezárása.
  launcher.addEventListener("click", () => {
    const open = !panel.classList.contains("nc-open");

    panel.classList.toggle("nc-open", open);
    launcher.setAttribute("aria-expanded", String(open));

    if (open) start();
  });

  panel.querySelector("#nc-close").addEventListener("click", () => {
    panel.classList.remove("nc-open");
    launcher.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      panel.classList.remove("nc-open");
      launcher.setAttribute("aria-expanded", "false");
    }
  });
})();
