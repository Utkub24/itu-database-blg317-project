### POKEMON Table (int pokemon_id, varchar name, int height, int width):
        Stores the list of all pokemons; their IDs, names, heights and widths.
        pokemon_id is a primary key.

### TYPE (int type_id, varchar type_name):
        Stores the list of all pokemon types; their IDs and names.
        type_id is a primary key.

### MOVE (int move_id, varchar move_name, int power, int accuracy, int pp, int type_id):
        Stores the list of all moves; their IDs, names, power, accuracy and power point values.
        Also stores the type of the move.
        move_id is a primary key.
        type_id is a foreign key from the TYPE table to the TYPE table.

### ABILITY (int ability_id, varchar name):
        Stores the list of all abilities; their IDs and names.
        ability_id is a primary key.

### POKEMON_TYPES (int pokemon_id, int type_id, bool is_primary):
        Stores the relation from pokemons to their types.
        pokemon_id and type_id are both primary and foreign keys to POKEMON and TYPE tables respectively.

### POKEMON_MOVES (int pokemon_id, int move_id, int learn_level):
        Stores the relation from pokemons to their moves.
        pokemon_id and move_id are both primary and foreign keys to POKEMON and MOVE tables respectively.

POKEMON_ABILITIES (int pokemon_id, int ability_id, bool is_hidden):
        Stores the relation from pokemons to their abilities.
        pokemon_id and ability_id are both primary and foreign keys to POKEMON and ABILITIES tables respectively.

TYPE_EFFECTIVENESS (int attacking_type_id, int defending_type_id, numeric effectiveness):
        Stores the effectiveness of a type against another type.
        attacking_type_id and defending_type_id are both primary and foreign keys to the TYPE table.

ability:
        all                   : returns all rows from the ABILITY table.
        from_pokemon          : returns the abilities which a specific pokemon has.
        new                   : creates a new relation in the POKEMON_ABILITY table from the pokemon ID, ability ID and is hidden values.

effectiveness:
        all                   : returns all rows from the EFFECTIVENESS table.
        from_attack_type      : returns the effectiveness values of a attacking pokemon type ID.
        from_attack_type      : returns the effectiveness values of a defending pokemon type ID.

move:
        all                   : returns all rows from the MOVE table.
        from_pokemon          : returns the moves which a specific pokemon has.
        new                   : creates a new relation in the POKEMON_MOVE table from the pokemon ID, move ID and learn level values.

pokemon:
        all                   : returns all rows from the POKEMON table.
        delete                : deletes a row from the POKEMON table, and all relations that this pokemon has with TYPE, MOVE and ABILITY tables.
        from_ability          : returns the rows from the POKEMON table that has a specific ability which is specified by its ID.
        from_move             : returns the rows from the POKEMON table that has a specified move which is specified by its ID.
        get                   : returns the row from the POKEMON table which has a specified pokemon ID.
        get_max_id            : returns the maximum of the ID values from the POKEMON table which will be used to generate a new and unique ID.
        new                   : creates a new row in the POKEMONS table from the ID, name, weight and height properties.
        update                : updates the weight, height and name properties in the POKEMON table from an ID.

type:
        all                   : returns all rows from the TYPE table rows.
        from_pokemon          : returns the types which a specific pokemon has.
        new                   : creates a new relation in the POKEMON_TYPE table from the pokemon ID, type ID and is primary values.
