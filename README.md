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

# Project Setup Instructions

This guide will walk you through setting up your PHP environment and running the project using XAMPP and Visual Studio Code.

To make this fully functional:
1. You need to place the whole project folder into XAMPP/xamppfiles/htdocs
2. If the path after htdocs is prog-black-assignment2/index.php, then after starting the server in the browser you need to type localhost/prog-black-assignment2/index.php to see the main page and it applies to other pages as well
3. To make the webpage fully functional in addition you need to go to Backend Client in prog-black-assignment2 folder and start index.js by type node index.js in terminal, this runs the backend client so after placing any orders backend can see the orders. In edition there are two links "http://127.0.0.1:3000/orders/82818421" and "http://127.0.0.1:3000/delivered/291842" the first one is for backend clients to confirm orders to make it ready to be shipped and the second one is to delete orders after confirming it is shipped.


## Prerequisites

Before you begin, ensure you have the following installed:
- **XAMPP**: Download from the [official XAMPP website](https://www.apachefriends.org/index.html).
- **Visual Studio Code**: Download from the [official Visual Studio Code website](https://code.visualstudio.com/).

## Installation and Setup

### Step 1: Install XAMPP

Download and install XAMPP from the official website. This will be used to manage your PHP and MySQL services.

### Step 2: Start XAMPP Services

- Open the XAMPP control panel.
- Start the Apache and MySQL modules. These services are necessary to run PHP applications and manage databases.

### Step 3: Install Visual Studio Code

After downloading Visual Studio Code from its official website, install it on your computer. This will be your integrated development environment (IDE) for coding.

### Step 4: Configure PHP in Visual Studio Code

- Follow the instructions in this YouTube video to configure PHP in Visual Studio Code: [Setup PHP in VS Code](https://www.youtube.com/watch?v=Ry8tRRfxxf4&ab_channel=BoostMyTool).
- This will guide you on how to add the PHP executable path to Visual Studio Code and set up a conducive development environment.

### Step 5: Open Your Project

- Open Visual Studio Code.
- Navigate to the folder where you have your project, named `prog-black-assignment2`.
- Open the project folder in Visual Studio Code.

### Step 6: Serve Your Project

- Right-click within the Visual Studio Code window.
- Select the option "PHP Server: Serve Project".
- This action starts a local PHP server and opens your project in your default web browser.

## Running the Project

Once the server is running, your website should be accessible locally. If you encounter any issues, make sure that the PHP and MySQL modules in XAMPP are running, and your project settings in Visual Studio Code are correctly configured.

# Website Functionality Overview

## Main Page (`index.php`)

- **Product Display**: Items from Durham University for sale are displayed with images. Each item is shown in a box that includes:
  - **Cart Button**: Adds the item to your shopping cart.
  - **Wishlist Button**: Adds the item to your wishlist.
  - **Price Listing**: Displayed on the left side of the cart button.
- **Search Bar**: Located at the header for finding items. After entering your search terms, you can specify a minimum and maximum price range. A magnifying glass icon submits the search query.
- **Pagination**: Navigate through multiple pages of items with next and previous buttons located at the bottom of the page.

### Detailed Product View

- **Access**: Clicking on an item box redirects to a detailed view of the item, including:
  - **Images** and **name** of the item.
  - **Reviews**: Number of reviews and star rating.
  - **Pricing**: Original price (greyed out), discount amount (in red), and discounted price.
  - **Quantity Selector**: Allows selection of the quantity to purchase.
  - **Add to Cart**: Button to add the item directly to the shopping cart.
  - **Product Description**: Detailed information about the item is listed below.

## Shopping Cart

- **Access**: By pressing the cart button at the top right of the header, you can view:
  - **Items List**: Each item you plan to purchase, with options to delete or change the quantity.
  - **Pricing Details**: Displayed alongside each item.
  - **Delivery Options**: Choose from "Pick up the goods yourself", "Pick up from merchant", or "Home delivery".

## Wishlist

- **Access**: The wishlist button next to the cart button shows:
  - **Listed Items**: Each desired item with options to remove from the wishlist or add to the cart.
  - **Manage Wishlist**: Add notes or adjust the list as needed.

## Navigation

- **Home Button**: Clicking the Durham University logo labeled "Home" at any time will redirect you to the home page.

## Authentication

- **Sign Up**: Located under the Durham University logo. Redirects to the sign-up page where new users can register by entering their name, email, password, and password confirmation.
- **Sign In**: Also under the Durham University logo, redirects to the sign-in page where existing users can log in by entering their email address and password.


