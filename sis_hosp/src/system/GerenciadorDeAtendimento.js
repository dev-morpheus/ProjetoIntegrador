"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorDeAtendimento = void 0;
const MinHeap_1 = require("../structs/MinHeap");
class GerenciadorDeAtendimento {
    constructor() {
        this.medico = null;
        this.prioridadeValores = {
            'vermelho': 1, 'laranja': 2, 'amarelo': 3, 'verde': 4, 'azul': 5
        };
        this.fila = new MinHeap_1.MinHeap((a, b) => this.prioridadeValores[a.prioridade] - this.prioridadeValores[b.prioridade]);
    }
    definirMedico(m) {
        this.medico = m;
        console.log(`\n🩺 Médico ${m.nome} (${m.especialidade}) definido como responsável.`);
    }
    adicionarPaciente(p) {
        this.fila.inserir(p);
        console.log(`\n➕ Paciente ${p.nome} adicionado(a) à fila. Classificação: ${p.prioridade.toUpperCase()} (${p.descricaoPrioridade}).`);
    }
    atenderProximoPaciente() {
        if (!this.medico) {
            console.log("\n⚠️ Nenhum médico definido.");
            return;
        }
        if (this.fila.estaVazia()) {
            console.log(`\n⚠️ Não há pacientes na fila para ${this.medico.nome}.`);
            return;
        }
        const paciente = this.fila.extrairMinimo();
        if (paciente) {
            console.log(`\n▶ ${this.medico.nome} está chamando: ${paciente.nome}`);
            console.log(this.medico.atenderPaciente(paciente));
        }
    }
    mostrarFila() {
        console.log("\n--- 📋 Fila Atual ---");
        const lista = this.fila.obterFilaOrdenadaVisualizacao();
        if (lista.length === 0)
            return console.log("A fila está vazia.");
        lista.forEach((p, i) => console.log(`${i + 1}. ${p.nome} (${p.prioridade}) - ${p.sintoma}`));
    }
    temPacientes() {
        return !this.fila.estaVazia();
    }
}
exports.GerenciadorDeAtendimento = GerenciadorDeAtendimento;
