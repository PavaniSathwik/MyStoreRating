const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { getSummary } = require("../controllers/adminController");
// GET all users
router.get('/users', getAllUsers);

// PUT update user by id
router.put('/users/:id', updateUser);

// DELETE user by id
router.delete('/users/:id', deleteUser);


router.get("/summary", getSummary);

module.exports = router;
