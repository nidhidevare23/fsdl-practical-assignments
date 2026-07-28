const CART_KEY = "cartItems";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert("Added to cart");
}

// Attach event listener
document.addEventListener("click", e => {
  if (!e.target.classList.contains("add-to-cart-btn")) return;

  const productEl = e.target.closest(".product-card");

  const product = {
    id: productEl.dataset.id,
    name: productEl.dataset.name,
    price: Number(productEl.dataset.price),
    image: productEl.dataset.image
  };

  addToCart(product);
});
