import { renderListWithTemplate } from "./utils.mjs"

function productCardTemplate(product){
    console.log(product)
    return`
    <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h2 class="card__brand">${product.Brand?.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>   
    `
}



export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init(){
        const products = await this.dataSource.getData(this.category)
        console.log(products)
        this.renderList(products)
        document.querySelector(".title").textContent = this.category;
    }

    renderList(products){
        renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true)
    }
}