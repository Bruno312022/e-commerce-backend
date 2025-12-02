const express = require('express');
const userController = require('../Controllers/userController');
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);
router.delete("/userId", userController.deleteUser);


module.exports = router;