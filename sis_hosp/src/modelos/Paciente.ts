
import { Pessoa } from './Pessoa';

export type NivelPrioridadeSUS = 'vermelho' | 'laranja' | 'amarelo' | 'verde' | 'azul';

export const NIVEIS_PRIORIDADE_VALIDOS: NivelPrioridadeSUS[] = ['vermelho', 'laranja', 'amarelo', 'verde', 'azul'];

export class Paciente extends Pessoa {
  public prioridade: NivelPrioridadeSUS;
  public descricaoPrioridade: string;

  constructor(nome: string, idade: number, cpf: string, public sintoma: string, nivelPrioridadeEntrada: NivelPrioridadeSUS) {
    super(nome, idade, cpf);
    this.prioridade = nivelPrioridadeEntrada;
    this.descricaoPrioridade = this.obterDescricaoPrioridade(nivelPrioridadeEntrada);
  }

  private obterDescricaoPrioridade(prioridade: NivelPrioridadeSUS): string {
    const descricoes: Record<NivelPrioridadeSUS, string> = {
      'vermelho': 'Emergência (Atendimento Imediato)',
      'laranja': 'Muito Urgente (Atendimento em até 10 min)',
      'amarelo': 'Urgente (Atendimento em até 60 min)',
      'verde': 'Pouco Urgente (Atendimento em até 120 min)',
      'azul': 'Não Urgente (Atendimento em até 240 min ou encaminhamento)',
    };
    return descricoes[prioridade];
  }

  apresentar(): string {
    return `Paciente: ${this.nome}, Idade: ${this.idade}, Sintoma: ${this.sintoma}, Classificação de Risco: ${this.prioridade.toUpperCase()} (${this.descricaoPrioridade})`;
  }
}
