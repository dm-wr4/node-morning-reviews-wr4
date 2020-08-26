const express = require('express')
const usersCtrl = require('./controllers/usersController')

const app = express()
const port = 4545

app.use(express.json())

app.use(express.static(__dirname + '/../public'))

app.get('/api/users', usersCtrl.getAllUsers)
app.get('/api/users/:user_id', usersCtrl.getUserById)
app.post('/api/users', usersCtrl.createUser)
app.put('/api/users/:user_id', usersCtrl.updateUser)
app.delete('/api/users/:user_id', usersCtrl.deleteUser)

app.listen(port, () => console.log(`Take us to warp ${port}!`))
