const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');
const controller = require('../controllers/watchlist.controller');

// gets all watchlists
router.get('/', async (req, res) => {
  try {
    const watchlists = await controller.getWatchlists();
    return res.status(200).send(watchlists);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// gets one watchlist
router.get('/:id', async (req, res) => {
  try {
    const watchlist = await controller.getWatchlistById(req.params.id);
    return res.status(200).send(watchlist);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// creates new watchlist
router.post('/', async (req, res) => {
  const watchlist = req.body;
  const id = v4();
  watchlist.id = id;

  try {
    const newWatchlist = await controller.addOrUpdateWatchlist(watchlist);
    return res.status(201).send(newWatchlist);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// updates one watchlist
router.put('/:id', async (req, res) => {
  const watchlist = req.body;
  const { id } = req.params;
  watchlist.id = id;

  try {
    const newWatchlist = await controller.addOrUpdateWatchlist(watchlist);
    return res.status(200).send(newWatchlist);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// deletes one watchlist
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    return res.status(204).send(await controller.deleteWatchlist(id));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
