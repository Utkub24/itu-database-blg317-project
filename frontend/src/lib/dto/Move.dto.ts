import TypeDto from "./Type.dto";

export default class MoveDto {
  name: string;
  power: number;
  accuracy: number;
  powerPoints: number;
  type: TypeDto;

  constructor(name: string = "Unknown Move", power: number = 1, accuracy: number = 100, powerPoints: number = 1, type: TypeDto = new TypeDto()) {
    this.name = name;
    this.power = power;
    this.accuracy = accuracy;
    this.powerPoints = powerPoints;
    this.type = type;
  }
};
