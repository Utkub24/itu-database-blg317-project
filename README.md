# Database Project HEAU
For ITU BLG317E Database Systems Course by **H**üseyin **E**rtuğrul **A**rif **U**tku

# Entity Relationship Diagram

```mermaid
erDiagram
    POKEMON ||--o{ POKEMON_TYPES : has
    POKEMON {
        int pokemon_id PK
        varchar name
        int height
        int weight
    }
    
    TYPE ||--o{ POKEMON_TYPES : belongs_to
    TYPE {
        int type_id PK
        varchar type_name
    }
    
    POKEMON_TYPES {
        int pokemon_id PK,FK
        int type_id PK,FK
        boolean is_primary
    }
    
    POKEMON ||--o{ POKEMON_MOVES : learns
    MOVE ||--o{ POKEMON_MOVES : learned_by
    POKEMON_MOVES {
        int pokemon_id PK,FK
        int move_id PK,FK
        int learn_level
    }
    
    MOVE {
        int move_id PK
        varchar name
        int power
        int accuracy
        int pp
        int type_id FK
    }
    
    TYPE ||--o{ MOVE : has
    
    POKEMON ||--o{ POKEMON_ABILITIES : has
    ABILITY ||--o{ POKEMON_ABILITIES : belongs_to
    POKEMON_ABILITIES {
        int pokemon_id PK,FK
        int ability_id PK,FK
        boolean is_hidden
    }
    
    ABILITY {
        int ability_id PK
        varchar name
    }
    
    TYPE ||--o{ TYPE_EFFECTIVENESS : attacks
    TYPE ||--o{ TYPE_EFFECTIVENESS : defends
    TYPE_EFFECTIVENESS {
        int attacking_type_id PK,FK
        int defending_type_id PK,FK
        numeric multiplier
    }
```

## Backend

The main purpose of the backend is to be a bridge between frontend and database. It is responsible for handling requests from the frontend, querying the database, and returning the results to the frontend.

The endpoint are as follows:

- `/pokemon/all`:
    - `GET`: Returns all the pokemons in the database.

- `/pokemon/{pokemon_id}`:
    - `GET`: Returns the pokemon with the given id.
    - `POST`: Adds a new pokemon to the database.
    - `PUT`: Updates an existing pokemon in the database.
    - `DELETE`: Deletes an existing pokemon from the database.

- `/pokemon/type/{type_id}`:
    - `GET`: Returns all the pokemons with the given type.

- `/pokemon/move/{move_id}`:
    - `GET`: Returns all the pokemons with the given move.

- `/pokemon/ability/{ability_id}`:
    - `GET`: Returns all the pokemons with the given ability.

- `/pokemon/type-effectiveness/{type_id}`:
    - `GET`: Returns all the type effectivenesses with the given type.

- `/type/all`:
    - `GET`: Returns all the types in the database.

- `/move/all`:
    - `GET`: Returns all the moves in the database.

- `/ability/all`:
    - `GET`: Returns all the abilities in the database.

- `/type-effectiveness/all`:
    - `GET`: Returns all the type effectivenesses in the database.
pokemon_idPKstringnameintbase_hpintbase_attackintbase_defenseintbase_sp_attackintbase_sp_defenseintbase_speedintweightintheightbooleanis_legendarystringdescription
