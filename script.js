// =======================
// CART SYSTEM (FULL)
// =======================

// ---------- ADD TO CART ----------
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const item = {
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        qty: 1
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(p => p.name === item.name);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(item.name + " added to bag");
    });
  });
});


// ---------- CART PAGE ----------
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsBox = document.getElementById("cart-items");
  const priceBox = document.getElementById("price-box");

  if (!itemsBox || !priceBox) return;

  let subtotal = 0;

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>Your bag is empty.</p>";
    priceBox.innerHTML = "";
    return;
  }

  itemsBox.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.qty}</p>
          <p><strong>₹${itemTotal}</strong></p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  const tax = Math.round(subtotal * 0.05);
  const delivery = 99;
  const total = subtotal + tax + delivery;

  priceBox.innerHTML = `
    <p>Subtotal: ₹${subtotal}</p>
    <p>Tax (5%): ₹${tax}</p>
    <p>Delivery: ₹${delivery}</p>
    <h3>Total: ₹${total}</h3>
  `;
}


// ---------- REMOVE ITEM ----------
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


// ---------- CHECKOUT ----------
function placeOrder() {
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}


// ---------- AUTO LOAD CART ----------
document.addEventListener("DOMContentLoaded", loadCart);
