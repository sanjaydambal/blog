const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// In-memory "database"
let items = [];

app.use(bodyParser.json());

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === itemId);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items[index] = updatedItem;
  res.json(updatedItem);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  items = items.filter(item => item.id !== itemId);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
