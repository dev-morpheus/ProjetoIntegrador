"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Medico_1 = require("./modelos/Medico");
const Paciente_1 = require("./modelos/Paciente");
const GerenciadorDeAtendimento_1 = require("./sistema/GerenciadorDeAtendimento");
const leitura_1 = require("./util/leitura");
function adicionarPacienteInterativamente(gerenciador) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n--- Adicionar Novo Paciente ---");
        const nome = yield (0, leitura_1.fazerPergunta)("Nome do paciente: ");
        const idadeTexto = yield (0, leitura_1.fazerPergunta)("Idade: ");
        const idade = parseInt(idadeTexto);
        const cpf = yield (0, leitura_1.fazerPergunta)("CPF (XXX.XXX.XXX-XX): ");
        const sintoma = yield (0, leitura_1.fazerPergunta)("Sintoma principal: ");
        let prioridadeEntrada;
        let prioridadeValida = false;
        do {
            prioridadeEntrada = (yield (0, leitura_1.fazerPergunta)(`Prioridade (${Paciente_1.NIVEIS_PRIORIDADE_VALIDOS.join('/')}) : `)).toLowerCase();
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
    });
}
function menuInterativoHospital() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const opcao = yield (0, leitura_1.fazerPergunta)("Opção: ");
            switch (opcao) {
                case '1':
                    yield adicionarPacienteInterativamente(gerenciador);
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
    });
}
menuInterativoHospital().catch(erro => {
    console.error("Ocorreu um erro inesperado:", erro);
    leitura_1.leitorLinha.close();
});
