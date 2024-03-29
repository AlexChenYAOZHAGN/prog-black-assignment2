// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
// Create an Express application
const app = express();
app.use(express.static('public'));

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
    var html = "<p>You brought the following items, Thank you for shopping with us!</p><ul>";
    for(var i=0;i<filteredTable2.length;i++){
        html += '<li><img src="'+filteredTable2[i].img+'" alt="'+filteredTable2[i].name+'" width="100" height="100"><p><'+filteredTable2[i].name+'/p></li>'
    }

    

    // Check if the file exists
    fs.access("orders.txt", fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create the file and write data
            fs.writeFile("orders.txt", JSON.stringify(filteredTable2), (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                } else {
                    console.log('File created and data written successfully!');
                }
            });
        } else {
            var p = JSON.parse(fs.readFileSync("orders.txt", 'utf8'));
            
            p.append(filteredTable2);
            fs.writeFile("orders.txt", JSON.stringify(filteredTable2), (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                } else {
                    console.log('File created and data written successfully!');
                }
            });
        }
    });


    res.send(html);
    

});
app.get('/orders/:n', (req, res) => {
    
    if(req.params.n=="82818421"){
        var p = JSON.parse(fs.readFileSync("orders.txt", 'utf8'));

        var html = "<p>Recently orders</p><ul>";
        for(var i=0;i<p.length;i++){
            html += '<li><img src="http://127.0.0.1:3000/'+p[i].img+'" alt="'+p[i].name+'" width="100" height="100"><p><'+p[i].name+'/p></li>'
        }
        html += "<a href = 'http://127.0.0.1:3000/delivered/291842'>Dispatch Orders</a>"
        res.send(html)
    }
    else{
        res.status(500).send("internal server error");
    }

})

app.get('/delivered/:n',(req,res)=>{
    if(req.params.n="291842"){
        fs.unlink("orders.txt", (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
        res.send("order dispatched")
    }
    else{
        res.status(500).send("internal server error");
    }
})


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});