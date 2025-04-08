

const CharacterCard = ({ name, affiliation, photoUrl }) => {
    return (
        <div className="character-card">
        <img src={photoUrl} alt={name} style={{width: "300px", height: "100%"}}/>
        <h3>{name}</h3>
        <p>Affiliation: {affiliation || "Unaffiliated"}</p>
        </div>
    );
}

export default CharacterCard;