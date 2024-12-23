SELECT type.type_id, type.type_name FROM type JOIN pokemon_types ON type.type_id = pokemon_types.type_id WHERE pokemon_types.pokemon_id = $1;
