// import frameworks
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// import model
import Superhero from "../models/Superhero.js";

dotenv.config();

// creating a router to work with routes
const superheroRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// route to get all superheroes
superheroRouter.get("/", async (req, res) => {
    try {
        const superheroes = await Superhero.find({});
        res.json(superheroes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
});

// route to get specific superhero
superheroRouter.get("/:superheroId", async (req, res) => {
    try {
        const { superheroId } = req.params;
        const superhero = await Superhero.findById(superheroId);
        if (!superhero) {
            return res.status(404).json({ message: "Superhero not found" });
        };
        res.json(superhero);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
});

// route to add new superhero to db
superheroRouter.post("/", async (req, res) => {
    try {
        const superhero = new Superhero(req.body);
        await superhero.save();
        res.status(201).json(superhero);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
});

// route to upload image

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

superheroRouter.post("/:id/upload", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded!" });
    try {
        const superheroId = req.params.id;
        const filePath = `uploads/${req.file.filename}`;
        
        const superhero = await Superhero.findByIdAndUpdate(
            superheroId,
            { $push: { images: filePath } },
            { new: true }
        );
        const url = `http://localhost:5000/${filePath}`;
        console.log(`url: ${url}`);
        res.json({ url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// route to update particular superhero
superheroRouter.put("/:superheroId", async (req, res) => {
    try {
        const { superheroId } = req.params;
        const updatedSuperhero = await Superhero.findByIdAndUpdate(
            superheroId,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedSuperhero) {
            return res.status(404).json({ message: "Superhero not found" });
        };
        res.status(201).json(updatedSuperhero);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
});

// route to delete specific superhero
superheroRouter.delete("/:superheroId", async (req, res) => {
    try {
        const { superheroId } = req.params;
        const superhero = await Superhero.findByIdAndDelete(superheroId);
        if (!superhero) {
            return res.status(404).json({ message: "Superhero not found" });
        };
        res.json({ message: "Superhero deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
});

export default superheroRouter;