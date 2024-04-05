// Storing wishlist data locally and manipulating it
// Create a wishlist array, which is empty if there are no local records.
export let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


function updateStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


// Add products to a user's Wishlist.
export function addToWishList(productId, buyNum = 1) {
    console.log("add to the wishlist");
    // Check if the item already exists in the wishlist, and if it does, don't add it
    const wishlistItemIndex = wishlist.findIndex(item => item.id === productId);
    if (wishlistItemIndex === -1) {
        wishlist.push({
            id: productId,
            num: buyNum, // Use the provided buyNum instead of hardcoding to 1
            deliveryId: "1" // Assuming "1" is a default deliveryId
        });
        updateStorage();
    } else {
        alert("Item already exists in the wishlist");
    }
}

export function getWishlistNum() {
    return wishlist.reduce((total, item) => total + item.num, 0);
}

export function deleteFromWishlist(productId) {
    const index = wishlist.findIndex(item => item.id === productId);
    if (index !== -1) {
        wishlist.splice(index, 1);
        updateStorage();
    }
}