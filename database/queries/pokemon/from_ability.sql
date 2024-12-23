select pokemon.pokemon_id, name, height, weight from pokemon join pokemon_abilities on pokemon.pokemon_id = pokemon_abilities.pokemon_id where pokemon_abilities.ability_id = $1;
