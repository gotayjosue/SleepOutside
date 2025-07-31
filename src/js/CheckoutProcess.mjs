import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess{
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key)
        this.calculateItemSummary();
    }

    calculateItemSubtotal() {
        this.itemTotal = this.list.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0)

    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        
        const totalItems = this.list.reduce((acc, item) => acc + item.quantity, 0)

        //Calculate shipping
        if (totalItems > 0){
            this.shipping = 10 + (totalItems - 1) * 2;
        } else{
            this.shipping = 0;
        }

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        //Display results
        this.displayOrderTotals();
    }

    displayOrderTotals(){
        const tax = document.querySelector(`${this.outputSelector} #taxes`)
        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`)
        const orderTotal  = document.querySelector(`${this.outputSelector} #order-total`)

        if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
        if (subtotal) subtotal.innerText = `$${this.subtotal.toFixed(2)}`
        if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`
    }
}