
export abstract class Pessoa {
  constructor(public nome: string, public idade: number, public cpf: string) {}
  abstract apresentar(): string;
}
