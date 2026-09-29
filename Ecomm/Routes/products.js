const express = require('express');
const router = express.Router();
const db = require("../db");

// GET all Product
router.get("/",(req,res)=>{
    db.query(`Select * from products JOIN categories 
        on products.category_id = categories.category_id`,
    (err,result)=>
    {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});


//GET Product by ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sql = `SELECT * FROM products JOIN categories 
    on products.category_id = categories.category_id
    WHERE product_id = ?`;

    db.query(sql, [id], (err, result) => { 

        if (err) {
            return res.status(500).json({
                message: "Error fetching products",
                error: err.message
            });
        }
        res.json(result[0]);
    });
});

// INSERT Product
router.post("/", (req, res) => {

    const {product_name, price, stock, category_id} = req.body;

    const sql = `
        INSERT INTO products
        (product_name, price, stock, category_id)
        VALUES (?, ?, ?,?)
    `;

    db.query(
        sql,
        [product_name, price, stock, category_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error inserting products",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "products added successfully",
                id: result.insertId
            });
        }
    );
});

// UPDATE Product
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {product_name, price, stock, category_id} = req.body;

    const sql = `
        UPDATE products
        SET product_name = ?,
            price = ?,
            stock = ?,
            category_id = ?
        WHERE product_id = ?
    `;

    db.query(
        sql,
        [product_name, price, stock, category_id, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error updating products",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "products not found"
                });
            }

            res.json({
                message: "products updated successfully"
            });
        }
    );
});

// DELETE Product
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM products WHERE product_id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error deleting products",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "products not found"
            });
        }

        res.json({
            message: "products deleted successfully"
        });
    });
});

module.exports = router;