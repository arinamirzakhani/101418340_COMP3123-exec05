const express = require('express');
const path = require('path');

const app = express();
const userRouter = require('./routes/users');

// Parse JSON bodies (for /login)
app.use(express.json());

// (Optional) Serve static files from project root (lets you open /home.html)
app.use(express.static(__dirname));

/**
 * /home -> serve home.html (sits in project root)
 */
app.get('/home', (req, res, next) => {
  const filePath = path.resolve(__dirname, 'home.html');
  res.sendFile(filePath, err => (err ? next(err) : undefined));
});

// Mount user routes under /api/v1/user  (note the leading slash)
app.use('/api/v1/user', userRouter);

// 404 for anything else
app.use((req, res) => res.status(404).send('Not Found'));

// Centralized error handler (returns 500)
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Web Server is listening at port ${PORT}`));
