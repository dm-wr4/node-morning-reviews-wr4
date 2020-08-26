const users = require('../../users.json')
let id = users[users.length - 1].id + 1

module.exports = {
  getAllUsers: (req, res) => {
    console.log('hit')
    res.status(200).send(users)
  },
  getUserById: (req, res) => {
    console.log(req.params)
    // const id = req.params.id
    const { user_id } = req.params

    if (!user_id) {
      res.status(404).send('Unable to find resource')
    }

    const user = users.find((user) => user.id === +user_id)

    if (!user) {
      res.status(500).send('Unable to find user')
    }

    res.status(200).send(user)
  },
  createUser: (req, res) => {
    const { first_name, last_name, email } = req.body

    const newUser = {
      id,
      first_name,
      last_name,
      email,
    }

    users.push(newUser)

    id++

    res.status(200).send({ users, message: 'User was created' })
  },
  updateUser: (req, res) => {
    const { user_id } = req.params
    const { first_name, last_name, email } = req.body

    const index = users.findIndex((element) => element.id === +user_id)

    if (user_id === -1) {
      return res.status(404).send('User not found')
    }

    const existingUser = users[index]

    const updatedUser = {
      id: existingUser.id,
      first_name: first_name || existingUser.first_name,
      last_name: last_name || existingUser.last_name,
      email: email || existingUser.email,
    }

    users[index] = updatedUser

    res.status(200).send(users)
  },
  deleteUser: (req, res) => {
    const { user_id } = req.params

    const index = users.findIndex((element) => element.id === +user_id)

    if (user_id === -1) {
      return res.status(404).send('User not found')
    }

    users.splice(index, 1)

    res.status(200).send(users)
  },
}

//* Example of a request from the front end:
// const andrew = {
//   first_name: 'Andrew',
//   last_name: 'Westenskow',
//   email: 'andrew@3mail.com',
// }

// axios
//   .post('/api/users', andrew)
//   .then((res) => {
//     console.log(res.data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
