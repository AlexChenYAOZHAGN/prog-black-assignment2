Here's the translation of the described functionalities into English:

### Search.js
- Implements keyword-based search functionality, popping up product information based on keywords provided by the user.

### Header.js
- `renderHeader` function is responsible for rendering the page header area, including a search box, shopping cart icon, and logo.
- `addSearchEventListener` auxiliary function adds an event listener to the search button.

### ProductGrid.js
- `renderProductGrid` function dynamically renders the product list by selecting a subset of all product data to display on the web page.
- `updatePaginationControls` and `changePage` functions handle pagination control, allowing users to browse products on different pages by clicking "Previous" and "Next" buttons.
- Adds products to the cart by including an "Add to Cart" button next to each product in the product list and attaching event listeners to these buttons. The corresponding product ID will be added to the cart, updating the shopping cart information at the top of the page and displaying a brief "Added Successfully" prompt.

### Product.js
- Mainly displays specific product details and offers interactive functionality to add the product to the cart.
- `renderProductDetails` is responsible for rendering the obtained product information on the page, displaying detailed information such as the product's image, name, rating, number of comments, sales information, price, etc.
- Includes a dropdown list for product quantity selection, allowing users to choose the purchase amount.
- Contains an "Add to Cart" button and a hidden "Added Successfully" prompt.
- `setupEventListeners` sets click event listeners for the "Add to Cart" button. It retrieves the purchase amount selected from the dropdown list, updates the shopping cart information by re-rendering the header, and calls the `showAddSuccess` function to display the "Added Successfully" prompt.
- `showAddSuccess` function displays a "Added Successfully" prompt and hides it after one second.
- `initPage` function call at the end of the code calls `initPage` function to initialize the page content.

### Cart.js
- Provides basic operations for the shopping cart.
- `addToCart` function adds a product to the cart. It first checks if the product (identified by `productId`) already exists in the cart. If so, it just increases the quantity of that product; otherwise, it adds a new product item.
- `deleteFromCart` function removes a product from the cart. It finds the corresponding product item by `productId`, and if found, uses the `splice` method to remove it from the `cart` array. Afterward, it calls `updateStorage` function to update `localStorage`.
- `updateCart` function updates the delivery method (`deliveryId`) or purchase quantity (`buyNum`) for a specific product in the cart. It first finds the corresponding product item, then updates the item's `deliveryId` or `num` based on the passed parameters, and finally calls `updateStorage` to update `localStorage`.

### Checkout.js
- Renders checkout page order messages and prices.
- `renderCheckoutPrice` function's role is to render the order summary on the checkout page, including the total number of items, total product price, shipping cost, and final total price.
- Data acquisition: Obtains the necessary information from shopping cart data, product data, and delivery option data.
- Data processing: Calculates the total number of products, total price, and shipping cost.
- Dynamic rendering: Generates the order summary's HTML dynamically based on calculation results and renders it on the page.
- `renderCheckoutOrder` function is mainly used to render and manage the order information on the checkout page, including displaying products in the shopping cart, selecting delivery options, modifying product quantities, and deleting products from the cart.
- After rendering the order information on the checkout page, the `setupEventListeners` function is responsible for setting event listeners on operation elements on the page, including:
    - Delete buttons (`.delete-from-cart`): When clicked, it removes the corresponding product from the cart and updates the page and header information.
    - Delivery option input fields (`.delivery-option-input`): When clicked, it updates the delivery option for the product in the cart and recalculates the price.
    - Purchase quantity input fields (`.buy-num`): When modified, it updates the purchase quantity for the product in the cart and recalculates the price.