const express = require('express');
const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
  const { username, password, name, college, yearOfGradduation } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const user = { username, password, name, college, yearOfGradduation };

  users.push(user);

  res.status(201).json(user, { message: 'User created successfully' });
})

module.exports = router;