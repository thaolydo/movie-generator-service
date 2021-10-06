const controller = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const users = await controller.getUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await controller.getUserById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const user = req.body;
  const id = v4();
  user.id = id;
  try {
    const newUser = await controller.addOrUpdateUser(user);
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  user.id = id;
  try {
    const newUser = await controller.addOrUpdateUser(user);
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    return res.status(204).send(await controller.deleteUser(id));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
