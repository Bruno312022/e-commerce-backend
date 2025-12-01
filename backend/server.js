require('dotenv').config({ path: '../.env' });

const express = require("express");
const cors = require("cors");
const sequelize = require("./Config/conn");

const app = express();
const port = process.env.SRVR_PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route for health check
app.get("/", (req, res) => {
    res.send("Server is up");
});

// Initialize database and start server
sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Database not connected:", error);
    });
