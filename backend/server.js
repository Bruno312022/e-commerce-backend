require('dotenv').config({ path: '../.env' })
const express = require("express");
const app = express();
const sequelize = require("./Config/conn")
const port = process.env.SRVR_PORT;
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Server is up")
})

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error({ msg: "Database not connected"})
    })

