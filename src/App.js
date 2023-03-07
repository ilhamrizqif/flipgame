import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [    { "src": "/img/apple.png", matched: false },    { "src": "/img/bibit.png", matched: false },    { "src": "/img/pupuk.png", matched: false },    { "src": "/img/penyiram.png", matched: false },    { "src": "/img/pohon1.png", matched: false },    { "src": "/img/pohon2.png", matched: false },];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

  setChoiceOne(null);
  setChoiceTwo(null);
  setCards(shuffledCards);
  setTurns(0);
  setScore(0);
  setHearts(3); // reset hearts to 3
}

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      setScore(score + 10);
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
      if (turns % 3 === 2) {
        setHearts((hearts) => hearts - 1);
      }
    }
  }
}, [choiceOne, choiceTwo]);

useEffect(() => {
  if (cards.filter((card) => !card.matched).length === 0) {
    setScore(score + 40)
    alert("Congratulations! You won the game!");
  } else if (hearts === 0) {
    alert("Game over!");
    shuffleCards();
  }
}, [cards, hearts]);


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);

  }

  return (
    <div className="App">   
      <h1>Inggrid Harvest Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <p>Score: {score.toFixed(2)}</p>
      <div className="hearts">
        {Array.from({ length: hearts }).map((_, index) => (
          <img key={index} src="/img/heart.gif" alt="heart" className="life" />
        ))}
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
