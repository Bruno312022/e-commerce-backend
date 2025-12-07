const express = require('express');
const productsController = require('../Controllers/productsController');
const router = express.Router();

router.get("/", productsController.getAllProducts)
router.post("/", productsController.createProduct);
router.get("/:productId", productsController.getProductById);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;