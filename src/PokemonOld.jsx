import { useEffect, useState } from "react";
import "./pokemon.css";

export const Pokemon = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon/squirtle";

  // const fetchPokemon = () => {
  //   fetch(API)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setApiData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //       setLoading(false);
  //     });
  // };

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setLoading(false);
      setApiData(data);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>Error:{error.message}</h1>
      </div>
    );

  return (
    <section className="container">
      <header>
        <h1>Lets Catch a Pokemon</h1>
      </header>
      <ul className="card-demo">
        <li className="pokemon-card">
          <figure>
            <img
              src={apiData.sprites.other.dream_world.front_default}
              alt={apiData.name}
            />
          </figure>
          <h1>{apiData.name}</h1>
          <div className="grid-three-cols">
            <p className="pokemon-info">
              Height:&nbsp;<span>{apiData.height}</span>
            </p>
            <p className="pokemon-info">
              Weight:&nbsp;<span>{apiData.weight}</span>
            </p>
            <p className="pokemon-info">
              Speed:&nbsp;<span>{apiData.stats[5].base_stat}</span>
              {console.log(apiData.stats)}
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};
