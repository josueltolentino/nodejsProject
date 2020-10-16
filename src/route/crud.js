const express = require('express');
const router = express.Router();

const pool = require('../db');

router.get('/add', async  (req , res) =>{
    const producto = await pool.query('SELECT * FROM productos');
    res.render('partial/index' , {producto});
});
router.post('/addproducto', async (req , res) => {
    const {nombre, marca, modelo , stock} = req.body;
    const newProducto = {
        nombre,
        marca,
        modelo,
        stock,
    };
    console.log(newProducto);
    await pool.query('INSERT INTO productos set ?', [newProducto]);
    res.redirect('/Gowplay/add');
});

router.get('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.redirect('/Gowplay/add');
});
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query('SELECT * FROM productos WHERE id =?', [id]);
    res.render('partial/edit', {producto: productos[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {nombre, marca, modelo, stock} = req.body;
    const {id} = req.params;
    const newProducto = {
        nombre,
        marca,
        modelo,
        stock,
    };
    await pool.query('UPDATE  productos set ? WHERE id = ?', [newProducto, id]);
    res.redirect('/Gowplay/add');
});

module.exports = router;