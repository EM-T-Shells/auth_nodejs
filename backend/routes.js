const express = require('express');
const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
  const { username, password, name, college, yearOfGraduation } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  } 

  const user = { username, password, name, college, yearOfGraduation };

  users.push(user);

  res.status(201).json({ message: 'User created successfully' });
  
 console.log(users);
});

router.get('/users', (req, res) => {
    const getUsers = users.map(user => {
        const { password, ...usersWithoutPw } = user;
        return usersWithoutPw;
    })
    res.json(getUsers);
});


module.exports = router;