import express from "express";
import userRouter from "./routes/user.route.js";
import mongoose from "mongoose";
import { User } from "./model/user.js";
const app = express();
app.use(express.json());
const PORT = 8000;
const URI = process.env.MONGODB_URI;
if (!URI) {
    throw new Error("MONGODB_URI environment variable is not set");
}
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
app.get("/", (req, res) => {
    res.send({
        status: "success",
        message: "Hello World",
    });
});
app.get("/about", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "About Us",
    });
});
app.post("/contact", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Contact Us",
    });
});
app.put("/update", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Update",
    });
});
app.patch("/patch", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Patch",
    });
});
app.delete("/delete", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Delete",
    });
});
app.post("/User", async (req, res) => {
    try {
        console.log("req.body:", req.body);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.send("User added");
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: "User not created",
        });
    }
});
app.get("/Userlist", async (req, res) => {
    try {
        const result = await User.find({});
        console.log("Users from DB:", result);
        res.send(result);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.listen(PORT, (err) => {
    console.log(`server is running on ${PORT}`);
});
