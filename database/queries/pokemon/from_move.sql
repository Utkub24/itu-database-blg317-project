SELECT pokemon.pokemon_id, name, height, weight FROM pokemon JOIN pokemon_moves ON pokemon.pokemon_id = pokemon_moves.pokemon_id WHERE pokemon_moves.move_id = $1;
