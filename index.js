const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(cors());

app.post('/todo', async function(req,res){
  console.log("hi")
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if(!parsePayload.success){
    res.status(411).json({
      msg : "You sent the wrong input"
    })
  }

  //put it in mongoDB
  await todo.create({
    title : createPayload.title,
    description : createPayload.description,
    completed : false
  })
  res.json({
    msg : "Todo created"
  })

})


app.get('/todos' , async function(req,res){
  // res.send('Hello World!');
  const todos = await todo.find()
  res.json({
    todos
  })
})



app.put('/completed', async function(req,res){
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload)
  if(!parsePayload.success){
    res.status(411).json({
      msg : "You sent the wrong inputs"
    })
  }

  console.log(req.body.id);

  await todo.update({
    _id: req.body.id
  }
  ,{
    completed : true
  }
  )

  res.json({
    msg : "Todo marked is completed"
  })
})

app.listen(3000);