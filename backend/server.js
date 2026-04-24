const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 📁 create full path to orders.json
const filePath = path.join(__dirname, "orders.json");

// test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// 📥 RECEIVE ORDER (SAVE TO FILE)
app.post("/orders", (req, res) => {
    const order = req.body;

    console.log("New Order Received:");
    console.log(order);

    // 1. Read existing orders
    let orders = [];
    try {
        orders = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        orders = [];
    }

    // 2. Add new order
    orders.push(order);

    // 3. Save back to file
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    res.json({
        message: "Order saved to file!"
    });
});

// 📤 GET ALL ORDERS (READ FROM FILE)
app.get("/orders", (req, res) => {
    try {
        const orders = JSON.parse(fs.readFileSync(filePath));
        res.json(orders);
    } catch (err) {
        res.json([]);
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});