const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const hotelsRoutes = require("./routes/hotelRoutes");
var port = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(hotelsRoutes);

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/auth/login", (req, res) => {
    console.log(req.body);
    const token = jwt.sign({ foo: req.body.email }, "secret message");
    console.log(token);
    res.send(token);
});
app.listen(port, () => {
    console.log("Server Running on port: ", port);
});
