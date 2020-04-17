const express = require("express");
const router = express.Router();

const Todo = require("../models/todo")

router.get("/", async(req, res, next) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json({
            todos: todos
        })
    }
    catch (error) {
        return next(error)
    }
})

router.post("/", async(req, res, next) => {
    try {
        const todo = new Todo();
        todo.title = req.body.title;
        todo.completed = req.body.completed === "true" ? true : false;
        const newTodo = await todo.save();
        res.status(201).json({
            message: "Todo " + newTodo.title + " on luotu.",
            todo: newTodo
    })
    }
    catch (error) {
        return next(error)
    }
})

router.patch("/:id", async(req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        todo.completed = req.body.completed === "true" ? true : false;
        const updatedTodo = await todo.save();
        res.status(200).json({
            message: "Todo " + updatedTodo.title + " on päivitetty.",
            todo: updatedTodo
        })
    }
    catch (error) {
        return next(error)
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Todo " + req.params.id + " on poistettu."
        })
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router;