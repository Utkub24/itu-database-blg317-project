select (ability.ability_id, ability.name) from ability join pokemon_abilities on ability.ability_id = pokemon_abilities.ability_id where pokemon_abilities.pokemon_id = $1;
