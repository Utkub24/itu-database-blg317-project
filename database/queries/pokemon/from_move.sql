select pokemon.pokemon_id, name, height, weight from pokemon join pokemon_moves on pokemon.pokemon_id = pokemon_moves.pokemon_id where pokemon_moves.move_id = $1;
