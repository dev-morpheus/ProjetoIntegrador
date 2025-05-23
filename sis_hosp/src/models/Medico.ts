
import { Pessoa } from './Pessoa';
import { Paciente } from './Paciente';

export class Medico extends Pessoa {
  constructor(
    nome: string,
    idade: number,
    cpf: string,
    public especialidade: string,
    public crm: string
  ) {
    super(nome, idade, cpf);
  }

  apresentar(): string {
    return `Médico(a): ${this.nome}, Especialidade: ${this.especialidade}, CRM: ${this.crm}`;
  }

  atenderPaciente(paciente: Paciente): string {
    return `O(A) Médico(a) ${this.nome} (${this.especialidade}) está iniciando o atendimento ao(à) paciente ${paciente.nome} (Risco: ${paciente.prioridade.toUpperCase()}) com sintoma de "${paciente.sintoma}".`;
  }
}
