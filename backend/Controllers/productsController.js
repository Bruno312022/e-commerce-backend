const Products = require('../Models/Products')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        return res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error fetching all products" });
    }
}


exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Products.findByPk(productId)

        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }

        return res.status(200).json(product)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error fetching product" })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { imageUrl, productName, description, price, stock } = req.body;
        const product = await Products.create({
            imageUrl,
            productName,
            description,
            price,
            stock
        });
        res.status(201).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating product" });
    }
}



exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Products.findByPk(productId);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const { imageUrl, productName, description, price, stock } = req.body;

        if (imageUrl) product.imageUrl = imageUrl;
        if (productName) product.productName = productName;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;

        await product.save();

        return res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error updating product" });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Products.findByPk(productId);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        await product.destroy();

        return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error deleting product" });
    }
}