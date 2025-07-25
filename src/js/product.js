import { getLocalStorage, getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

const dataSource = new ProductData("tents");
const productId = getParam("product")

const product = new ProductDetails(productId, dataSource);
product.init();



// function addProductToCart(product) {
//   const currentCart = getLocalStorage("so-cart");
//   currentCart.push(product);
//   setLocalStorage("so-cart", currentCart);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
