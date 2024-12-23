select (type.move_id, type.name) from move join pokemon_moves on move.move_id = pokemon_moves.move_id where pokemon_moves.pokemon_id = $1;
