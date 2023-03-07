import { useState } from 'react';

function Card({ id, image, onMatch }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onMatch(id, image);
  };

  return (
    <div onClick={handleClick}>
      {isFlipped ? <img src={image} alt="card" /> : <div className="card-back"></div>}
    </div>
  );
}
export default Card;