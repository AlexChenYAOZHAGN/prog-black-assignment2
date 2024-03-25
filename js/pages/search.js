import { searchProduct } from "../../mockdata/products.js";
import { renderProductGrid } from "../components/productGrid.js";
import { renderHeader } from "../components/header.js";

renderHeader();

const params = new URLSearchParams(location.search);
const products = searchProduct(params.get("input"));
console.log(products)
renderProductGrid(products);