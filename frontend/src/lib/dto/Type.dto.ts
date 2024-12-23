export default class TypeDto {
  id: number;
  name: string;

  constructor(id: number = 1, name: string = "Unknown Type") {
    this.id = id;
    this.name = name;
  }
};
