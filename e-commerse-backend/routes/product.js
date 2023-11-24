const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const mongoose = require('mongoose')



router.post('/insert', async (req, res) => {
    try {
        const data = new Products(req.body);
        await data.save();
        res.status(201).send(data);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/data',async (req,res)=>{
    Products.find()
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: 'An error occurred while fetching data' }));
});

router.put('/:id', async (req, res) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!isValidObjectId) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
