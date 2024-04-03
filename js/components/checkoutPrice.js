import { cart } from "./cart.js";
import { getProduct,products } from "../../mockdata/products.js";
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

    //add a function every 300 has 40 off
    //Calculate the amount of money that has been deducted and the amount of money that is still needed until the next deduction.
    const discount = Math.floor(totalPrice / 300) * 40;
    const nextDiscountThreshold = 300 - (totalPrice % 300);
    const discountedTotalPrice = totalPrice - discount;

    const discountInfoHtml = `
        <p class="discount-info">You have saved $${discount} so far!</p>
        ${totalPrice % 300 === 0 ? '' : `<p class="next-discount-info">Add $${nextDiscountThreshold} more to save another $40.</p>`}
        `;
    var cart_ = "[";
    for (let i = 0; i < cart.length-1; i++) {
        cart_ += JSON.stringify(cart[i])+",";
        
    }
    cart_ += JSON.stringify(cart[cart.length-1]) + "]";
    var products_ = "[";
    for (let i = 0; i < products.length-1; i++) {
        products_ += JSON.stringify(products[i])+",";
        
    }
    products_ += JSON.stringify(products[products.length-1]) + "]";
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
            <span>$${discountedTotalPrice}</span>
        </p>
        <p style="color: red;"> $40 off for every $300 </p>
        ${discountInfoHtml}
        <button class="checkout-button" onclick="submitForm()">Checkout</button>
        <form style="display: none;" id="checkout" action="http://localhost:3000/checkout" method="post">
        
        <textarea type="hidden" name="cart" rows="4" cols="50">`+cart_+`</textarea></br>
        <textarea type="hidden" name="products" rows="4" cols="50">`+products_+`</textarea>

        
        
        </form>
    `;

    document.querySelector(".checkout-right").innerHTML = html;
}
