"use client"

import { ColumnDef } from "@tanstack/react-table"
import PokemonDto from "../dto/Pokemon.dto"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PokemonCard from "../components/PokemonCard"
import { useState } from "react"

export const columns: ColumnDef<PokemonDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorFn: (p) => p.types[0].name,
    header: "Primary Type",
  },
  {
    id: "actions",
    cell: ({ table, row }) => {
      const pokemon = row.original;
      const [isModalOpen, setModalOpen] = useState(false);

      const handleUpdate = (updatedPokemon: PokemonDto) => {
        table.options.meta?.onUpdate?.(pokemon, updatedPokemon);
      };

      const handleDelete = (pokemon: PokemonDto) => {
        table.options.meta?.onDelete?.(pokemon);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(pokemon.name)}
              >
                Copy Pokemon name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setModalOpen(true)}>
                View Pokemon
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(pokemon)}>
                Delete Pokemon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isModalOpen && (
            <PokemonCard
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              pokemon={pokemon}
              updatePokemon={handleUpdate}
            />
          )}
        </>
      );
    },
  },
];


