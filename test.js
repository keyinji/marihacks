
fetch('/api/lobby/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    gameSettings: {
      timeLimit: 60,
      questionCount: 10,
      difficulty: 'medium'
    }
  })
})
.then(res => res.json())
.then(data => {
  console.log('Lobby code:', data.lobbyCode);
});