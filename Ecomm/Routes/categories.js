const express = require('express');
const router = express.Router();
const db = require("../db");

// GET all categories
router.get("/",(req,res)=>{
    db.query("Select * from categories",(err,result)=>
    {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});


//GET categories by ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM categories WHERE category_id = ?";

    db.query(sql, [id], (err, result) => { 

        if (err) {
            return res.status(500).json({
                message: "Error fetching categories",
                error: err.message
            });
        }
        res.json(result[0]);
    });
});

// INSERT categories
router.post("/", (req, res) => {

    const {category_name} = req.body;

    const sql = `
        INSERT INTO categories
        (category_name)
        VALUES (?)
    `;

    db.query(
        sql,
        [category_name],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error inserting categories",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "categories added successfully",
                id: result.insertId
            });
        }
    );
});

// UPDATE categories
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {category_name} = req.body;

    const sql = `
        UPDATE categories
        SET category_name = ?
        WHERE category_id = ?
    `;

    db.query(
        sql,
        [category_name, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error updating categories",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "categories not found"
                });
            }

            res.json({
                message: "categories updated successfully"
            });
        }
    );
});

// DELETE categories
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM categories WHERE category_id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error deleting categories",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "categories not found"
            });
        }

        res.json({
            message: "categories deleted successfully"
        });
    });
});

module.exports = router;