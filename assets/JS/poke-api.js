const pokeApi = {};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return (
    fetch(url)
      /*Quando temos apenas 1 linha de return, não precisamos declarar o corpo */
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .catch((error) => console.error(error))
  );
};
