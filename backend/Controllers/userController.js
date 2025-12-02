const User = require('../Models/User');
const bcrypt = require('bcrypt');

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error fetching users" });
    }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error fetching user" });
    }
};

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error creating user" });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const { fullName, email, password, role } = req.body;

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (role) user.role = role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error updating user" });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        await user.destroy();
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error deleting user" });
    }
};
