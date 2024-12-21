-- Create TYPE table
CREATE TABLE TYPE (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL UNIQUE
);

-- Create POKEMON table
CREATE TABLE POKEMON (
    pokemon_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    base_hp INTEGER NOT NULL CHECK (base_hp >= 0),
    base_attack INTEGER NOT NULL CHECK (base_attack >= 0),
    base_defense INTEGER NOT NULL CHECK (base_defense >= 0),
    base_sp_attack INTEGER NOT NULL CHECK (base_sp_attack >= 0),
    base_sp_defense INTEGER NOT NULL CHECK (base_sp_defense >= 0),
    base_speed INTEGER NOT NULL CHECK (base_speed >= 0),
    weight INTEGER NOT NULL CHECK (weight >= 0),
    height INTEGER NOT NULL CHECK (height >= 0),
    is_legendary BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT NOT NULL
);

-- Create POKEMON_TYPES junction table
CREATE TABLE POKEMON_TYPES (
    pokemon_id INTEGER,
    type_id INTEGER,
    is_primary BOOLEAN NOT NULL,
    PRIMARY KEY (pokemon_id, type_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id) ON DELETE CASCADE
);

-- Create MOVE table
CREATE TABLE MOVE (
    move_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    power INTEGER CHECK (power >= 0),
    accuracy INTEGER CHECK (accuracy >= 0 AND accuracy <= 100),
    pp INTEGER NOT NULL CHECK (pp >= 0),
    effect_description TEXT,
    type_id INTEGER NOT NULL,
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id) ON DELETE CASCADE
);

-- Create POKEMON_MOVES junction table
CREATE TABLE POKEMON_MOVES (
    pokemon_id INTEGER,
    move_id INTEGER,
    learn_method VARCHAR(20) NOT NULL CHECK (learn_method IN ('level-up', 'tm', 'egg', 'tutor')),
    learn_level INTEGER CHECK (learn_level >= 0),
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id) ON DELETE CASCADE,
    FOREIGN KEY (move_id) REFERENCES MOVE(move_id) ON DELETE CASCADE
);

-- Create ABILITY table
CREATE TABLE ABILITY (
    ability_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    effect_description TEXT NOT NULL
);

-- Create POKEMON_ABILITIES junction table
CREATE TABLE POKEMON_ABILITIES (
    pokemon_id INTEGER,
    ability_id INTEGER,
    is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (pokemon_id, ability_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id) ON DELETE CASCADE,
    FOREIGN KEY (ability_id) REFERENCES ABILITY(ability_id) ON DELETE CASCADE
);

-- Create TYPE_EFFECTIVENESS table
CREATE TABLE TYPE_EFFECTIVENESS (
    attacking_type_id INTEGER,
    defending_type_id INTEGER,
    multiplier NUMERIC(3,2) NOT NULL CHECK (multiplier IN (0.0, 0.5, 1.0, 2.0)),
    PRIMARY KEY (attacking_type_id, defending_type_id),
    FOREIGN KEY (attacking_type_id) REFERENCES TYPE(type_id) ON DELETE CASCADE,
    FOREIGN KEY (defending_type_id) REFERENCES TYPE(type_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_pokemon_name ON POKEMON(name);
CREATE INDEX idx_move_name ON MOVE(name);
CREATE INDEX idx_ability_name ON ABILITY(name);
CREATE INDEX idx_pokemon_moves_pokemon_id ON POKEMON_MOVES(pokemon_id);
CREATE INDEX idx_pokemon_moves_move_id ON POKEMON_MOVES(move_id);
CREATE INDEX idx_pokemon_abilities_pokemon_id ON POKEMON_ABILITIES(pokemon_id);
CREATE INDEX idx_pokemon_abilities_ability_id ON POKEMON_ABILITIES(ability_id);
CREATE INDEX idx_pokemon_types_pokemon_id ON POKEMON_TYPES(pokemon_id);
CREATE INDEX idx_pokemon_types_type_id ON POKEMON_TYPES(type_id);
