import {cart, addToCart, getCartNum} from "../components/cart.js";
import {products} from "../../mockdata/products.js";
import { renderHeader } from "../components/header.js";
import { renderProductGrid } from "../components/productGrid.js";

renderHeader();
renderProductGrid(products);