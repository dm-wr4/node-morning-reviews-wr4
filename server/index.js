const express = require('express')
const users = require('../users.json')

const app = express()
const port = 4545

app.get('/api/users', (req, res) => {
    console.log('hit')
    res.send(users)
})

app.get('/api/user/:user_id', (req, res) => {

    console.log(req.params)
    // const id = req.params.id
    const {user_id} = req.params

    if(!user_id){
        res.status(404).send('Unable to find resource')
    }

    const user = users.find(user => user.id === +user_id)

    if(!user){
        res.status(500).send('Unable to find user')
    }

    res.status(200).send(user)
})

app.listen(port, () => console.log(`Take us to warp ${port}!`))
