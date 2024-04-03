import { searchProduct } from "../../mockdata/products.js";
import { renderProductGrid } from "../components/productGrid.js";
import { renderHeader } from "../components/header.js";

renderHeader();

const params = new URLSearchParams(location.search);
const products = searchProduct(
    params.get("input"),
    parseFloat(params.get("minPrice") || 0),
    parseFloat(params.get("maxPrice") || Number.MAX_SAFE_INTEGER)
);
console.log(products)
renderProductGrid(products);