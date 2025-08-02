import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount()
})

const checkoutButton = document.querySelector('#check-button')
const totalContainer = document.querySelector('#total')
const showTotal = document.querySelector('#totalInCart')


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
  
}

//if there are products in the cart the checkout button and total in cart will show up
// if there aren't products in the cart the page won't show a checkout button and the total in cart either
if(localStorage.getItem("so-cart")){
  checkoutButton.classList.add('visible')
  totalContainer.classList.add('visible')
}

//Take a look to the localStorage and if there are elements multiply
//prices times quantities and then add it
const items = getLocalStorage('so-cart')
console.log(items)
const itemsTotal = items.reduce((acc, item) => {
  return acc + item.ListPrice * item.Quantity;
}, 0)

showTotal.textContent = `$${itemsTotal.toFixed(2)}`;

renderCartContents();
