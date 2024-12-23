import os
from pathlib import Path
import pandas as pd
import numpy as np
import psycopg2
from psycopg2.extras import execute_values
from psycopg2.extensions import register_adapter, AsIs
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def adapt_numpy_bool(numpy_bool):
    return AsIs(bool(numpy_bool))


def adapt_numpy_float64(numpy_float):
    return AsIs(float(numpy_float))


register_adapter(np.float64, adapt_numpy_float64)
register_adapter(np.bool_, adapt_numpy_bool)
register_adapter(np.int64, AsIs)

# Get database connection parameters from environment variables
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DATA_DIR = Path(os.getenv("DATA_DIR", "./data"))


def connect_db():
    return psycopg2.connect(
        dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
    )


def read_csv(filename):
    """Read CSV file from DATA_DIR"""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        raise FileNotFoundError(f"Could not find {filename} in {DATA_DIR}")
    return pd.read_csv(filepath)


def import_data(conn, table_name, df, columns, transform_func=None):
    """Generic function to import data into any table"""
    print(f"Importing {table_name}...")
    if transform_func:
        data = transform_func(df)
    else:
        data = [tuple(row) for _, row in df[columns].iterrows()]

    # print(data)

    cursor = conn.cursor()
    sql = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES %s ON CONFLICT DO NOTHING"
    execute_values(cursor, sql, data)
    conn.commit()
    print(f"Finished importing {table_name}")


def main():
    # Verify environment variables are loaded
    required_env_vars = [
        "DB_NAME",
        "DB_USER",
        "DB_PASSWORD",
        "DB_HOST",
        "DB_PORT",
        "DATA_DIR",
    ]
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    if missing_vars:
        print(
            f"Error: Missing required environment variables: {', '.join(missing_vars)}"
        )
        print("Please check your .env file")
        return

    # Verify DATA_DIR exists
    if not DATA_DIR.exists():
        print(f"Error: DATA_DIR does not exist: {DATA_DIR}")
        print("Please create the directory or update DATA_DIR in .env")
        return

    # Required CSV files
    required_files = [
        "types.csv",
        "pokemon.csv",
        "abilities.csv",
        "moves.csv",
        "pokemon_moves.csv",
        "pokemon_abilities.csv",
        "pokemon_types.csv",
        "type_efficacy.csv",
    ]

    # Check if all required files exist
    missing_files = [file for file in required_files if not (DATA_DIR / file).exists()]
    if missing_files:
        print(f"Error: Missing required CSV files in {DATA_DIR}:")
        for file in missing_files:
            print(f"  - {file}")
        return

    # Connect to database
    try:
        conn = connect_db()
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return

    try:
        # Import Types
        types_df = read_csv("types.csv")
        import_data(conn, "TYPE", types_df, ["type_id", "type_name"])

        # Import Pokemon
        pokemon_df = read_csv("pokemon.csv")

        def transform_pokemon(df):
            return [
                (
                    row["id"],
                    row["identifier"],
                    row["height"],
                    row["weight"],
                )
                for _, row in df.iterrows()
            ]

        import_data(
            conn,
            "POKEMON",
            pokemon_df,
            [
                "pokemon_id",
                "name",
                "height",
                "weight",
            ],
            transform_pokemon,
        )

        # Import Abilities
        abilities_df = read_csv("abilities.csv")

        import_data(
            conn,
            "ABILITY",
            abilities_df,
            ["ability_id", "name"],
        )

        # Import Moves
        moves_df = read_csv("moves.csv")

        def transform_move(df):
            filled = df.fillna(0)
            return [
                (
                    row["move_id"],
                    row["name"],
                    row["type_id"],
                    row["power"],
                    row["accuracy"],
                    row["pp"],
                )
                for _, row in filled.iterrows()
            ]

        import_data(
            conn,
            "MOVE",
            moves_df,
            [
                "move_id",
                "name",
                "type_id",
                "power",
                "accuracy",
                "pp",
            ],
            transform_move,
        )

        # Import Pokemon-Types relationships
        pokemon_types_df = read_csv("pokemon_types.csv")

        def transform_pokemon_types(df):
            return [
                (row["pokemon_id"], row["type_id"], row["slot"] == 1)
                for _, row in df.iterrows()
            ]

        import_data(
            conn,
            "POKEMON_TYPES",
            pokemon_types_df,
            ["pokemon_id", "type_id", "is_primary"],
            transform_pokemon_types,
        )

        # Import Pokemon-Moves relationships
        pokemon_moves_df = read_csv("pokemon_moves.csv")

        def transform_pokemon_moves(df):
            return [
                (row["pokemon_id"], row["move_id"], row.get("level", 1))
                for _, row in df.iterrows()
            ]

        import_data(
            conn,
            "POKEMON_MOVES",
            pokemon_moves_df,
            ["pokemon_id", "move_id", "learn_level"],
            transform_pokemon_moves,
        )

        # Import Pokemon-Abilities relationships
        pokemon_abilities_df = read_csv("pokemon_abilities.csv")

        def transform_pokemon_abilites(df):
            return [
                (
                    row["pokemon_id"],
                    row["ability_id"],
                    row["is_hidden"] == 1,
                )
                for _, row in df.iterrows()
            ]

        import_data(
            conn,
            "POKEMON_ABILITIES",
            pokemon_abilities_df,
            ["pokemon_id", "ability_id", "is_hidden"],
            transform_pokemon_abilites,
        )

        # Import Type Effectiveness
        type_efficacy_df = read_csv("type_efficacy.csv")

        def transform_type_effectiveness(df):
            return [
                (
                    row["damage_type_id"],
                    row["target_type_id"],
                    row["damage_factor"] / 100,
                )
                for _, row in df.iterrows()
            ]

        import_data(
            conn,
            "TYPE_EFFECTIVENESS",
            type_efficacy_df,
            ["attacking_type_id", "defending_type_id", "multiplier"],
            transform_type_effectiveness,
        )

        print("All data imported successfully!")

    except Exception as e:
        print(f"Error during import: {e}")
        raise e from None
        conn.rollback()
    finally:
        conn.close()


if __name__ == "__main__":
    main()
