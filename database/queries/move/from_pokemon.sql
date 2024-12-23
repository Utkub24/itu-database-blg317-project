SELECT type.move_id, type.name FROM move JOIN pokemon_moves ON move.move_id = pokemon_moves.move_id WHERE pokemon_moves.pokemon_id = $1;
