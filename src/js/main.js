import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";


new ProductList()

loadHeaderFooter().then(() => {
    updateCartCount()
})