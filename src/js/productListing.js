import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";

loadHeaderFooter().then(() => {
    updateCartCount()
})

const category = getParam('category')
console.log(category)

const dataSource = new ExternalServices();

const listElement = document.querySelector('.product-list')

const myList = new ProductList(category, dataSource, listElement)

myList.init()