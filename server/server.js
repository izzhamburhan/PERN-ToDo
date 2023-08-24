const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4:uuidv4 } = require('uuid')
const app = express()
const cors = require('cors')
const pool = require('./db')

// app.get('/', (req, res) => {
//     res.send('Hello Izzham!')
// })

app.use(cors())
app.use(express.json())
// get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    // console.log(userEmail) -- check masuk ke tak
    try{
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail] );
        res.json(todos.rows)
    }catch(err) {
        console.log(err)
    }
})

// create a new to do
app.post('/todos', async (req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date)
    const id = uuidv4()
   try {
    const newToDo = await pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
    [id, user_email, title, progress, date])
    res.json(newToDo)
   } catch (error) {
    console.log(error)
   } 
});


// edit data
app.put('/todos/:id', async (req, res) => {
 const { id } = req.params
 const {user_email, title, progress, date} = req.body
 try {
    const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date= $4 WHERE id = $5;', 
    [user_email, title, progress,date, id])
    res.json(editToDo)
} catch (error) {
    console.log(error)
 }   
});

// delete data
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params
    
    try {
        const deleteTodo = await pool.query(`DELETE FROM todos WHERE id = $1;`, [id])
        res.json(deleteTodo)    
    } catch (error) {
        console.error(error)
    }
})


app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));