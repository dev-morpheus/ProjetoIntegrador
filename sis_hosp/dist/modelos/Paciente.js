"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = exports.NIVEIS_PRIORIDADE_VALIDOS = void 0;
const Pessoa_1 = require("./Pessoa");
exports.NIVEIS_PRIORIDADE_VALIDOS = ['vermelho', 'laranja', 'amarelo', 'verde', 'azul'];
class Paciente extends Pessoa_1.Pessoa {
    constructor(nome, idade, cpf, sintoma, nivelPrioridadeEntrada) {
        super(nome, idade, cpf);
        this.sintoma = sintoma;
        this.prioridade = nivelPrioridadeEntrada;
        this.descricaoPrioridade = this.obterDescricaoPrioridade(nivelPrioridadeEntrada);
    }
    obterDescricaoPrioridade(prioridade) {
        const descricoes = {
            'vermelho': 'Emergência (Atendimento Imediato)',
            'laranja': 'Muito Urgente (Atendimento em até 10 min)',
            'amarelo': 'Urgente (Atendimento em até 60 min)',
            'verde': 'Pouco Urgente (Atendimento em até 120 min)',
            'azul': 'Não Urgente (Atendimento em até 240 min ou encaminhamento)',
        };
        return descricoes[prioridade];
    }
    apresentar() {
        return `Paciente: ${this.nome}, Idade: ${this.idade}, Sintoma: ${this.sintoma}, Classificação de Risco: ${this.prioridade.toUpperCase()} (${this.descricaoPrioridade})`;
    }
}
exports.Paciente = Paciente;
