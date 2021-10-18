const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const hotels = require("./hotels.json");
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to trippy API");
});
app.get("/hotels", (req, res) => {
    res.json(hotels);
});
app.get("/hotels/:id", (req, res) => {
    const id = req.params.id;
    res.json(hotels[id]);
});
app.post("/hotels", (req, res) => {
    console.log(req.body);
    const hotel = req.body;
    hotels.push(hotel);
    fs.writeFileSync("hotels.json", JSON.stringify(hotels), () => {
        console.log("write file done");
    });
    res.send("Hotel received");
});
app.put("/hotels/:id", (req, res) => {
    console.log(req.params.id, req.query);
    const hotelID = req.params.id;
    const newName = req.query.name;
    hotels[hotelID].name = newName;
    fs.writeFileSync("hotels.json", JSON.stringify(hotels), () => {
        console.log("write file done");
    });
    res.send("Update of name Done!");
});
app.listen(port, () => {
    console.log("Server Running on port: ", port);
});
