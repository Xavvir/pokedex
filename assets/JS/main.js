function convertPokemonToli(pokemon) {
  return `
    <li class="pokemon">
    <div class="dados">
      <span class="number">#001</span>
      <span class="name">${pokemon.name}</span>
    </div>
    <div class="datail">
      <ol class="types">
        <li class="type">Grass</li>
        <li class="type">Poison</li>
      </ol>
      <picture>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          alt="${pokemon.name}"
        />
      </picture>
    </div>
  </li>`;
}

const pokemonList = document.getElementById("pokemonList");

pokeApi
  .getPokemons()
  .then((pokemons) => {
    const listItens = []

    for (let i = 1; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      listItens.push(convertPokemonToli(pokemon))
    }

    console.log(listItens)
})
  .catch((error) => console.error(error));
