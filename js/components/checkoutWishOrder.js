import { addToCart } from "./cart.js";
import { wishlist, deleteFromWishlist } from "./wishlist.js";
import { getProduct } from "../../mockdata/products.js";
import { renderHeader } from "./header.js";

export function renderCheckoutOrder() {
    // 从本地存储获取心愿列表
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    // 将心愿列表转换为HTML字符串
    const wishesHtml = wishes.map(wish => `
        <li>${wish.text} - ${wish.time}</li>
    `).join('');

    // 生成产品列表的HTML字符串
    const productRowsHtml = wishlist.map((item) => {
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
                        </div>
                        <div class="product-detail-right">
                            <button data-product-id="${product.id}" class="delete-from-wishlist">Remove</button>
                            <!-- 添加到购物车的按钮 --> 
                            <button data-product-id="${product.id}" class="add-to-cart-from-wishlist">Add to Cart</button>
                            <div class="add-success hidden-element js-add-success-${product.id}">
                                <img class="check-icon" src="images/icons/check.png" alt="Added">
                                <p class="add-success-p">Added to the cart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('') + 
    `
    <div class="wishlist-board">
        <h2>wishing list</h2>
        <textarea class="wishlist-input" placeholder="Enter your wish..."></textarea>
        <button class="save-wishlist-btn">save</button>
        <div class="wishlist-messages">
        <h2>my wish list</h2>
        <ul class="wishlist-messages-list">${wishesHtml}</ul>
    </div>
    </div>
    `;

    document.querySelector(".checkout-left").innerHTML = productRowsHtml;
    setupEventListeners();
}

// 配置事件监听器
function setupEventListeners() {
    
    document.querySelectorAll(".delete-from-wishlist").forEach(button => {
        button.addEventListener("click", function() {
            const productId = this.dataset.productId;
            deleteFromWishlist(productId);
            document.querySelector(`.js-product-row-${productId}`).remove();
            renderHeader();
        });
    });

    document.querySelectorAll(".add-to-cart-from-wishlist").forEach(button => {
        button.addEventListener("click", function() {
            const productId = this.dataset.productId;
            addToCart(productId);
            renderHeader();
            showAddSuccess(productId);
        });
    });

    // 处理心愿板保存按钮的点击事件，增加添加时间
    document.querySelector(".save-wishlist-btn").addEventListener("click", function() {
        const wishlistText = document.querySelector(".wishlist-input").value.trim();
        if (wishlistText) {
            const now = new Date();
            const wish = {
                text: wishlistText,
                time: now.toLocaleString()
            };
            const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
            wishes.push(wish);
            localStorage.setItem('wishes', JSON.stringify(wishes));
            renderCheckoutOrder();
        }
    });
}

// 展示添加成功的信息
function showAddSuccess(productId) {
    const successElement = document.querySelector(`.js-add-success-${productId}`);
    if (successElement) {
        successElement.classList.remove("hidden-element");
        setTimeout(() => {
            successElement.classList.add("hidden-element");
        }, 1000);
    }
}