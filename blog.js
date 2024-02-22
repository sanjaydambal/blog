const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myblog'
});

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests only from this origin
}));

app.get('/', (req, res) => res.send('Hello World!'));

// Route to handle POST requests for adding new articles
app.post('/api/articles', (req, res) => {
  const { title, description } = req.body;
  const sql = 'INSERT INTO articles (title, description) VALUES (?, ?)';
  connection.query(sql, [title, description], (err, result) => {
    if (err) {
      console.error('Error adding article:', err);
      res.status(500).send('Error adding article');
    } else {
      res.status(201).send('Article added successfully');
    }
  });
});

// Route to handle GET requests for retrieving all articles
app.get('/api/articles', (req, res) => {
  connection.query('SELECT * FROM articles', (err, result) => {
    if (err) {
      console.error('Error getting articles:', err);
      res.status(500).send('Error getting articles');
    } else {
      res.json(result);
    }
  });
});

// Route to handle DELETE requests for deleting a specific article by ID
app.delete('/api/articles/:id', (req, res) => {
  const articleId = req.params.id;
  connection.query('DELETE FROM articles WHERE id = ?', [articleId], (err, result) => {
    if (err) {
      console.error('Error deleting article:', err);
      res.status(500).send('Error deleting article');
    } else {
      res.status(200).send('Article deleted successfully');
    }
  });
});
app.put('/api/articles/:id', (req, res) => {
  const articleId = req.params.id;
  const { title, description } = req.body;
  const sql = 'UPDATE articles SET title =?, description =? WHERE id =?';
  connection.query(sql, [title, description, articleId], (err, result) => {
    if (err) {
      console.error('Error updating article:', err);
      res.status(500).send('Error updating article');
    } else {
      res.status(200).send('Article updated successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
