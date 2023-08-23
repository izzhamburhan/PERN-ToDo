const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// app.get('/', (req, res) => {
//     res.send('Hello Izzham!')
// })

app.use(cors())
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
});

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));