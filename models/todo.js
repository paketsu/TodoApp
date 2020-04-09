const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {type: String, required: true, unique: true},
    completed: {type: Boolean, default: false} 
    }, {
    timestamps: true
});

module.exports = mongoose.model("Todo", TodoSchema)