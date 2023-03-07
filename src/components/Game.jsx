import { useState, useEffect } from 'react';
import Cards from './Card';

function Game() {
  const [cards, setCards] = useState([
    { id: 1, image: 'helmet-1.png' },
    { id: 2, image: '/img/potion-1.png' },
    { id: 3, image: '/img/ring-1.png' },
    { id: 4, "src": '/img/scroll-1.png' },
    { id: 5, "src": '/img/shield-1.png' },
    { id: 6, "src": '/img/sword-1.png' },
    { id: 7, "src": '/img/helmet-1.png' },
    { id: 8, "src": '/img/potion-1.png' },
    { id: 9, "src": '/img/ring-1.png' },
    { id: 10, "src": '/img/scroll-1.png' },
    { id: 11, "src": '/img/shield-1.png' },
    { id: 12, "src": '/img/sword-1.png' },
    
  ]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [numTurns, setNumTurns] = useState(0);
  const [numHearts, setNumHearts] = useState(3);

  const checkMatch = () => {
    if (flippedCards.length !== 2) {
      return;
    }

    if (flippedCards[0].image === flippedCards[1].image) {
      setCards(
        cards.map((card) => {
          if (card.id === flippedCards[0].id || card.id === flippedCards[1].id) {
            return { ...card, matched: true };
          }
          return card;
        })
      );
    } else {
      setNumHearts(numHearts - 1);
    }

    setFlippedCards([]);
  };

  const handleCardClick = (id, image) => {
    if (flippedCards.length === 2 || cards.find((card) => card.id === id).matched) {
      return;
    }

    setFlippedCards([...flippedCards, { id, image }]);
    setNumTurns(numTurns + 1);
  };

  useEffect(() => {
    checkMatch();
  }, [flippedCards]);
    useEffect(() => {
    checkMatch();

    if (numHearts === 0) {
      alert('Game over!');
    }
  }, [flippedCards, numHearts]);
return (
    <div>
      <div>Turns: {numTurns}</div>
      <div>Hearts: {numHearts}</div>
      <div className="game-board">
        {cards.map((card) => (
          <Cards
            key={card.id}
            id={card.id}
            image={card.image}
            matched={card.matched}
            onMatch={handleCardClick}
          />
        ))}
      </div>
    </div>
  )};

  export default Game;