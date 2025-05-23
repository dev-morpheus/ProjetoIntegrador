
import { Paciente, NivelPrioridadeSUS } from '../modelos/Paciente';
import { Medico } from '../modelos/Medico';
import { MinHeap } from '../estruturas/MinHeap';

export class GerenciadorDeAtendimento {
  private fila: MinHeap<Paciente>;
  private medico: Medico | null = null;
  private prioridadeValores: Record<NivelPrioridadeSUS, number> = {
    'vermelho': 1, 'laranja': 2, 'amarelo': 3, 'verde': 4, 'azul': 5
  };

  constructor() {
    this.fila = new MinHeap((a, b) => this.prioridadeValores[a.prioridade] - this.prioridadeValores[b.prioridade]);
  }

  definirMedico(m: Medico): void {
    this.medico = m;
    console.log(`\n🩺 Médico ${m.nome} (${m.especialidade}) definido como responsável.`);
  }

  adicionarPaciente(p: Paciente): void {
    this.fila.inserir(p);
    console.log(`\n➕ Paciente ${p.nome} adicionado(a) à fila. Classificação: ${p.prioridade.toUpperCase()} (${p.descricaoPrioridade}).`);
  }

  atenderProximoPaciente(): void {
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

  mostrarFila(): void {
    console.log("\n--- 📋 Fila Atual ---");
    const lista = this.fila.obterFilaOrdenadaVisualizacao();
    if (lista.length === 0) return console.log("A fila está vazia.");
    lista.forEach((p, i) => console.log(`${i + 1}. ${p.nome} (${p.prioridade}) - ${p.sintoma}`));
  }

  temPacientes(): boolean {
    return !this.fila.estaVazia();
  }
}
