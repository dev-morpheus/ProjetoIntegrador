"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medico = void 0;
const Pessoa_1 = require("./Pessoa");
class Medico extends Pessoa_1.Pessoa {
    constructor(nome, idade, cpf, especialidade, crm) {
        super(nome, idade, cpf);
        this.especialidade = especialidade;
        this.crm = crm;
    }
    apresentar() {
        return `Médico(a): ${this.nome}, Especialidade: ${this.especialidade}, CRM: ${this.crm}`;
    }
    atenderPaciente(paciente) {
        return `O(A) Médico(a) ${this.nome} (${this.especialidade}) está iniciando o atendimento ao(à) paciente ${paciente.nome} (Risco: ${paciente.prioridade.toUpperCase()}) com sintoma de "${paciente.sintoma}".`;
    }
}
exports.Medico = Medico;
