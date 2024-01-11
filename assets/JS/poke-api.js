const pokeApi = {};

function convertPokeApiDetailToPokemon (pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.order
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types  

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon;
}

pokeApi.getPokemondetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToPokemon) 
};

pokeApi.getPokemons = (offset = 0, limit = 100) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return (
    fetch(url) //Requisição da lista de pokemons
      /*Quando temos apenas 1 linha de return, não precisamos declarar o corpo */
      .then((response) => response.json()) //Convertemos o response para json
      .then((jsonBody) => jsonBody.results) //Gerou a lista de pokemons
      .then((pokemons) => pokemons.map(pokeApi.getPokemondetail)) // Convertemos nossa lista de pokemons, em uma nova lista de requisição de detalhes
      .then((detailRequests) => Promise.all(detailRequests)) //
      .then((pokemonsDetails) => pokemonsDetails) //Lista de detalhes
  );
};

// Promise.all([
//   fetch('https://pokeapi.co/api/v2/pokemon/1'),
//   fetch('https://pokeapi.co/api/v2/pokemon/2'),
//   fetch('https://pokeapi.co/api/v2/pokemon/3'),
//   fetch('https://pokeapi.co/api/v2/pokemon/4'),
//   fetch('https://pokeapi.co/api/v2/pokemon/5')
// ]).then((results) => {
//   console.log(results)
// });
