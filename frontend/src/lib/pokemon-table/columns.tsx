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
    cell: ({ row }) => {
      const pokemon = row.original

      return (
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
            <DropdownMenuItem>View Pokemon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

