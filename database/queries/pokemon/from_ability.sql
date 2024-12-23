SELECT pokemon.pokemon_id, name, height, weight FROM pokemon JOIN pokemon_abilities ON pokemon.pokemon_id = pokemon_abilities.pokemon_id WHERE pokemon_abilities.ability_id = $1;
