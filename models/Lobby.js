const mongoose = require('mongoose');

const LobbySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  gameSettings: {
    timeLimit: Number,
    questionCount: Number,
    difficulty: String
  },
  players: [{ type: String }],
  createdAt: { type: Date, default: Date.now, expires: 3600 } // auto-delete after 1 hr
});

module.exports = mongoose.model('Lobby', LobbySchema);
