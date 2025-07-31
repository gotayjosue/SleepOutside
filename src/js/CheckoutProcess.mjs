import { getLocalStorage } from "./utils.mjs";
import { formDataToJSON } from "./utils.mjs";

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
        this.calculateItemSubtotal();
        this.calculateOrderTotal()
    }

    calculateItemSubtotal() {
        this.itemTotal = this.list.reduce((acc, item) => {
            return acc + item.ListPrice * item.Quantity;
        }, 0)

    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        
        const totalItems = this.list.reduce((acc, item) => acc + item.Quantity, 0)

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
        if (subtotal) subtotal.innerText = `$${this.itemTotal.toFixed(2)}`
        if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`
    }

    packageItems(items){
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.ListPrice,
            quantity: item.Quantity
        }))
    }

    async checkout(form) {
        const formData = new FormData(form)
        const order = formDataToJSON(formData)

        order.orderDate = new Date().toISOString()
        order.items = this.packageItems(this.list)
        order.orderTotal = this.orderTotal.toFixed(2)
        order.tax = this.tax.toFixed(2)
        order.shipping = this.shipping

        const url = "https://wdd330-backend.onrender.com/checkout"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }

        try {
            const response = await fetch(url, options)
            const result = await response.json()
            console.log("Order sent!", result)
        } catch (err) {
            console.error("Checkout failed:", err)
        }
    }
}