var inquirer = require("inquirer");
var mysql = require("mysql");

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
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "------------------------------\n Welcome to the Bamazon Market. Below are the available items. \n ------------------------------",
                    choices: function () {
                        var productsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productsArray.push(results[i].product_name);
                        }
                        return productsArray;
                    }
                }
            ])
            .then(function (answer) {
                var chosenProduct;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
            });
    });
}


