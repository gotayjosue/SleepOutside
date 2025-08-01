import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().then(() => {
    updateCartCount()
})

const checkout = new CheckoutProcess('so-cart', '#orderSummary')
checkout.init();

document.querySelector('#checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target

    const isValid = form.checkValidity()
    form.reportValidity()

    if (isValid){
        checkout.calculateOrderTotal()
        checkout.checkout(form)
    }
    
})