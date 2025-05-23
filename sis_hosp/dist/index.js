"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Medico_1 = require("./modelos/Medico");
const Paciente_1 = require("./modelos/Paciente");
const GerenciadorDeAtendimento_1 = require("./sistema/GerenciadorDeAtendimento");
const leitura_1 = require("./util/leitura");
async function adicionarPacienteInterativamente(gerenciador) {
    console.log("\n--- Adicionar Novo Paciente ---");
    const nome = await (0, leitura_1.fazerPergunta)("Nome do paciente: ");
    const idadeTexto = await (0, leitura_1.fazerPergunta)("Idade: ");
    const idade = parseInt(idadeTexto);
    const cpf = await (0, leitura_1.fazerPergunta)("CPF (XXX.XXX.XXX-XX): ");
    const sintoma = await (0, leitura_1.fazerPergunta)("Sintoma principal: ");
    let prioridadeEntrada;
    let prioridadeValida = false;
    do {
        prioridadeEntrada = (await (0, leitura_1.fazerPergunta)(`Prioridade (${Paciente_1.NIVEIS_PRIORIDADE_VALIDOS.join('/')}) : `)).toLowerCase();
        if (Paciente_1.NIVEIS_PRIORIDADE_VALIDOS.includes(prioridadeEntrada)) {
            prioridadeValida = true;
        }
        else {
            console.log("Prioridade inválida. Tente novamente.");
        }
    } while (!prioridadeValida);
    const prioridade = prioridadeEntrada;
    if (isNaN(idade) || idade <= 0) {
        console.log("Idade inválida. Paciente não adicionado.");
        return;
    }
    const novoPaciente = new Paciente_1.Paciente(nome, idade, cpf, sintoma, prioridade);
    gerenciador.adicionarPaciente(novoPaciente);
}
async function menuInterativoHospital() {
    console.log("🏥 Sistema Hospitalar Interativo 🏥");
    const drAndre = new Medico_1.Medico("Dr. André Rios", 42, "919.919.919-91", "Emergencista", "CRM/BA 11223");
    const gerenciador = new GerenciadorDeAtendimento_1.GerenciadorDeAtendimento();
    gerenciador.definirMedico(drAndre);
    gerenciador.adicionarPaciente(new Paciente_1.Paciente("Carlos Daniel", 30, "111.111.111-11", "Febre alta", "amarelo"));
    gerenciador.adicionarPaciente(new Paciente_1.Paciente("Ana Beatriz", 65, "222.222.222-22", "Dor no peito", "vermelho"));
    let continuar = true;
    while (continuar) {
        gerenciador.mostrarFila();
        console.log("\nEscolha uma ação:");
        console.log("1. Adicionar Novo Paciente");
        console.log("2. Chamar Próximo Paciente para Atendimento");
        console.log("3. Sair");
        const opcao = await (0, leitura_1.fazerPergunta)("Opção: ");
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
    leitura_1.leitorLinha.close();
    console.log("\n🏁 Sistema Encerrado 🏁");
}
menuInterativoHospital().catch(erro => {
    console.error("Ocorreu um erro inesperado:", erro);
    leitura_1.leitorLinha.close();
});
