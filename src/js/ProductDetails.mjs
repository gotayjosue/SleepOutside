import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
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
  }



  renderProductDetails() {
  const productHtml = `
    <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryMedium}"
      alt="${this.product.Name}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div>
  `;

  const li = document.querySelector('.product-detail');
  li.innerHTML = productHtml;


}
}

  export function cartQuantity(quantity = 1){
    return quantity
  }