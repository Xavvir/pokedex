function convertPokemonTypesToli(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemon = document.getElementsByClassName("pokemon");

const maxRecords = 30;
const limit = 5;
let offset = 0;

function convertPokemonToli(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
    <div class="dados">
      <span class="number">#00${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
    </div>
    <div class="datail">
      <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
      </ol>
      <picture>
        <img
          src="${pokemon.photo}" alt="${pokemon.name}"
        />
      </picture>
    </div>
    <span class="datail">Abilities: ${pokemon.abilities}</span>
    <span class="datail">Species: ${pokemon.species}</span>
    <span class="datail">Height: ${pokemon.height}</span>
    <span class="datail">Weight: ${pokemon.weight}</span>
    </li>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToli).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// pokeApi
//   .getPokemons()
//   .then((pokemons = []) => {
//     //Possibilidade 2

//     pokemonList.innerHTML = pokemons.map(convertPokemonToli).join("");

//     //Possibilidade 1
//     // const listItens = [];

//     //   for (let i = 1; i < pokemons.length; i++) {
//     //     const pokemon = pokemons[i];
//     //     listItens.push(convertPokemonToli(pokemon));
//     //   }

//     //   console.log(listItens);
//   })
//   .catch((error) => console.error(error));
