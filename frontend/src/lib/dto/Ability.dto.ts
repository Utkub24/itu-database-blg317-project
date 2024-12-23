export default class AbilityDto {
  id: number;
  name: string;

  constructor(id: number = 1, name: string = "Unknown Ability") {
    this.id = id;
    this.name = name;
  }
};
