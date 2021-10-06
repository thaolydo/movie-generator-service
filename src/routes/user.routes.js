const controller = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const users = await controller.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await controller.getUserById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  const user = req.body;
  const id = v4();
  user.id = id;
  try {
    const newUser = await controller.addOrUpdateUser(user);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});

router.put('/:id', async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  user.id = id;
  try {
    const newUser = await controller.addOrUpdateUser(user);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await controller.deleteUser(id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});

module.exports = router;
