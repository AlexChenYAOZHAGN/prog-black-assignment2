import { getProduct } from "../../mockdata/products.js";
import { renderHeader } from "../components/header.js";
import { addToCart } from "../components/cart.js";

function initPage() {
    renderHeader();
    const productId = location.hash.substring(1);
    const product = getProduct(productId);
    if (product) {
        renderProductDetails(product);
        setupEventListeners(productId);
    } else {
        console.error("Product not found");
    }
}

function renderProductDetails(product) {
    const productInfoContainer = document.querySelector(".js-product-info");
    if (!productInfoContainer) return;

    const html = `
        <div class="product-block">
            <img class="product-image" src="${product.img}" alt="${product.name}" />
            <div class="product-information">
                <h1 class="product-name">${product.name}</h1>
                <div class="product-rating">
                    <p class="rating-count">${product.stars}</p>
                    <img class="rating-stars" src="images/ratings/rating_${Math.round(product.stars / 0.5) * 5}.png" alt="Rating Stars">
                    <p class="comment-num">${product.commentNum} comments</p>
                </div>
                <div class="sell-information">
                    ${product.discount ? `<p class="product-discount">${product.discount}% off</p>` : ""}
                    <p class="sell-num">sold ${product.sellNum}</p>
                </div>
                <div class="product-price">
                    ${product.originPrice ? `<p class="origin-price">$${product.originPrice}</p>` : ""}
                    <p class="discount-price">$${product.discountPrice}</p>
                </div>
                <div class="buy-num-row">
                    <p class="num-p">amount</p>
                    <select class="buy-num">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}</select>
                </div>
                <button class="add-to-cart">add it to the cart</button>
                <div class="add-success hidden-element">
                    <img class="check-icon" src="images/icons/check.png" alt="Checked">
                    <p class="add-success-p">Added to the cart</p>
                </div>
            </div>
        </div>
        <div class="description-block">
            <p class="description-p">product description</p>
            <p class="product-description">${product.description}</p>
        </div>
    `;

    productInfoContainer.innerHTML = html;
}

function setupEventListeners(productId) {
    const addToCartButton = document.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
        const buyNum = Number(document.querySelector(".buy-num").value);
        addToCart(productId, buyNum);
        renderHeader();
        showAddSuccess();
    });
}

function showAddSuccess() {
    const successElement = document.querySelector(".add-success");
    successElement.classList.remove("hidden-element");
    setTimeout(() => {
        successElement.classList.add("hidden-element");
    }, 1000);
}

initPage();
