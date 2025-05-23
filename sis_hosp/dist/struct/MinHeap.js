"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
class MinHeap {
    constructor(funcaoDeComparacao) {
        this.funcaoDeComparacao = funcaoDeComparacao;
        this.elementos = [];
    }
    obterIndiceFilhoEsquerdo(indicePai) { return 2 * indicePai + 1; }
    obterIndiceFilhoDireito(indicePai) { return 2 * indicePai + 2; }
    obterIndicePai(indiceFilho) { return Math.floor((indiceFilho - 1) / 2); }
    trocar(i, j) {
        [this.elementos[i], this.elementos[j]] = [this.elementos[j], this.elementos[i]];
    }
    inserir(item) {
        this.elementos.push(item);
        let i = this.elementos.length - 1;
        while (i > 0 && this.funcaoDeComparacao(this.elementos[this.obterIndicePai(i)], item) > 0) {
            this.trocar(i, this.obterIndicePai(i));
            i = this.obterIndicePai(i);
        }
    }
    extrairMinimo() {
        if (this.elementos.length === 0)
            return undefined;
        const minimo = this.elementos[0];
        const ultimo = this.elementos.pop();
        if (this.elementos.length && ultimo !== undefined) {
            this.elementos[0] = ultimo;
            this.heapify(0);
        }
        return minimo;
    }
    heapify(i) {
        const esq = this.obterIndiceFilhoEsquerdo(i);
        const dir = this.obterIndiceFilhoDireito(i);
        let menor = i;
        if (esq < this.elementos.length && this.funcaoDeComparacao(this.elementos[esq], this.elementos[menor]) < 0)
            menor = esq;
        if (dir < this.elementos.length && this.funcaoDeComparacao(this.elementos[dir], this.elementos[menor]) < 0)
            menor = dir;
        if (menor !== i) {
            this.trocar(i, menor);
            this.heapify(menor);
        }
    }
    estaVazia() { return this.elementos.length === 0; }
    tamanho() { return this.elementos.length; }
    obterFilaOrdenadaVisualizacao() {
        const copia = [...this.elementos];
        const heapCopia = new MinHeap(this.funcaoDeComparacao);
        heapCopia.elementos = copia;
        const ordenada = [];
        while (!heapCopia.estaVazia()) {
            const item = heapCopia.extrairMinimo();
            if (item)
                ordenada.push(item);
        }
        return ordenada;
    }
}
exports.MinHeap = MinHeap;
