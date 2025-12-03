const authMiddleware = require('../authMiddlware/middleware')
const express = require('express');
const userController = require('../Controllers/userController');
const router = express.Router();

router.get("/", authMiddleware, userController.getAllUsers);
router.post("/", authMiddleware, userController.createUser);
router.get("/:userId", authMiddleware, userController.getUserById);
router.put("/:userId", authMiddleware, userController.updateUser);
router.delete("/userId", authMiddleware, userController.deleteUser);


module.exports = router;