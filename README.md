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
