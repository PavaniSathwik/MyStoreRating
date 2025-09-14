const express = require("express");
const router = express.Router();
const { createStore, getStoresByOwner, getAllStores } = require("../controllers/storeController");

router.post("/", createStore);
router.get("/owner/:ownerId", getStoresByOwner);
router.get("/", getAllStores);
module.exports = router;
