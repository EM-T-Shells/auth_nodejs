const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');

let users = [];

const jwtSecret = process.env.JWT_SECRET_KEY;

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

router.put('/users', (req, res) => {
  const { username, password, name, college, yearOfGraduation } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  user.name = name || user.name;
  user.college = college || user.college;
  user.yearOfGraduation = yearOfGraduation || user.yearOfGraduation;

  res.status(200).json({ message: 'User details updated successfully' });
});



module.exports = router;