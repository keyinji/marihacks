const {v4: uuidv4} = require('uuid');

const games = [];
const generateQuestions = (topic, difficulty) => {
    const baseQuestions = [
      { question: 'What is the capital of France?', correctAnswer: 'Paris' },
      { question: 'Who wrote "Hamlet"?', correctAnswer: 'Shakespeare' },
      { question: 'What is 2 + 2?', correctAnswer: '4' },
    ];
  
    // Ask how to modify with Open AI API
    return baseQuestions;
  };
const createGame = (topic, difficulty) =>{
    const game = {
        id: uuidv4(),
        topic,
        difficulty,
        players: [],
        currentQuestionIndex: 0,
        questions: generateQuestions(topic,difficulty),
        answers:[],
    };
    games.push(game);
    return game;
};


  const addPlayerToGame = (gameId, playerId) =>{
    const game = getGame(gameId);
    if (game && !game.players.includes(playerId)){
        game.players.push(playerId);
        return 'Player Added'
    }else{
        return 'Player Already in Game'

    }
  };

  const getGame= (gameId) =>{
    return games.find(game => game.id === gameId)
  }

  const getCurrentQuestion = (gameId) =>{
    const game = getGame(gameId);
    if (game){
        return game.questions[game.currentQuestionIndex];

    }
    return null;

  };
const submitAnswer = (gameId, playerId, answer, timeTaken) => {
    const game = getGame(gameId);
    if (game){
        question = game.questions[game.currentQuestionIndex];
        const isCorrect = question.correctAnswer.toLowerCase() === answer.toLowerCase();
        game.answers.push({
            playerId,
            answer,
            timeTaken,
            correct: isCorrect,
        });

    }
}
const nextQuestion = (gameId) =>{
    const game = getGame(gameId);
    if (game.answers.length % game.players.length === 0 ){
        game.currentQuestionIndex += 1;
    }    
}

module.exports = {
    createGame,
    addPlayerToGame,
    getGame,
    getCurrentQuestion,
    generateQuestions,
    submitAnswer,
    nextQuestion
};
