const express = require("express");
const fs = require("fs");
const hotels = require("../hotels.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to trippy API");
});
router.get("/hotels", (req, res) => {
    res.json(hotels);
});
router.get("/hotels/:id", (req, res) => {
    const id = req.params.id;
    res.json(hotels[id]);
});
router.post("/hotels", (req, res) => {
    console.log(req.body);
    const hotel = req.body;
    hotels.push(hotel);
    fs.writeFileSync("hotels.json", JSON.stringify(hotels), () => {
        console.log("write file done");
    });
    res.send("Hotel received");
});
router.put("/hotels/:id", (req, res) => {
    console.log(req.params.id, req.query);
    const hotelID = req.params.id;
    const newName = req.query.name;
    hotels[hotelID].name = newName;
    fs.writeFileSync("hotels.json", JSON.stringify(hotels), () => {
        console.log("write file done");
    });
    res.send("Update of name Done!");
});
module.exports = router;
