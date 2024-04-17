document.getElementById('pokemonForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const pokemonId = document.getElementById('pokemonId').value;
    
    try {
        const pokemonData = await getPokemonData(pokemonId);
        displayPokemonInfo(pokemonData);
    } catch (error) {
        console.error('Error al buscar el Pokemon:', error);
        displayErrorMessage('Error al buscar el Pokemon.');
    }
});

async function getPokemonData(pokemonId) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return response.data;
}

function displayPokemonInfo(pokemonData) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    pokemonInfoDiv.innerHTML = `
        <h2>ID del Pokémon: ${pokemonData.id}</h2>
        <h3>Nombre: ${pokemonData.name}</h3>
        <h3>Tipo/s:</h3>
        <ul>
            ${pokemonData.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
        <p>Altura: ${pokemonData.height} centimetros</p>
        <p>Peso: ${pokemonData.weight} gramos</p>
    `;
}

function displayErrorMessage(message) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    pokemonInfoDiv.innerHTML = `<p>${message}</p>`;
}
