const express = require('express');
const router = express.Router();
const db = require("../db");

// GET all customers
router.get("/",(req,res)=>{
    db.query("Select * from customers",(err,result)=>
    {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});


//GET customers by ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM customers WHERE customer_id = ?";

    db.query(sql, [id], (err, result) => { 

        if (err) {
            return res.status(500).json({
                message: "Error fetching customers",
                error: err.message
            });
        }
        res.json(result[0]);
    });
});

// INSERT customers
router.post("/", (req, res) => {

    const {name, email, phone} = req.body;

    const sql = `
        INSERT INTO customers
        (name, email, phone)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error inserting customers",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "customers added successfully",
                id: result.insertId
            });
        }
    );
});

// UPDATE customers
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {name, email, phone} = req.body;

    const sql = `
        UPDATE customers
        SET name = ?,
            email = ?,
            phone = ?
        WHERE categories = ?
    `;

    db.query(
        sql,
        [name, email, phone, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error updating customers",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "customers not found"
                });
            }

            res.json({
                message: "customers updated successfully"
            });
        }
    );
});

// DELETE customers
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM customers WHERE categories = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error deleting customers",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "customers not found"
            });
        }

        res.json({
            message: "customers deleted successfully"
        });
    });
});

module.exports = router;