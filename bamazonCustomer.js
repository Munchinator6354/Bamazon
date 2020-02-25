var inquirer = require("inquirer");
var mysql = require("mysql");
// var cTable = 
require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456789",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayMarket();
});

function displayMarket() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        inquirer.prompt([
                {
                    type: "input",
                    name: "whichID",
                    message: "------------------------------\n Please select the ID of the item you would like to buy from the table above. \n ------------------------------",
                    choices: function () {
                        var productsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productsArray.push(results[i].product_name);
                        }
                        console.log(productsArray + " This is productsArray");
                        return productsArray;
                    },

                },
                    
                    {
                        type: "input",
                        name: "howMany",
                        message: "------------------------------\n How many of that item would you like? \n ------------------------------",
                        choices: function () {
                            var productsArray = [];
                            for (var i = 0; i < results.length; i++) {
                                productsArray.push(results[i].product_name);
                            }
                            return productsArray;
                        },
                }
            ])
            .then(answer => {
                console.log(Object.values(answer) + " This is answer");
                // console.log(answer.whichID)
                var chosenProduct = parseInt(answer.whichID);
                var chosenQuantity = parseInt(answer.howMany);
                console.log(typeof chosenProduct)
                var productExists = checkIfInTable(results, chosenProduct);
                console.log(productExists);
                enoughQuantity(productExists, chosenQuantity);
            });
    })

// when creating a function, you can use a placeholder title/word for what is being passed through the function. When you are actually calling or invoking the function, it must specifically pass what you are intending.
function checkIfInTable(results, itemID) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === itemID) {
                    return results[i];
                }
            }
            return null;
        };

    }

function enoughQuantity(productExists, chosenQuantity) {
    console.log(productExists)
    if (productExists.stock_quantity < chosenQuantity) {
        console.log("Insufficient Quantity");
    }
    else connection.query("SELECT * FROM products WHERE product_name = " + productExists.product_name
};


    
    // Have an if statement afte rline 43 that if prouctExists, call another function prompting quantity, passproductExists into the function and then start the process of inquirer, use input, ask them how many they want to buy, then make purchase function (doing another query) to update the database/table.
