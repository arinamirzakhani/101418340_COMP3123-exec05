const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();

// Read user.json from project root
function readUser() {
  const p = path.join(__dirname, '..', 'user.json'); // NOTE: no "data" folder
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res, next) => {
  try {
    const user = readUser();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/*
- /login accepts {username, password} in JSON body
- Validate against user.json
*/
routerUser.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = readUser();

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }
    return res.json({ status: true, message: 'User Is valid' });
  } catch (err) {
    next(err);
  }
});

/*
- /logout route accepts username as a URL param
- Returns HTML message
*/
routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;

