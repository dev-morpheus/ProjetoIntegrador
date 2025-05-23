
export class MinHeap<T> {
  private elementos: T[] = [];
  constructor(private funcaoDeComparacao: (a: T, b: T) => number) {}

  private obterIndiceFilhoEsquerdo(indicePai: number) { return 2 * indicePai + 1; }
  private obterIndiceFilhoDireito(indicePai: number) { return 2 * indicePai + 2; }
  private obterIndicePai(indiceFilho: number) { return Math.floor((indiceFilho - 1) / 2); }

  private trocar(i: number, j: number) {
    [this.elementos[i], this.elementos[j]] = [this.elementos[j], this.elementos[i]];
  }

  inserir(item: T): void {
    this.elementos.push(item);
    let i = this.elementos.length - 1;
    while (i > 0 && this.funcaoDeComparacao(this.elementos[this.obterIndicePai(i)], item) > 0) {
      this.trocar(i, this.obterIndicePai(i));
      i = this.obterIndicePai(i);
    }
  }

  extrairMinimo(): T | undefined {
    if (this.elementos.length === 0) return undefined;
    const minimo = this.elementos[0];
    const ultimo = this.elementos.pop();
    if (this.elementos.length && ultimo !== undefined) {
      this.elementos[0] = ultimo;
      this.heapify(0);
    }
    return minimo;
  }

  private heapify(i: number): void {
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

  estaVazia(): boolean { return this.elementos.length === 0; }
  tamanho(): number { return this.elementos.length; }

  obterFilaOrdenadaVisualizacao(): T[] {
    const copia = [...this.elementos];
    const heapCopia = new MinHeap<T>(this.funcaoDeComparacao);
    heapCopia.elementos = copia;
    const ordenada: T[] = [];
    while (!heapCopia.estaVazia()) {
      const item = heapCopia.extrairMinimo();
      if (item) ordenada.push(item);
    }
    return ordenada;
  }
}
