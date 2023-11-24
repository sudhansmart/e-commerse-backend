
const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/Wishlist');
const User = require('../models/User'); 

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const wishlistItems = await WishlistItem.find({ user: userId });
    res.json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { title, price, image } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const wishlistItem = new WishlistItem({
      title,
      price,
      image,
      user: user._id,
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:userId/:productId', async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    await WishlistItem.findOneAndRemove({ _id: productId, user: userId });
    res.status(204).send();
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
