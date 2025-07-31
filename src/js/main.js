import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";


new ProductList()

loadHeaderFooter().then(() => {
    updateCartCount()
})