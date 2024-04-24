import { searchProduct } from "../../mockdata/products.js";
import { renderProductGrid } from "../components/productGrid.js";
import { renderHeader } from "../components/header.js";

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();

    if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const products = searchProduct(
            params.get("input"),
            parseFloat(params.get("minPrice") || 0),
            parseFloat(params.get("maxPrice") || 1000000) 
        );
        console.log(products);
        renderProductGrid(products);
    } else {
        console.log("No search parameters found.");
    }
});
