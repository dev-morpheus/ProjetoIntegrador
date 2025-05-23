
import { Medico } from './modelos/Medico';
import { Paciente, NIVEIS_PRIORIDADE_VALIDOS, NivelPrioridadeSUS } from './modelos/Paciente';
import { GerenciadorDeAtendimento } from './sistema/GerenciadorDeAtendimento';
import { leitorLinha, fazerPergunta } from './util/leitura';

async function adicionarPacienteInterativamente(gerenciador: GerenciadorDeAtendimento) {
  console.log("\n--- Adicionar Novo Paciente ---");
  const nome = await fazerPergunta("Nome do paciente: ");
  const idadeTexto = await fazerPergunta("Idade: ");
  const idade = parseInt(idadeTexto);
  const cpf = await fazerPergunta("CPF (XXX.XXX.XXX-XX): ");
  const sintoma = await fazerPergunta("Sintoma principal: ");

  let prioridadeEntrada: string;
  let prioridadeValida = false;
  do {
    prioridadeEntrada = (await fazerPergunta(`Prioridade (${NIVEIS_PRIORIDADE_VALIDOS.join('/')}) : `)).toLowerCase();
    if (NIVEIS_PRIORIDADE_VALIDOS.includes(prioridadeEntrada as NivelPrioridadeSUS)) {
      prioridadeValida = true;
    } else {
      console.log("Prioridade inválida. Tente novamente.");
    }
  } while (!prioridadeValida);

  const prioridade = prioridadeEntrada as NivelPrioridadeSUS;

  if (isNaN(idade) || idade <= 0) {
    console.log("Idade inválida. Paciente não adicionado.");
    return;
  }

  const novoPaciente = new Paciente(nome, idade, cpf, sintoma, prioridade);
  gerenciador.adicionarPaciente(novoPaciente);
}

async function menuInterativoHospital() {
  console.log("🏥 Sistema Hospitalar Interativo 🏥");

  const drAndre = new Medico("Dr. André Rios", 42, "919.919.919-91", "Emergencista", "CRM/BA 11223");
  const gerenciador = new GerenciadorDeAtendimento();
  gerenciador.definirMedico(drAndre);

  gerenciador.adicionarPaciente(new Paciente("Carlos Daniel", 30, "111.111.111-11", "Febre alta", "amarelo"));
  gerenciador.adicionarPaciente(new Paciente("Ana Beatriz", 65, "222.222.222-22", "Dor no peito", "vermelho"));

  let continuar = true;
  while (continuar) {
    gerenciador.mostrarFila();
    console.log("\nEscolha uma ação:");
    console.log("1. Adicionar Novo Paciente");
    console.log("2. Chamar Próximo Paciente para Atendimento");
    console.log("3. Sair");
    const opcao = await fazerPergunta("Opção: ");

    switch (opcao) {
      case '1':
        await adicionarPacienteInterativamente(gerenciador);
        break;
      case '2':
        gerenciador.atenderProximoPaciente();
        break;
      case '3':
        continuar = false;
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }

  leitorLinha.close();
  console.log("\n🏁 Sistema Encerrado 🏁");
}

menuInterativoHospital().catch(erro => {
  console.error("Ocorreu um erro inesperado:", erro);
  leitorLinha.close();
});
