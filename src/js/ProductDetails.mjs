import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product)
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
      const currentCart = getLocalStorage("so-cart") || [];
      const exists = currentCart.find(p => p.Id === this.product.Id)

      //If the product is already in the cart, it will add "1" to the quantity
      if (exists){
        exists.Quantity = (exists.Quantity || 1) + 1
      } else{
        this.product.Quantity = 1
        currentCart.push(this.product);
      }
      setLocalStorage("so-cart", currentCart);
      updateCartCount() 
      //The function to update the number of products in the cart
      //is here to see the change on real time from anywhere in the page
      //when the user adds a product
  }



  renderProductDetails() {
    const product = this.product;
    const productHtml = `
    <h3>${product.Brand.Name || "Without brand"}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || "No color"}</p>
    <p class="product__description">${product.DescriptionHtmlSimple || "No description"}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;

  const li = document.querySelector('.product-detail');
  li.innerHTML = productHtml;
}

}

  export function cartQuantity(quantity = 1){
    return quantity
  }