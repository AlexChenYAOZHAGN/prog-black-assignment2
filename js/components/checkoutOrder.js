import { cart, deleteFromCart, updateCart } from "./cart.js";
import { getProduct } from "../../mockdata/products.js";
import { deliveryOptions } from "../../mockdata/deliveryOptions.js";
import { renderCheckoutPrice } from "./checkoutPrice.js";
import { renderHeader } from "./header.js";

export function renderCheckoutOrder() {
    const generateDeliveryOptions = (productId, deliveryId) =>
        deliveryOptions.map((option) => `
            <div class="delivery-option">
                <input 
                    ${option.id === deliveryId ? "checked" : ""}
                    type="radio" 
                    class="delivery-option-input" 
                    name="delivery-option-${productId}"
                    data-product-id="${productId}"
                    data-delivery-id="${option.id}">
                <p class="delivery-option-name">${option.name}</p>
                <p class="delivery-option-price">$${option.price}</p>
            </div>
        `).join('');

    const productRowsHtml = cart.map((item) => {
        console.log(item.id)
        const product = getProduct(item.id);
        return `
            <div class="product-row js-product-row-${product.id}">
                <img class="product-image" src="${product.img}" />
                <div class="product-information">
                    <p class="product-name">${product.name}</p>
                    <div class="product-detail">
                        <div class="product-detail-left">
                            <div class="product-price">
                                ${product.originPrice ? `<p class="origin-price">$${product.originPrice}</p>` : ""}
                                <p class="discount-price">$${product.discountPrice}</p>
                            </div>
                            <div class="buy-num-row">
                                <p class="num-p">amount</p>
                                <input 
                                    class="buy-num" 
                                    value="${item.num}"
                                    data-product-id="${product.id}">
                            </div>
                        </div>
                        <div class="product-detail-right">
                            <button data-product-id="${product.id}" class="delete-from-cart">delete</button>
                        </div>
                    </div>
                    <hr class="product-information-hr">
                    <div class="delivery-options">
                        <p class="delivery-option-p">delivery method</p>
                        ${generateDeliveryOptions(product.id, item.deliveryId)}
                    </div>             
                </div>
            </div>
        `;
    }).join('');

    document.querySelector(".checkout-left").innerHTML = productRowsHtml;

    setupEventListeners();
}

function setupEventListeners() {
    document.querySelectorAll(".delete-from-cart").forEach(button => {
        button.addEventListener("click", function() {
            const productId = this.dataset.productId;
            deleteFromCart(productId);
            document.querySelector(`.js-product-row-${productId}`).remove();
            renderCheckoutPrice();
            renderHeader();
        });
    });

    document.querySelectorAll(".delivery-option-input").forEach(input => {
        input.addEventListener("click", function() {
            const { productId, deliveryId } = this.dataset;
            updateCart(productId, deliveryId, false);
            renderCheckoutPrice();
        });
    });

    document.querySelectorAll(".buy-num").forEach(input => {
        input.addEventListener("change", function() {
            const productId = this.dataset.productId;
            const buyNum = Number(this.value);
            updateCart(productId, false, buyNum);
            renderCheckoutPrice();
            renderHeader();
        });
    });
}
