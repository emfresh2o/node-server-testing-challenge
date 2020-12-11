const express = require('express');

const Simpsons = require('../simpsons/simpsonsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/simpsons', (req, res) => {
  Simpsons.getAll()
    .then((simpsons) => {
      res.status(200).json(simpsons);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post('/simpsons', (req, res) => {
  const newSimpsons = req.body;
  Simpsons.insert(newSimpsons)
    .then((simpsons) => {
      res.status(201).json(simpsons);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error posting simpsons' });
    });
});

server.delete('/simpsons/:id', (req, res) => {
  const { id } = req.params;
  Simpsons.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find resources' });
      }
    })
    .catch((e) =>
      res.status(500).json({ message: 'Error deleting resources' })
    );
});

module.exports = server;
