let inventory = [];
let total = 0;

function addProduct() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let qty = parseInt(document.getElementById("qty").value);

  if (!name || price <= 0 || qty <= 0) return;

  inventory.push({ name, price, qty });
  render();
}

function render() {
  let container = document.getElementById("inventory");
  container.innerHTML = "";

  inventory.forEach((item, i) => {
    let card = document.createElement("div");
    card.className = "card";

    if (item.qty < 3) card.classList.add("low");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <p>Stock: ${item.qty}</p>
      <button class="sellBtn" onclick="sell(${i}, event)">Sell</button>
    `;

    container.appendChild(card);
  });
}

function sell(i, e) {
  let item = inventory[i];

  if (item.qty <= 0) return;

  item.qty--;
  total += item.price;

  document.getElementById("total").innerText = animateValue(total);

  createRipple(e);
  render();
}

function animateValue(value) {
  let display = document.getElementById("total");
  let start = parseInt(display.innerText) || 0;
  let end = value;
  let duration = 300;

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let percent = Math.min(progress / duration, 1);

    display.innerText = Math.floor(start + (end - start) * percent);

    if (percent < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function createRipple(e) {
  let btn = e.target;
  let circle = document.createElement("span");

  circle.classList.add("ripple");
  circle.style.left = e.offsetX + "px";
  circle.style.top = e.offsetY + "px";

  btn.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
}