export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, buyNum = 1) {
    console.log("add to the cart")
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        cart[cartItemIndex].num += buyNum;
    } else {
        cart.push({
            id: productId,
            num: buyNum, // Use the provided buyNum instead of hardcoding to 1
            deliveryId: "1" // Assuming "1" is a default deliveryId
        });
    }
    updateStorage();
}

export function getCartNum() {
    return cart.reduce((total, item) => total + item.num, 0);
}

export function deleteFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateStorage();
    }
}

export function updateCart(productId, deliveryId = false, buyNum = false) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (deliveryId) {
            cartItem.deliveryId = deliveryId;
        }
        if (buyNum) {
            cartItem.num = buyNum;
        }
        updateStorage();
    }
}