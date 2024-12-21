-- Drop indexes first
DROP INDEX IF EXISTS idx_pokemon_name;
DROP INDEX IF EXISTS idx_move_name;
DROP INDEX IF EXISTS idx_ability_name;
DROP INDEX IF EXISTS idx_pokemon_moves_pokemon_id;
DROP INDEX IF EXISTS idx_pokemon_moves_move_id;
DROP INDEX IF EXISTS idx_pokemon_abilities_pokemon_id;
DROP INDEX IF EXISTS idx_pokemon_abilities_ability_id;
DROP INDEX IF EXISTS idx_pokemon_types_pokemon_id;
DROP INDEX IF EXISTS idx_pokemon_types_type_id;

-- Drop junction tables first (tables with foreign keys)
DROP TABLE IF EXISTS TYPE_EFFECTIVENESS;
DROP TABLE IF EXISTS POKEMON_ABILITIES;
DROP TABLE IF EXISTS POKEMON_MOVES;
DROP TABLE IF EXISTS POKEMON_TYPES;

-- Drop dependent tables
DROP TABLE IF EXISTS MOVE;
DROP TABLE IF EXISTS ABILITY;
DROP TABLE IF EXISTS POKEMON;
DROP TABLE IF EXISTS TYPE;
