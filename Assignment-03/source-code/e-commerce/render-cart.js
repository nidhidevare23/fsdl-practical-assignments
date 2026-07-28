const cartItemsDiv = document.getElementById("cart-items");
const emptyMsg = document.getElementById("empty-msg");
const summarySection = document.getElementById("summary-section");
const actionsSection = document.getElementById("actions-section");

function calculateTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function updateTotal() {
  const total = calculateTotal();
  document.getElementById("total-amount").textContent = `₹${total}`;
  document.getElementById("subtotal").textContent = `₹${total}`;
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function updateQuantity(id, qty) {
  if (qty < 1) {
    removeItem(id);
    return;
  }
  let cart = getCart();
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty = qty;
    saveCart(cart);
    renderCart();
  }
}

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    cartItemsDiv.innerHTML = "";
    summarySection.style.display = "none";
    actionsSection.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  summarySection.style.display = "block";
  actionsSection.style.display = "flex";

  cartItemsDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="cart-item-price">₹${item.price}</p>
        </div>
        <div class="cart-item-controls">
            <input type="number" class="qty-input" value="${item.qty}" min="1" 
                   onchange="updateQuantity('${item.id}', this.value)">
            <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        </div>
    </div>
  `).join("");

  updateTotal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      saveCart([]);
      renderCart();
    }
  });

  document.getElementById("checkout-btn")?.addEventListener("click", () => {
    alert("Proceeding to checkout...");
  });
});

