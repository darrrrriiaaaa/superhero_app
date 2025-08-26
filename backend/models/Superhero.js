// import frameworks
import mongoose from "mongoose";

// creating schema
const SuperheroSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    real_name: {
        type: String,
    },
    origin_description: {
        type: String,
    },
    superpowers: {
        type: String,
    },
    catch_phrase: {
        type: String,
    },
    images: [{
        type: String,
    }]
});

// convert schema into model
const Superhero = mongoose.model("Superhero", SuperheroSchema);

export default Superhero;