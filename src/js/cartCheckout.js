import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().then(() => {
    updateCartCount()
})

const checkout = new CheckoutProcess('so-cart', '#orderSummary')
checkout.init();

document.querySelector('#checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    checkout.calculateOrderTotal()
    checkout.checkout(e.target)
})