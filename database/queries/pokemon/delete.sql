DELETE FROM pokemon WHERE pokemon_id = $1;
DELETE FROM pokemon_types WHERE pokemon_id = $1;
DELETE FROM pokemon_moves WHERE pokemon_id = $1;
DELETE FROM pokemon_abilities WHERE pokemon_id = $1;
