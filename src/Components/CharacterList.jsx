import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedNation, setSelectedNation] = useState("All Nations");

  const nations = [
    "All Nations",
    "Water Tribe",
    "Earth Kingdom",
    "Fire Nation",
    "Air Nomads",
  ];

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(
          "https://last-airbender-api.fly.dev/api/v1/characters?perPage=50"
        );
        const data = await res.json();
        console.log(data);

        setCharacters(data);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading Team Avatar...</p>;

  // Filter characters based on the selected nation
  // Note: The API does not provide a direct way to filter by nation/element, so this is a workaround.
  const filteredCharacters = characters.filter((char) => {
    return selectedNation === "All Nations" || char.affiliation?.includes(selectedNation);
  });

  return (
    <>
      <div>
        <label>
          Filter by Nation: 
          <select
            style={{ margin: "5px"}}
            value={selectedNation}
            onChange={(e) => setSelectedNation(e.target.value)}
          >
            {nations.map((nation) => (
              <option key={nation} value={nation}>
                {nation}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <h2>Avatar Characters</h2>
        <div className="character-list">
          {filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              name={char.name}
              affiliation={char.affiliation}
              photoUrl={char.photoUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CharacterList;
