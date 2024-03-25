import { cart } from "./cart.js";
import { getProduct } from "../../mockdata/products.js";
import { getDeliveryOption } from "../../mockdata/deliveryOptions.js";

export function renderCheckoutPrice() {
    const totals = cart.reduce((acc, item) => {
        const product = getProduct(item.id);
        const deliveryOption = getDeliveryOption(item.deliveryId);
        acc.productNum += item.num;
        acc.productPrice += product.discountPrice * item.num;
        acc.deliveryPrice += deliveryOption.price;
        return acc;
    }, { productNum: 0, productPrice: 0, deliveryPrice: 0 });

    const totalPrice = totals.productPrice + totals.deliveryPrice;
    
    const html = `
        <h2 class="checkout-summary">Order summary</h2>
        <p class="checkout-items">Total number of items ${totals.productNum}</p>
        <p class="items-price">
            <span>Amount : </span>
            <span>$${totals.productPrice}</span>
        </p>
        <p class="delivery-price">
            <span>freight : </span>
            <span>$${totals.deliveryPrice}</span>
        </p>
        <hr class="checkout-summary-hr">
        <p class="total-price">
            <span>lump sum : </span>
            <span>$${totalPrice}</span>
        </p>
        <button class="checkout-button">Checkout</button>
    `;

    document.querySelector(".checkout-right").innerHTML = html;
}
