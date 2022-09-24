const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon-image');


const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnVoltar = document.querySelector('.btn-voltar');
const btnProximo = document.querySelector('.btn-proximo');

let searchPokemon = 1;

// erro por não alterar nome especifico depois da "const"
const fetchPokemon = async (pokemon) => {

  const  APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if (APIResponse.status ==200) {
   const data = await APIResponse.json();
   return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML ='Carregando...';
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);

  if (data) {
   pokemonImage.style.display = 'block';
   pokemonName.innerHTML = data.name;
   pokemonNumber.innerHTML = data.id;
   pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
   ['animated']['front_default'];
   input.valeu = '';
   searchPokemon = data.id;
  } else{
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado';
    pokemonNumber.innerHTML = '';
  }

}

form.addEventListener('submit', (event) => {
  event.preventDefault();
renderPokemon(input.value.toLowerCase());
});

btnProximo.addEventListener('click', () => {
  searchPokemon +=1;
  renderPokemon(searchPokemon);
});

btnVoltar.addEventListener('click', () => {
  if(searchPokemon > 1){ 
    searchPokemon -=1;
    renderPokemon(searchPokemon);
  }

  });

renderPokemon(searchPokemon);
