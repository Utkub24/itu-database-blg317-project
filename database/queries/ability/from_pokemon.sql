SELECT ability.ability_id, ability.name FROM ability JOIN pokemon_abilities ON ability.ability_id = pokemon_abilities.ability_id WHERE pokemon_abilities.pokemon_id = $1;
