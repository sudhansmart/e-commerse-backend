const mongoose = require('mongoose');



        const wishlistSchema = new mongoose.Schema({
            title: String,
            price: Number,
            image: String,
            // Reference to the user who owns the wishlist
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          });
          module.exports = mongoose.model('WishlistItem', wishlistSchema);
