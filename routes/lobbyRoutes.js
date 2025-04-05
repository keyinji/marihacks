const express = require('express');
const router = express.Router();
const Lobby = require('../models/Lobby');

function generateLobbyCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}
router.get('/', (req, res) => {
    res.render('index', {})
    console.log("black")
})

// Create lobby
router.post('/create', async (req, res) => {
  const { gameSettings } = req.body;

  let code, existing;
  do {
    code = generateLobbyCode();
    existing = await Lobby.findOne({ code });
  } while (existing);

  const newLobby = new Lobby({ code, gameSettings, players: [] });
  await newLobby.save();

  res.status(201).json({ lobbyCode: code });
});

// Join lobby
router.post('/join', async (req, res) => {
  const { code } = req.body;
  const lobby = await Lobby.findOne({ code: code.toUpperCase() });

  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }

  res.json({ message: 'Lobby joined', gameSettings: lobby.gameSettings, code: lobby.code });
});



module.exports = router;
