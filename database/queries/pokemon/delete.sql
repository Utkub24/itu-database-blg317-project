delete from pokemon where pokemon_id = $1;
delete from pokemon_types where pokemon_id = $1;
delete from pokemon_moves where pokemon_id = $1;
delete from pokemon_abilities where pokemon_id = $1;
