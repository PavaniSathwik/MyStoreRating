const { Store } = require("../models");

// Create store
const createStore = async (req, res) => {
  try {
    const { name, address, photo, ownerId } = req.body;
    if (!ownerId) return res.status(400).json({ message: "ownerId is required" });

    const newStore = await Store.create({ name, address, photo, ownerId });
    res.status(201).json(newStore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get stores by owner
const getStoresByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const stores = await Store.findAll({ where: { ownerId } });
    res.status(200).json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createStore, getStoresByOwner, getAllStores };
