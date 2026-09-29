const express = require('express');
const app = express();

const categoriesRouter = require("./Routes/categories");
const productsRouter = require("./Routes/products");
const customersRouter = require("./Routes/customers");

app.use(express.json());

app.use("/categories",categoriesRouter);
app.use("/products",productsRouter);
app.use("/customers",customersRouter);

app.listen(3000,()=>{
    console.log("Server Strated...");
});