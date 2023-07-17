const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

let users = [];

const jwtSecret = process.env.JWT_SECRET_KEY;

function generateToken(user) {
  const token = jwt.sign({username: user.username}, jwtSecret, {expiresIn: '1h'});
  return token;
}

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
    req.user = user;
    next();
  })
}

router.post('/register', (req, res) => {
  const { username, password, name, college, yearOfGraduation } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  } 

  const user = { username, password, name, college, yearOfGraduation };

  users.push(user);

  const token = generateToken(user);

  res.header('auth', token).json({ message: 'User created successfully', token });

 console.log(users);
});

router.get('/users', authenticateJWT, (req, res) => {
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