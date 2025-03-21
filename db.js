/*
Todo {
  title: string,
  description: string,
  completed : string
}
*/


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://praveen:Pbisht.88@cluster0.w3ay0.mongodb.net/Todos")


const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
})


const todo = mongoose.model('todos' ,todoSchema)


module.exports = {
  todo
}

