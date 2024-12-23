select (ability.ability_id, ability.name) from ability join pokemon_abilities on ability.ability_id = pokemon_abilities.ability_id
where ability.ability_id = $1;
