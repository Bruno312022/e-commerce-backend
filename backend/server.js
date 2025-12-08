require('dotenv').config({ path: '../.env' });

const express = require("express");
const cors = require("cors");
const sequelize = require("./Config/conn");

const User = require("./Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = require("./Routes/userRoutes");
const productsRoutes = require("./Routes/productsRoutes")
const authMiddleware = require('./authMiddlware/middleware');

const app = express();
const port = process.env.SRVR_PORT;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/users", authMiddleware, userRoutes);
app.use("/Products",  productsRoutes);

const accessSecret = process.env.ACCESS_SECRET
const refreshSecret = process.env.REFRESH_SECRET

//login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ msg: "Invalid Credentials" })
        }

        const accessToken = jwt.sign(
            { email: user.email, role: user.role },
            accessSecret,
            { expiresIn: "30m" }
        )

        const refreshToken = jwt.sign(
            { email: user.email },
            refreshSecret,
            { expiresIn: "7d" }
        )

        return res.json({
            accessToken,
            refreshToken,
            role: user.role
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

})


const createAdminUser = async () => {
    const adminExists = await User.findOne({ where: { email: "localhost@admin.ecorp" } })

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(process.env.PSS, 10)
        await User.create({
            fullName: "Local Admin",
            email: "localhost@admin.ecorp",
            password: hashedPassword,
            role: "admin"
        })
        console.log("local admin created")
    } else {
        console.log("local admin alredy exists")
    }
}

// Initialize database and start server
sequelize
    .sync({ alter: true })
    .then(() => {
        createAdminUser().
            then(() => {
                app.listen(port, () => {
                    console.log(`Server running on port ${port}`);
                });
            })
    })
    .catch((error) => {
        console.error("Database not connected:", error);
    });
