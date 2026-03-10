const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roles");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/userrole")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});