const products = {
  1: { name: "Golden Whisper", price: 4500, img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
  2: { name: "Pearl Bloom", price: 6200, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" }
};

function addToCart() {
  const id = new URLSearchParams(window.location.search).get("id");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products[id]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

if (document.getElementById("cart-items")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  document.getElementById("cart-items").innerHTML = cart.map(item => {
    total += item.price;
    return `<p>${item.name} – ₹${item.price}</p>`;
  }).join("");
  localStorage.setItem("total", total);
}

if (document.getElementById("total")) {
  document.getElementById("total").innerText = localStorage.getItem("total");
                                                                    }
// ===== Add to cart functionality =====
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = btn.getAttribute("data-price");

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add product to cart
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
  });
});
// ===== ADD TO CART (safe add-on) =====
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = this.dataset.price;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(name + " added to cart!");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function () {
      const item = {
        name: this.dataset.name,
        price: Number(this.dataset.price),
        image: this.dataset.image
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(item.name + " added to bag");
    });
  });
});
