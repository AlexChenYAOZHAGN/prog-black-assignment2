import { addToCart } from "./cart.js";
import { renderHeader } from "./header.js";
import { addToWishList } from "./wishlist.js";
import {products} from "../../mockdata/products.js";

const PRODUCTS_PER_PAGE = 10;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    const productGridElement = document.querySelector(".product-grid");
    if (productGridElement) {
        productGridElement.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-to-cart")) {
                e.preventDefault();
                const productId = e.target.dataset.productId;
                addToCart(productId);
                renderHeader();
                showAddSuccess(productId);
            }
    // Add to Wishlist with Listening
            else if (e.target.classList.contains("add-to-wishlist")) {
                e.preventDefault();
                const productId = e.target.dataset.productId;
                addToWishList(productId);
                renderHeader();
                showAddWishlistSuccess(productId);
            }
    
        });
    }
});

export function renderProductGrid(products) {
    const productGridElement = document.querySelector(".product-grid");
    const paginationElement = document.querySelector(".pagination");
    if (!productGridElement || !paginationElement) return;

    // Calculate the products that should be displayed on the current page
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = products.slice(startIndex, endIndex);

    const productBlocksHtml = productsToShow.map(product => `
    <div class="product-block">
        <a href="product.html#${product.id}">
            <div class="product-image-row">
                <img class="product-image" src="${product.img}" alt="${product.name}">
                <p class="product-discount">${product.discount ? `${product.discount}% off` : ""}</p>
            </div>
            <div class="product-information">
                <div class="product-text">
                    <p class="product-name">${product.name}</p>
                    <div class="add-success hidden-element js-add-success-${product.id}">
                        <img class="check-icon" src="images/icons/check.png" alt="Added">
                        <p class="add-success-p">Added to the cart</p>
                    </div>
                    <!-- 添加到心愿列表 -->
                    <div class="add-success hidden-element js-add-wishlist-success-${product.id}">
                    <img class="check-icon" src="images/icons/check.png" alt="Added">
                    <p class="add-success-p">Added to whishlist</p>
                    </div>
                    <div class="product-price-row">
                        <div class="product-price">
                            <p class="discount-price">$${product.discountPrice}</p>
                            <p class="origin-price">${product.originPrice ? `￡${product.originPrice}` : ""}</p>
                        </div>
                        <img 
                            data-product-id="${product.id}" 
                            class="add-to-cart" 
                            src="images/icons/cart.png" 
                            alt="Add to Cart">
                        <!-- 每个商品 添加到心愿列表的实现 -->
                        <img 
                            data-product-id="${product.id}" 
                            class="add-to-wishlist" 
                            src="images/icons/wishlist.png" 
                            alt="Add to Wishlist">
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `).join('');

    productGridElement.innerHTML = productBlocksHtml;

    updatePaginationControls(products.length);

    // productGridElement.addEventListener("click", (e) => {
    //     console.log("element is clicked")
    //     if (e.target.classList.contains("add-to-cart")) {
    //         e.preventDefault();
    //         const productId = e.target.dataset.productId;
    //         addToCart(productId);
    //         renderHeader();
    //         showAddSuccess(productId);
    //     }
    // });
}

function showAddSuccess(productId) {
    const successElement = document.querySelector(`.js-add-success-${productId}`);
    if (successElement) {
        successElement.classList.remove("hidden-element");
        setTimeout(() => {
            successElement.classList.add("hidden-element");
        }, 1000);
    }
}

function showAddWishlistSuccess(productId) {
    const successElement = document.querySelector(`.js-add-wishlist-success-${productId}`);
    if (successElement) {
        successElement.classList.remove("hidden-element");
        setTimeout(() => {
            successElement.classList.add("hidden-element");
        }, 1000);
    }
}

function updatePaginationControls(totalProducts) {
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const paginationElement = document.querySelector(".pagination");

    paginationElement.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Previous</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next</button>
    `;
}

window.changePage = function(direction) {
    currentPage += direction;
    renderProductGrid(products);
};