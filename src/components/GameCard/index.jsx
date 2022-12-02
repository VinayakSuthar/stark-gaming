import "./index.css";

export default function GameCard({gameData}) {
  const {background_image, name, genres} = gameData;
  return (
    <div className="game-card">
      <img src={background_image} alt="game" />
      <h3 className="game-title">{name}</h3>
      <p className="game-genre">{genres[0].name}</p>
    </div>
  );
}
