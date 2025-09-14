const Rating = require("../models/Rating");
const Store = require("../models/Store");

// ---------------- Add or Update Rating ----------------
exports.addRating = async (req, res) => {
  try {
    const { storeId, userId, rating } = req.body;

    if (!storeId || !userId || !rating) {
      return res.status(400).json({ message: "storeId, userId, and rating are required" });
    }

    // 🔎 Check if this user already rated this store
    let existing = await Rating.findOne({ where: { storeId, userId } });

    if (existing) {
      // update existing rating
      existing.rating = rating;
      await existing.save();
    } else {
      // create new rating
      await Rating.create({ storeId, userId, rating });
    }

    // 📊 Recalculate avg & count for this store
    const allRatings = await Rating.findAll({ where: { storeId } });
    const usersRated = allRatings.length;
    const avgRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / usersRated;

    // save into Store
    await Store.update(
      { avgRating, usersRated },
      { where: { id: storeId } }
    );

    return res.json({ avgRating, usersRated });
  } catch (err) {
    console.error("Error adding rating:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



