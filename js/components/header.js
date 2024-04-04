import { getCartNum } from "./cart.js";

export function renderHeader() {
    const headerContainer = document.querySelector(".header");
    if (!headerContainer) return;

    const html = `
        <div class="header-container">
            <div class="header-left">
                <a href="index.html">
                    <img class="logo-icon" src="images/icons/logo.png" alt="Logo">
                </a>
            </div>
            <span class="home-link">Home</span>  <!-- add Home text -->
            <div class="header-right">
                <div class="search">
                    <input class="search-input" placeholder="Search Name" aria-label="Search">
                    <input class="min-price-input" placeholder="$Min" type="number" aria-label="Minimum Price">
                    <input class="max-price-input" placeholder="$Max" type="number" aria-label="Maximum Price">
                    <button class="search-button" aria-label="Search Button">
                        <img class="search-icon" src="images/icons/search.svg" alt="Search">
                    </button>
                </div>
                <div class="cart">
                    <a href="checkout.html">
                        <img class="cart-icon" src="images/icons/cart.png" alt="Cart">
                    </a>
                    <p class="cart-num">${getCartNum()}</p>
                </div>
                <!-- 心愿清单 -->
                <div class="wishlist">
                    <a href="wishlist.html">
                        <img class="wishlist-icon" src="images/icons/wishlist.png" alt="WishList">
                    </a>
                    <p class="wishlist-num">${3}</p>
                </div>    
            </div>
        </div>
    `;
    headerContainer.innerHTML = html;
    addSearchEventListener();
}

function addSearchEventListener() {
    const searchButton = document.querySelector(".search-button");
    if (!searchButton) return;

    searchButton.addEventListener("click", () => {
        const searchText = document.querySelector(".search-input").value.trim();
         // the range of price
         const minPrice = document.querySelector(".min-price-input").value || 0;
         const maxPrice = document.querySelector(".max-price-input").value || Number.MAX_SAFE_INTEGER;
 
         if (searchText || minPrice || maxPrice) {
             location.href = `/search.html?input=${encodeURIComponent(searchText)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`;
        }
    });
}
