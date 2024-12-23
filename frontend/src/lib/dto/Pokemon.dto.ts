import AbilityDto from "./Ability.dto";
import MoveDto from "./Move.dto";
import TypeDto from "./Type.dto";

export default class PokemonDto {
  name: string;
  weight: number;
  height: number;
  types: [TypeDto];
  moves: [MoveDto];
  abilities: [AbilityDto];

  constructor(name: string = "Unknown Pokemon", weight: number = 1, height: number = 1, types: [TypeDto] = [new TypeDto()], moves: [MoveDto] = [new MoveDto()], abilities: [AbilityDto] = [new AbilityDto()]) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.types = types;
    this.moves = moves;
    this.abilities = abilities;
  }
};
