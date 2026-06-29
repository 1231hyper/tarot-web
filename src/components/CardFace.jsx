export default function CardFace({ card }) {
  return (
    <div className="card-face">
      <img
        src={card.image}
        alt={card.name}
        className="card-face-img"
        loading="lazy"
        draggable={false}
      />
      <div className="card-face-name">{card.name}</div>
    </div>
  );
}
