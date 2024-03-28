// Import required modules
const express = require('express');
const bodyParser = require('body-parser');


// Create an Express application
const app = express();
app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/checkout',urlencodedParser, (req, res) => {
    console.log(req.body.cart);
    
    var cart = JSON.parse(req.body.cart)
    var products = JSON.parse(req.body.products)
    console.log(cart)
    console.log(products)
    const filteredTable2 = products.filter(item2 => cart.some(item1 => item1.id === item2.id));
    console.log(filteredTable2);
    res.send('Hello, Express!');
    

});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});