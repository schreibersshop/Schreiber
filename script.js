const produkte = [
  {
    name: "Herz-Stempel",
    preis: 5.99,
    kategorie: "herz",
    bild: "https://via.placeholder.com/200x200?text=Herz-Stempel", // Beispielbild
    beschreibung:
      "Ein wunderschöner Stempel in Herzform, perfekt geeignet für handgemachte Seifen. Dieser Stempel bringt ein liebevolles Design auf deine Seifenstücke. Ideal für Geschenke, kreative Projekte oder zum Verkauf handgemachter Produkte. Die robuste Bauweise garantiert viele Anwendungen. Einfach in der Handhabung und leicht zu reinigen.",
    material: "Acryl",
    groesse: "4 cm x 4 cm",
    herkunft: "Handgefertigt in Deutschland",
  },
  {
    name: "Blumen-Stempel",
    preis: 6.49,
    kategorie: "blume",
    bild: "https://via.placeholder.com/200x200?text=Blumen-Stempel", // Beispielbild
    beschreibung:
      "Ein florales Muster für deine Seifen! Mit diesem Stempel kannst du deinen Seifen einen frischen Frühlingslook verleihen. Die filigrane Struktur sorgt für ein schönes Ergebnis und ist ideal für Naturseifen oder selbstgemachte Geschenke mit Stil.",
    material: "Holz & Gummi",
    groesse: "5 cm x 5 cm",
    herkunft: "Regional gefertigt",
  },
  {
  name: "Herz-Stempel",
    preis: 5.99,
    kategorie: "herz",
    bild: "https://via.placeholder.com/200x200?text=Herz-Stempel", // Beispielbild
    beschreibung:
      "Ein wunderschöner Stempel in Herzform, perfekt geeignet für handgemachte Seifen. Dieser Stempel bringt ein liebevolles Design auf deine Seifenstücke. Ideal für Geschenke, kreative Projekte oder zum Verkauf handgemachter Produkte. Die robuste Bauweise garantiert viele Anwendungen. Einfach in der Handhabung und leicht zu reinigen.",
    material: "Acryl",
    groesse: "4 cm x 4 cm",
    herkunft: "Handgefertigt in Deutschland",
  },
  {
  name: "Herz-Stempel",
    preis: 5.99,
    kategorie: "herz",
    bild: "https://via.placeholder.com/200x200?text=Herz-Stempel", // Beispielbild
    beschreibung:
      "Ein wunderschöner Stempel in Herzform, perfekt geeignet für handgemachte Seifen. Dieser Stempel bringt ein liebevolles Design auf deine Seifenstücke. Ideal für Geschenke, kreative Projekte oder zum Verkauf handgemachter Produkte. Die robuste Bauweise garantiert viele Anwendungen. Einfach in der Handhabung und leicht zu reinigen.",
    material: "Acryl",
    groesse: "4 cm x 4 cm",
    herkunft: "Handgefertigt in Deutschland",
  },
];

let warenkorb = [];

function zeigeProdukte(kategorie = "alle") {
  const container = document.getElementById("produktContainer");
  container.innerHTML = "";

  produkte.forEach((produkt) => {
    if (kategorie === "alle" || produkt.kategorie === kategorie) {
      const produktEl = erstelleProduktElement(produkt);
      container.appendChild(produktEl);
    }
  });
}

function erstelleProduktElement(produkt) {
  const produktEl = document.createElement("div");
  produktEl.classList.add("produkt");

  const bild = document.createElement("img");
  bild.src = produkt.bild || "";
  bild.alt = produkt.name;

  const titel = document.createElement("h2");
  titel.textContent = produkt.name;

  const preis = document.createElement("p");
  preis.textContent = produkt.preis.toFixed(2) + " €";

  const beschreibung = document.createElement("p");
  const beschrText = produkt.beschreibung.split(" ");
  if (beschrText.length > 20) {
    const kurz = beschrText.slice(0, 20).join(" ") + "... ";
    beschreibung.textContent = kurz + " ";

    const detailsLink = document.createElement("span");
    detailsLink.textContent = "Details";
    detailsLink.className = "details-link";
    detailsLink.onclick = function () {
      beschreibung.innerHTML = `
        <strong>Beschreibung:</strong> ${produkt.beschreibung}<br>
        <strong>Material:</strong> ${produkt.material}<br>
        <strong>Größe:</strong> ${produkt.groesse}<br>
        <strong>Herkunft:</strong> ${produkt.herkunft}
      `;
    };

    beschreibung.appendChild(detailsLink);
  } else {
    beschreibung.textContent = produkt.beschreibung;
  }

  const button = document.createElement("button");
  button.classList.add("button");
  button.innerHTML = `<i class="fa fa-cart-plus"></i> In den Warenkorb`; // Warenkorb-Icon
  button.onclick = () => addToCart(produkt);

  produktEl.appendChild(bild);
  produktEl.appendChild(titel);
  produktEl.appendChild(preis);
  produktEl.appendChild(beschreibung);
  produktEl.appendChild(button);

  return produktEl;
}

function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("show");
}

function filterProdukte(kategorie) {
  zeigeProdukte(kategorie);
  document.getElementById("suchfeld").value = ""; // Suche zurücksetzen
}

function addToCart(produkt) {
  warenkorb.push(produkt);
  renderCart();
  animateCartButton();
}

function renderCart() {
  const liste = document.getElementById("warenkorbListe");
  liste.innerHTML = "";
  let gesamt = 0;

  warenkorb.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.preis.toFixed(2)} €`;
    liste.appendChild(li);
    gesamt += item.preis;
  });

  document.getElementById("gesamtpreis").textContent =
    "Gesamt: " + gesamt.toFixed(2) + " €";
}

function animateCartButton() {
  const cartIcon = document.querySelector(".warenkorb");
  cartIcon.classList.add("animate");
  setTimeout(() => {
    cartIcon.classList.remove("animate");
  }, 1000); // Animation für 1 Sekunde
}

function sucheProdukte() {
  const eingabe = document.getElementById("suchfeld").value.toLowerCase();
  const container = document.getElementById("produktContainer");
  container.innerHTML = "";

  produkte.forEach((produkt) => {
    const name = produkt.name.toLowerCase();
    const beschreibung = produkt.beschreibung.toLowerCase();
    const material = produkt.material.toLowerCase();
    const herkunft = produkt.herkunft.toLowerCase();

    if (
      name.includes(eingabe) ||
      beschreibung.includes(eingabe) ||
      material.includes(eingabe) ||
      herkunft.includes(eingabe)
    ) {
      const produktEl = erstelleProduktElement(produkt);
      container.appendChild(produktEl);
    }
  });
}

zeigeProdukte();
// Zustand für erweiterten Warenkorb
let warenkorbOffen = false;

document.querySelector(".warenkorb h2").addEventListener("click", () => {
  const warenkorbBox = document.querySelector(".warenkorb");
  warenkorbOffen = !warenkorbOffen;
  warenkorbBox.classList.toggle("offen", warenkorbOffen);

  if (warenkorbOffen) {
    zeigeCheckoutButton();
  } else {
    entferneCheckoutButton();
  }
});

function zeigeCheckoutButton() {
  let button = document.createElement("button");
  button.id = "checkoutButton";
  button.textContent = "Zur Kasse";
  button.className = "button";
  button.style.marginTop = "1rem";
  button.onclick = zeigeZahlungsoptionen;

  document.querySelector(".warenkorb").appendChild(button);
}

function entferneCheckoutButton() {
  const btn = document.getElementById("checkoutButton");
  const auswahl = document.getElementById("zahlungsoptionen");
  if (btn) btn.remove();
  if (auswahl) auswahl.remove();
}

function zeigeZahlungsoptionen() {
  const auswahl = document.createElement("div");
  auswahl.id = "zahlungsoptionen";
  auswahl.innerHTML = `
    <h3>Zahlungsart wählen:</h3>
    <label><input type="radio" name="zahlung" value="paypal" /> PayPal</label><br/>
    <label><input type="radio" name="zahlung" value="karte" /> Kreditkarte</label><br/>
    <label><input type="radio" name="zahlung" value="bank" /> Überweisung</label><br/>
    <button class="button" style="margin-top: 0.8rem;">Jetzt bezahlen</button>
  `;
  document.querySelector(".warenkorb").appendChild(auswahl);
}
